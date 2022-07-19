# <img src="https://user-images.githubusercontent.com/68576681/177258571-64e4855d-bdca-4335-b221-e23d54708cbe.jpg" width="30" height="30"> 도와줘요 스택오버플로우
> 2분반 3주차(2022.07.13~07.19) By 최동원, 윤창호
# Table Of Contents
* [Project Summary](#project-summary)
* [Developer Information](#developer-information)
* [Development Environment](#development-environment)
* [Application Information](#application-information)
  * [0. 로그인/회원가입 화면](#0.-로그인/회원가입-화면)
  * [1. 글목록](#1-글목록)
  * [2. 글쓰기](#2-글쓰기)
  * [3. 글 내용보기](#3-글-내용보기)
  * [4. 글 수정](#4-글-수정)
  * [5. 언젠가](#5-언젠가)
***

# Project Summary
* 코딩 관련 질문을 관리해주는 웹 게시판 서비스입니다.
* 데이터베이스에서 사용자의 고유한 정보를 불러와 로그인 할 수 있습니다.
* 내부 게시판에 코딩중 발생한 궁금증을 1차적으로 포스팅할 수 있습니다.
* 외부 게시판(stackoverflow.com 등)에 질문을 자동으로 업로드하고 링크를 관리할 수 있습니다.
***

# Developer Information
* [최동원](https://github.com/chlehdwon) (KAIST 전기및전자공학부) 
* [윤창호](https://github.com/ho9938) (UNIST 전기전자컴퓨터공학부) 
***

# Development Environment
* OS: Linux(Ubuntu)
* Frontend: React.js, CSS, HTML, JQuery
* Backend: Django, Serializer
* Database: MySQL
* Target Device: All device
***

# Service Information
## 0. 로그인/회원가입 화면

<img src="https://user-images.githubusercontent.com/68576681/179735287-308404fe-71f9-4195-8af4-722020c384e1.PNG" width="480" height="360"> <img src="https://user-images.githubusercontent.com/68576681/179735285-cb7b59b9-eb11-453a-b790-5bd4ecf5b240.png" width="480" height="360">
### Major Features
* 이메일과 비밀번호를 입력하여 회원가입을 할 수 있습니다.
* 회원가입 시 입력한 이메일과 비밀번호를 이용하여 로그인을 할 수 있습니다.

### Technology Used
* MySQL Database에 유저 정보가 저장됩니다.
* 따라서 다른 기기에서도 동일한 ID로 로그인 할 수 있습니다

## 1. 글목록

<img src="https://user-images.githubusercontent.com/68576681/179735267-ced24f4a-ba23-47e1-a0f3-5b787a41e1e4.PNG" width="480" height="360">  

### Major Features
* 로그인한 유저가 업로드한 게시글 목록이 표시됩니다.
* 날짜와 게시글 제목 정보가 테이블에 함께 표시됩니다.
* 게시글 제목을 클릭하면 게시글의 세부 정보를 확인할 수 있습니다. 
  
### Technology Used
* 데이터베이스에서 게시글 목록 정보를 받아와서 화면에 출력합니다.

## 2. 글쓰기

<img src="https://user-images.githubusercontent.com/68576681/179735275-d206835a-5f48-4136-9d62-800bb6b04eac.PNG" width="480" height="360">

### Major Features
* 새로운 게시글을 작성할 수 있습니다.
* 텍스트 서식을 지정하고 사진 등 추가적인 미디어를 업로드할 수 있습니다.
* 외부 게시판에 업로드할 질문을 작성할 수 있습니다.
* 질문 작성 시 마크다운을 사용할 수 있습니다.
* 체크리스트를 이용하여 질문을 업로드할 외부 게시판을 선택할 수 있습니다.
* 업로드 성공 시 업로드된 게시물의 주소를 출력합니다.
* 업로드 실패 시 업로드가 실패한 이유를 출력합니다.

### Technology Used
* ckeditor4 라이브러리를 활용하여 텍스트 서식을 지정할 수 있습니다.
* react-md-editor 라이브러리를 활용하여 마크다운을 인식하고 출력합니다.
* selenium 라이브러리를 활용하여 외부 게시판에 질문을 자동으로 업로드합니다.
* 사이트의 component는 id, xpath, classname을 이용하여 인식합니다.
* 사이트의 봇 업로드 차단 기능을 회피하기 위해 각 문자 입력 전에 임의의 시간만큼 대기합니다.

## 3. 글 내용보기

<img src="https://user-images.githubusercontent.com/68576681/179735272-82a9414c-368d-4543-a24d-d46009141cb8.PNG" width="480" height="360">  

### Major Features
* 게시글 제목과 내용이 출력됩니다.
* 자동 업로드된 게시물이 있을 경우 해당 게시물의 링크를 함께 출력합니다.
* 링크를 클릭할 경우 해당 게시물로 리다이렉팅 됩니다.
* 글 수정 버튼을 클릭할 경우 글 수정 페이지로 넘어갑니다.
* 글 삭제 버튼을 클릭할 경우 글이 삭제됩니다.

### Technology Used
* 데이터베이스에서 게시글 상세정보를 불러와 출력합니다.
* React Bootstrap의 table을 사용하여 테이블 레이아웃을 구현하였습니다.

## 4. 글 수정

<img src="https://user-images.githubusercontent.com/68576681/179735281-0d312ab9-60af-4522-ac2a-fe6122b88ae5.PNG" width="480" height="360"> <img src="https://user-images.githubusercontent.com/68576681/179735282-cc7ad56b-89a0-4e81-9a9e-4083f0bf1702.PNG" width="480" height="360"> 

### Major Features
* 게시글의 제목과 내용을 수정할 수 있습니다.
* 질문 제목과 내용을 수정하여 외부 게시판에 추가적으로 업로드할 수 있습니다.
* 이미 질문을 업로드한 사이트는 업로드 대상에 포함할 수 없습니다.
* 글쓰기 시에 입력한 사이트 ID/비밀번호, 질문 제목/내용은 자동으로 채워집니다.

### Technology Used
* 데이터베이스에서 질문 업로드 정보를 받아와 사용합니다.
* 데이터베이스에서 사이트 ID/비밀번호, 질문 제목/내용을 받아와 사용합니다.
* React-activity를 사용해 로딩 중 spinner을 구현하였습니다.


## 5. 언젠가
* 다른 유저가 작성한 게시글을 확인하는 기능 구현할 예정입니다.
* 댓글 작성 기능을 추가할 예정입니다.
* 커뮤니티를 위한 사이트들도 추가할 예정입니다.
* WebView를 통해 올라간 질문을 게시판에서 바로 확인할 수 있도록 할 예정입니다.
* 기타 UI를 조금 더 보완 및 수정할 계획입니다.
