import React, { Component } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardDetail extends Component {
  state = {
    board: []
  };

  componentDidMount() {
    if (this.props.location.query !== undefined) {
      console.log(this.props.location.query._id)
      this.getDetail();
    } else {
      window.location.href = "/";
    }
  }

  deleteBoard = _id => {
    const send_param = {
      headers,
      _id
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://192.249.18.146:443/board/delete", send_param)
        //정상 수행
        .then(returnData => {
          alert("게시글이 삭제 되었습니다.");
          window.location.href = "/";
        })
        //에러
        .catch(err => {
          console.log(err);
          alert("글 삭제 실패");
        });
    }
  };

  getDetail = () => {
    const send_param = {
      headers,
      _id: this.props.location.query._id
    };
    const marginBottom = {
      marginBottom: 5
    };
    axios
      .post("http://192.249.18.146:443/board/detail", send_param)
      //정상 수행
      .then(returnData => {
        if (returnData.data.board[0]) {
          console.log(returnData.data.board[0])
          const board = (
            <div>
              <Table bordered>
                <thead>
                  <tr>
                    <th>{returnData.data.board[0].title}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      height = {300}
                      dangerouslySetInnerHTML={{
                        __html: returnData.data.board[0].content
                      }}
                    ></td>
                  </tr>
                  {returnData.data.board[0].stackoverflow &&
                  <tr>  
                    <td> <img src="img/stackoverflow.png" alt="stackoverflow" height={30}/> {": "+returnData.data.board[0].stackoverflow} </td> 
                  </tr>  }
                  {returnData.data.board[0].serverfault &&
                  <tr>
                    <td> <img src="img/serverfault.png" alt="serverfault" height={30}/> {": "+returnData.data.board[0].serverfault} </td> 
                  </tr>  }
                  {returnData.data.board[0].superuser &&
                  <tr>      
                    <td> <img src="img/superuser.png" alt="superuser" height={30}/> {": "+returnData.data.board[0].superuser} </td> 
                  </tr>  }
                  {returnData.data.board[0].askubuntu &&
                  <tr>
                    <td> <img src="img/askubuntu.png" alt="askubuntu" height={30}/> {": "} <a href={returnData.data.board[0].askubuntu}>{returnData.data.board[0].askubuntu}</a> </td> 
                  </tr>  }
                  {returnData.data.board[0].askdifferent &&
                  <tr>
                    <td> <img src="img/askdifferent.png" alt="askdifferent" height={30}/> {": "+returnData.data.board[0].askdifferent} </td> 
                  </tr>  }
                  
                  
                </tbody>
              </Table>
              <div>
                <NavLink
                  to={{
                    pathname: "/boardWrite",
                    query: {
                      title: returnData.data.board[0].title,
                      content: returnData.data.board[0].content,
                      _id: this.props.location.query._id,
                      user_id: returnData.data.board[0].user_id,
                      user_pwd: returnData.data.board[0].user_pwd,
                      qtitle: returnData.data.board[0].qtitle,
                      qcontent: returnData.data.board[0].qcontent,
                      qtag: returnData.data.board[0].qtag,
                      stackoverflow: returnData.data.board[0].stackoverflow,
                      serverfault: returnData.data.board[0].serverfault,
                      superuser: returnData.data.board[0].superuser,
                      askubuntu: returnData.data.board[0].askubuntu,
                      askdifferent: returnData.data.board[0].askdifferent,
                    }
                  }}
                >
                  <Button block style={marginBottom}>
                    글 수정
                  </Button>
                </NavLink>
                <Button
                  block
                  onClick={this.deleteBoard.bind(
                    null,
                    this.props.location.query._id
                  )}
                >
                  글 삭제
                </Button>
                <Form.Text> 1. 질문에 성공했을 경우 게시된 링크가 올라가게 됩니다. </Form.Text>
                <Form.Text> 2. 질문을 자세히 보려면 링크 혹은 글 수정 버튼을 클릭해주세요. </Form.Text>
                
              </div>
            </div>
          );
          this.setState({
            board: board
          });
        } else {
          alert("글 상세 조회 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };

  //onClick={this.getBoard.bind(null,this.props._id)}
  render() {
    const divStyle = {
      margin: 50
    };
    return <div style={divStyle}>{this.state.board}</div>;
  }
}

export default BoardDetail;