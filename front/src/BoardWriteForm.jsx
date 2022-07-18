import React, { Component, useState} from "react";
import CKEditor from "ckeditor4-react";
import MDEditor from '@uiw/react-md-editor';
import { Button, Form, Row, Col} from "react-bootstrap";
import {Checkbox, Radio, Switch} from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";



axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardWriteForm extends Component {
  state = {
    data: "",
    markdown: "",
    stack: false,
    server: false,
    superuser: false,
    ubuntu: false,
    different: false,
    stack_disable: false,
    server_disable: false,
    superuser_disable: false,
    ubuntu_disable: false,
    different_disable: false,
  };

  componentDidMount() {
    if (this.props.location.query !== undefined) {
      this.boardTitle.value = this.props.location.query.title;
      this.userID.value = this.props.location.query.user_id;
      this.userPWD.value = this.props.location.query.user_pwd;
      this.postTitle.value = this.props.location.query.qtitle;
      this.postTag.value = this.props.location.query.qtag;
    }
  }

  componentWillMount(){
    if (this.props.location.query !== undefined) {
      this.setState({
        data: this.props.location.query.content,
        markdown: this.props.location.query.qcontent,
        stack_disable: this.props.location.query.stackoverflow!="",
        server_disable: this.props.location.query.serverfault!="",
        superuser_disable: this.props.location.query.superuser!="",
        ubuntu_disable: this.props.location.query.askubuntu!="",
        different_disable: this.props.location.query.askdifferent!="",
      });
    }
  }

  writeBoard = () => {
    let url;
    let send_param;

    const boardTitle = this.boardTitle.value;
    const boardContent = this.state.data;
    const userID = this.userID.value;
    const userPWD = this.userPWD.value;
    const postTitle = this.postTitle.value;
    const postContent = this.state.markdown;
    const postTag = this.postTag.value;
    const sites = [this.state.stack, this.state.server, this.state.superuser, this.state.ubuntu, this.state.different];
    console.log(sites.includes(true))
    console.log(userID, userPWD, postTitle, postContent, postTag, sites)

    if (boardTitle === undefined || boardTitle === "") {
      alert("글 제목을 입력 해주세요.");
      this.boardTitle.focus();
      return;
    } else if (boardContent === undefined || boardContent === "") {
      alert("글 내용을 입력 해주세요.");
      this.boardContent.focus();
      return;
    } else if (sites.includes(true) && (userID === undefined || userID==="")){
      alert("사이트 아이디를 입력 해주세요.");
      this.userID.focus();
      return;
    } else if (sites.includes(true) && (userPWD === undefined || userPWD==="")){
      alert("사이트 비밀번호를 입력 해주세요.");
      this.userPWD.focus();
      return;
    } else if (sites.includes(true) && (postTitle === undefined || postTitle==="")){
      alert("질문글 제목을 입력 해주세요.");
      this.postTitle.focus();
      return;
    } else if (sites.includes(true) && (postContent === undefined || postContent==="")){
      alert("질문글 내용을 입력 해주세요.");
      this.postContent.focus();
      return;
    } else if (sites.includes(true) && (postTag === undefined || postTag==="")){
      alert("질문글 태그를 입력 해주세요.");
      this.postTag.focus();
      return;
    }
    if (this.props.location.query !== undefined) {
      url = "http://192.249.18.146:80/board/update";
      send_param = {
        headers,
        "_id" : this.props.location.query._id,
        "title": boardTitle,
        "content": boardContent,
        "user_id": userID,
        "user_pwd": userPWD,
        "qtitle": postTitle,
        "qcontent": postContent,
        "qtag": postTag,
        "sites": sites
      };
    } else {
      url = "http://192.249.18.146:80/board/write";
      send_param = {
        headers,
        "_id" : $.cookie("login_id"),
        "title": boardTitle,
        "content": boardContent,
        "user_id": userID,
        "user_pwd": userPWD,
        "qtitle": postTitle,
        "qcontent": postContent,
        "qtag": postTag,
        "sites": sites
      };

    }

    axios
      .post(url, send_param)
      //정상 수행
      .then(returnData => {
        console.log(returnData.data)
        if (returnData.data.message) {
          alert(returnData.data.message);
          if(returnData.data.stackoverflow){
            var status = returnData.data.stackoverflow.status;
            var msg = returnData.data.stackoverflow.message;
            if(status) alert("Stackoverflow posted at : "+msg);
            else alert("Stackoverflow error message : "+msg)
          }
          if(returnData.data.serverfault){
            var status = returnData.data.serverfault.status;
            var msg = returnData.data.serverfault.message;
            if(status) alert("Serverfault posted at : "+msg);
            else alert("Serverfault error message : "+msg)
          }
          if(returnData.data.superuser){
            var status = returnData.data.superuser.status;
            var msg = returnData.data.superuser.message;
            if(status) alert("Superuser posted at : "+msg);
            else alert("Superuser error message : "+msg)
          }
          if(returnData.data.askubuntu){
            var status = returnData.data.askubuntu.status;
            var msg = returnData.data.askubuntu.message;
            if(status) alert("Askubuntu posted at : "+msg);
            else alert("Askubuntu error message : "+msg)
          }
          if(returnData.data.askdifferent){
            var status = returnData.data.askdifferent.status;
            var msg = returnData.data.askdifferent.message;
            if(status) alert("Askdifferent posted at : "+msg);
            else alert("Askdifferent error message : "+msg)
          }
          window.location.href = "/";
        } else {
          alert("글쓰기 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };

  onEditorChange = evt => {
    this.setState({
      data: evt.editor.getData()
    });
  };

  onMarkdownChange = evt => {
    this.setState({
      markdown: evt
    });
  };

  render() {
    const divStyle = {
      margin: 75
    };
    const titleStyle = {
      marginBottom: 5
    };
    const buttonStyle = {
      marginTop: 5
    };
    const textBoxStyle = {
      margin: 5
    };

    return (
      <div style={divStyle} className="App mb-3">
        <div className="App mb-5">
          <h2>글 작성하기</h2>
          <Form.Text> 1. 작성할 질문을 요약한 제목으로 적어주세요. </Form.Text>
          <Form.Text> 2. 작성할 질문을 요약한 내용으로 적어주세요. </Form.Text>
          <Form.Text> 3. 글만 작성할 경우, 아무 박스에도 체크하지 말아주세요. </Form.Text>
          <Form.Control
            className="mt-3 mb-3"
            type="text"
            style={titleStyle}
            placeholder="글 제목"
            ref={ref => (this.boardTitle = ref)}
          />
          <CKEditor
            data={this.state.data}
            onChange={this.onEditorChange}
          ></CKEditor>
        </div>

        <div>
          <h2>질문 작성하기</h2>
          <Form.Text> 1. 질문 제목은 15자 이상으로 작성해주세요. </Form.Text>
          <Form.Text> 2. 질문 내용은 30자 이상으로 작성해주세요. </Form.Text>
          <Form.Text> 3. 마크다운을 지원하므로 질문 내용을 실시간으로 변환할 수 있습니다. </Form.Text>
          <Form.Text> 4. 태그는 사이트마다 달라 확인이 필요 할 수 있습니다. </Form.Text>
          
          <Row className="mt-2"> 
            <Col>
              <Form.Group className="mb" controlId="formBasicEmail">
                <Form.Label>사이트 ID</Form.Label>
                <Form.Control type="email" placeholder="Site ID" ref={ref => (this.userID = ref)}/>
                {/* <Form.Text className="text-muted">
                  15자 이상이어야합니다
                </Form.Text> */}
              </Form.Group>
            </Col>
            
            <Col>
              <Form.Group className="mb" controlId="formBasicPassword">
                <Form.Label>사이트 비밀번호</Form.Label>
                <Form.Control type="password" placeholder="Site Password" ref={ref => (this.userPWD = ref)}/>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb" controlId="formQuestionTitle">
            <Form.Label>질문 제목</Form.Label>
            <Form.Control type="text" placeholder="Question Title" ref={ref => (this.postTitle = ref)}/>
          </Form.Group>
          
          <Form.Label className="mb3"> 질문 내용 </Form.Label>
          <MDEditor
            className="mb"
            value={this.state.markdown}
            onChange={this.onMarkdownChange}
            height={400}
          />
          <MDEditor.Markdown/>

          <Form.Group className="mt-2" controlId="formQuestionTag">
            <Form.Label>질문 태그 (ex: linux, java, ...)</Form.Label>
            <Form.Control type="text" placeholder="Question Tag" ref={ref => (this.postTag = ref)}/>
          </Form.Group>
          
          <Checkbox
            icon={
                <img src="img/stackoverflow.png"/>
            }
            animation="jelly"
            disabled={this.state.stack_disable}
            onChange={()=>this.setState({stack: !this.state.stack})}>
            StackOverflow
          </Checkbox>
          <Checkbox
            icon={
                <img src="img/serverfault.png"/>
            }
            animation="jelly"
            disabled={this.state.server_disable}
            onChange={()=>this.setState({server: !this.state.server})}>
            ServerFault
          </Checkbox>
          <Checkbox
            icon={
                <img src="img/superuser.png"/>
            }
            animation="jelly"
            disabled={this.state.superuser_disable}
            onChange={()=>this.setState({superuser: !this.state.superuser})}>
            SuperUser
          </Checkbox>
          <Checkbox
            icon={
                <img src="img/askubuntu.png"/>
            }
            animation="jelly"
            disabled={this.state.ubuntu_disable}
            onChange={()=>this.setState({ubuntu: !this.state.ubuntu})}>
            AskUbuntu
          </Checkbox>
          <Checkbox
            icon={
                <img src="img/askdifferent.png"/>
            }
            animation="jelly"
            disabled={this.state.different_disable}
            onChange={()=>this.setState({different: !this.state.different})}>
            Askdifferent
          </Checkbox>
        </div>
 
        <Button className="mt-3" style={buttonStyle} onClick={this.writeBoard} block>
          저장하기
        </Button>
      </div>
    );
  }
}

export default BoardWriteForm;
