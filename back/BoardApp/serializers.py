from rest_framework import serializers
from BoardApp.models import Board, User

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Board
        fields=('_id','writer', 'title', 'content', 'imgPath', 'createdAt',
        'user_id', 'user_pwd', 'qtitle', 'qcontent', 'qtag',
        'stackoverflow', 'serverfault', 'superuser', 'askubuntu', 'askdifferent')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('_id','email', 'name', 'password', 'createdAt', 'loginCnt', 'lookYn')