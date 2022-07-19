import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import './index.css'
// import BoardForm from "./BoardForm";
// import MypageForm from "./MypageForm";
// import BoardWriteForm from "./BoardWriteForm";
import Body from "./Body";
import Footer from "./Footer";

ReactDOM.render(
  <HashRouter>
    <Header />
    <Body />
    <Footer />
  </HashRouter>,
  document.querySelector("#container")
);
