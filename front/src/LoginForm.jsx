import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class LoginForm extends Component {
  componentDidMount() {
    loadReCaptcha("6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb");
  }

  verifyCallback = recaptchaToken => {
    // Here you will get the final recaptchaToken!!!
    console.log(recaptchaToken, "<= your recaptcha token");
  };

  join = () => {
    const joinEmail = this.joinEmail.value;
    const joinName = this.joinName.value;
    const joinPw = this.joinPw.value;
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (joinEmail === "" || joinEmail === undefined) {
      alert("이메일 주소를 입력해주세요.");
      this.joinEmail.focus();
      return;
    } else if (
      joinEmail.match(regExp) === null ||
      joinEmail.match(regExp) === undefined
    ) {
      alert("이메일 형식에 맞게 입력해주세요.");
      this.joinEmail.value = "";
      this.joinEmail.focus();
      return;
    } else if (joinName === "" || joinName === undefined) {
      alert("이름을 입력해주세요.");
      this.joinName.focus();
      return;
    } else if (joinPw === "" || joinPw === undefined) {
      alert("비밀번호를 입력해주세요.");
      this.joinPw.focus();
      return;
    } else if (
      joinPw.match(regExp2) === null ||
      joinPw.match(regExp2) === undefined
    ) {
      alert("비밀번호를 숫자와 문자, 특수문자 포함 8~16자리로 입력해주세요.");
      this.joinPw.value = "";
      this.joinPw.focus();
      return;
    }

    const send_param = {
      headers,
      email: this.joinEmail.value,
      name: this.joinName.value,
      password: this.joinPw.value
    };
    axios
      .post("http://192.249.18.146:443/member/join", send_param, {headers: {'Content-Type': 'text/plain'}})
      //정상 수행
      .then(returnData => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          //이메일 중복 체크
          if (returnData.data.dupYn === "1") {
            this.joinEmail.value = "";
            this.joinEmail.focus();
          } else {
            this.joinEmail.value = "";
            this.joinName.value = "";
            this.joinPw.value = "";
          }
        } else {
          alert("회원가입 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };
  login = () => {
    const loginEmail = this.loginEmail.value;
    const loginPw = this.loginPw.value;

    if (loginEmail === "" || loginEmail === undefined) {
      alert("이메일 주소를 입력해주세요.");
      this.loginEmail.focus();
      return;
    } else if (loginPw === "" || loginPw === undefined) {
      alert("비밀번호를 입력해주세요.");
      this.loginPw.focus();
      return;
    }

    const send_param = {
      headers,
      email: this.loginEmail.value,
      password: this.loginPw.value
    };
    axios
      .post("http://192.249.18.146:443/member/login", send_param)
      //정상 수행
      .then(returnData => {
        console.log(returnData.data.message)
        if (returnData.data.message) {
          console.log("login_id:" + returnData.data._id);
          $.cookie("login_id", returnData.data._id, { expires: 1 });
          $.cookie("login_email", returnData.data.email, { expires: 1 });
          alert(returnData.data.message);
          window.location.reload();
        } else {
          alert(returnData.data.message);
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const formStyle = {
      margin: 50
    };
    const buttonStyle = {
      marginTop: 10
    };

    return (
      <Form style={formStyle}>
        <h2> 로그인 </h2> 
        <Form.Group controlId="loginForm" className="mb-5">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            className="mb-3"
            type="email"
            maxLength="100"
            ref={ref => (this.loginEmail = ref)}
            placeholder="Enter email"
          />
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            className="mb-3"
            type="password"
            maxLength="20"
            ref={ref => (this.loginPw = ref)}
            placeholder="Password"
          />
          <ReCaptcha
            sitekey="6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb"
            action="login"
            verifyCallback={this.verifyCallback}
          />
          <Button
            style={buttonStyle}
            onClick={this.login}
            variant="primary"
            type="button"
            block
          >
            로그인
          </Button>
        </Form.Group>

        
        <h10> 아이디가 없다면... </h10>
        <h2> 회원가입 </h2> 
        <Form.Group controlId="joinForm">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control
            className="mb-3"
            type="email"
            maxLength="100"
            ref={ref => (this.joinEmail = ref)}
            placeholder="Enter email"
          />
          <Form.Label>이름</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            maxLength="20"
            ref={ref => (this.joinName = ref)}
            placeholder="name"
          />
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            className="mb-3"
            type="password"
            maxLength="64"
            ref={ref => (this.joinPw = ref)}
            placeholder="Password"
          />
          <Button
            style={buttonStyle}
            onClick={this.join}
            variant="primary"
            type="button"
            block
          >
            회원가입
          </Button>
        </Form.Group>

        
      </Form>
    );
  }
}

export default LoginForm;
