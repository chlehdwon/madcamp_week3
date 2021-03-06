# -*- coding: utf-8 -*-
from base64 import b64decode, b64encode

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from BoardApp.models import Board, User
from BoardApp.serializers import BoardSerializer, UserSerializer

from Crypto.Protocol.KDF import PBKDF2
from Crypto.Hash import SHA512
from Crypto.Random import get_random_bytes

from .macro import multi_poster

# Create your views here.


@csrf_exempt
def boardApi(request, id):
    print(request.method)
    board_data = JSONParser().parse(request)
    if request.method == 'POST':
        print(id)
        if id == 'delete':
            try:
                board = Board.objects.filter(_id=board_data['_id'])
                board.delete()
                return JsonResponse({"message": True})
            except Exception as e:
                print(e)
                return JsonResponse({"message": False})

        elif id == 'update':
            try:
                response = {"message": False}

                result = multi_poster(board_data)
                print('---------------------result----------------------')
                print(result)

                obj = {
                    '_id': board_data['_id'],
                    'title': board_data['title'],
                    'content': board_data['content'],
                    'user_id': board_data['user_id'],
                    'user_pwd': board_data['user_pwd'],
                    'qtitle': board_data['qtitle'],
                    'qcontent': board_data['qcontent'],
                    'qtag': board_data['qtag'],
                }

                for site in result.keys():
                    if result[site]['status'] == True:
                        obj[site] = result[site]['message']

                print('-------------------obj--------------------')
                print(obj)

                board = Board.objects.get(_id=board_data['_id'])
                board_serializer = BoardSerializer(
                    board, data=obj, partial=True)

                if board_serializer.is_valid():
                    board_serializer.save()
                    response = {"message": "???????????? ?????? ???????????????."}
                    response.update(result)

                print(
                    '--------------------------response---------------------------')
                print(response)
                return JsonResponse(response)

            except Exception as e:
                print('-------------gaesibal---------------')
                print(e)
                return JsonResponse({"message": False})

        elif id == 'write':
            try:
                obj = {
                    'writer': board_data['_id'],
                    'title': board_data['title'],
                    'content': board_data['content'],
                    'user_id': board_data['user_id'],
                    'user_pwd': board_data['user_pwd'],
                    'qtitle': board_data['qtitle'],
                    'qcontent': board_data['qcontent'],
                    'qtag': board_data['qtag'],
                }
                print('---------------------obj----------------------')
                print(obj)

                board_serializer = BoardSerializer(data=obj)
                if board_serializer.is_valid():
                    print('------------------valid--------------------')
                    board_serializer.save()
                    response = {"message": "???????????? ????????? ???????????????."}
                else:
                    print('------------------invalid--------------------')

            except Exception as e:
                print('------------sibal--------------')
                print(e)
                return JsonResponse({"message": False})

            try:
                result = multi_poster(board_data)
                print('---------------------result----------------------')
                print(result)

                obj = {}
                for site in result.keys():
                    if result[site]['status'] == True:
                        obj[site] = result[site]['message']

                board = Board.objects.get(_id=board_serializer.data['_id'])

                print('---------------------obj----------------------')
                print(obj)

                board_serializer = BoardSerializer(
                    board, data=obj, partial=True)

                if board_serializer.is_valid():
                    board_serializer.save()
                    response.update(result)

                return JsonResponse(response)

            except Exception as e:
                print('------------sibalbal--------------')
                print(e)
                return JsonResponse({"message": False})

        elif id == 'getBoardList':
            print('------------------------getBoradList-------------------------')
            try:
                # print(board_data['_id'])
                board = Board.objects.filter(writer=board_data['_id'])
                board_serializer = BoardSerializer(board, many=True)
                print(board_serializer)
                print(board_serializer.data)

                return JsonResponse({"list": board_serializer.data})
            except Exception as e:
                print(e)
                return JsonResponse({"message": False})

        elif id == 'detail':
            print('------------------------detail-------------------------')
            try:
                board = Board.objects.filter(_id=board_data['_id'])
                board_serializer = BoardSerializer(board, many=True)
                print(board_serializer.data)
                return JsonResponse({"board": board_serializer.data})
            except Exception as e:
                print(e)
                return JsonResponse({"message": False})


@csrf_exempt
def memberApi(request, id):
    print(request.method)
    if request.method == 'POST':
        member_data = JSONParser().parse(request)
        if id == 'join':
            try:
                user = User.objects.filter(email=member_data['email'])
                if user:
                    print("??????")
                    return JsonResponse({
                        "message": "???????????? ?????????????????????. ????????? ???????????? ??????????????????.",
                        "dupYn": "1"})
                else:
                    # salt = get_random_bytes(16)
                    # keys = PBKDF2(member_data['password'],salt,dkLen=64, count=100000)
                    obj = {
                        "email": member_data['email'],
                        "name": member_data['name'],
                        "password": member_data['password']
                    }
                    user_serializer = UserSerializer(data=obj)
                    if user_serializer.is_valid():
                        user_serializer.save()

                    return JsonResponse({"message": "???????????? ???????????????!", "dupYn": "0"})
            except Exception as e:
                print("Error occured: ", e)
                return JsonResponse({"message": False})
        elif id == 'login':
            print('------------------------login-------------------------')
            try:
                user = User.objects.filter(email=member_data['email'])
                if user:
                    user2 = User.objects.filter(
                        email=member_data['email'], password=member_data['password'])
                    if user2:
                        user2_value = user2.values()
                        return JsonResponse({"message": "????????? ???????????????!", "_id": user2_value[0]["_id"], "email": user2_value[0]["email"]})
                    else:
                        return JsonResponse({"message": "???????????? ??????????????? ???????????? ????????????."})
            except Exception as e:
                print(e)
                return JsonResponse({"message": "????????? ??????"})

    elif request.method == 'GET':
        if id == 'logout':
            # print("/logout" + request.session["member_id"])
            request.session.delete()
            return JsonResponse({"message": True})
