import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { Usercontext } from "../App";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import { Input, IconButton } from "@mui/material";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import { d_flex } from "../mixins";
const Signin = () => {
  const { state, dispatch } = useContext(Usercontext);

  const history = useHistory();

  const [newuser, setnewuser] = useState(false);

  const [regemail, setregemail] = useState("");
  const [regname, setregname] = useState("");
  const [regpassword, setregpassword] = useState("");
  const [regconfirm, setregconfirm] = useState("");
  const [logemail, setlogemail] = useState("");
  const [logpassword, setlogpassword] = useState("");
  const [img, setimg] = useState(undefined);
  const [ url, seturl ]= useState('https://www.prajwaldesai.com/wp-content/uploads/2021/02/Find-Users-Last-Logon-Time-using-4-Easy-Methods.jpg');

  const uploadAvatar = ()=>{
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "socialmedia");
    data.append("cloud_name", "db8lblg5p");
    fetch("https://api.cloudinary.com/v1_1/db8lblg5p/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(url)
        seturl(data.url);
      })
      .catch((err) => console.log(err));
    
  }

  function handleClick(button) {
    if (newuser && button != "signUp") {
      setnewuser(false);
    } else if (!newuser && button != "signIn") {
      setnewuser(true);
    }
  }
  const ourFields = ()=>{
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        regemail
      )
    ) {
      const toastHtml = `<span className="toast">Iltimos Email manzilingizni to'g'ri kiriging <i class="material-icons ">error</i></span>`;
      M.toast({ html: toastHtml, classes: "rounded red darken-2 text-light " });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: regname,
        password: regpassword,
        email: regemail,
        avatar:url
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          const toastHtml = `<span className="toast">${data.error} <i class="material-icons ">error</i></span>`;
          M.toast({
            html: toastHtml,
            classes: "rounded red darken-2 text-light ",
          });
        } else {
          console.log(data);
          const toastHtml = `<span className="toast">${data.msg} <i class="material-icons text-light">done_all</i></span>`;
          M.toast({
            html: toastHtml,
            classes: "rounded green lighten-1 text-light ",
          });
          setnewuser(false);
        }
      });
  }

  const postData = () => {
     ourFields();
  };

  const logData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        logemail
      )
    ) {
      const toastHtml = `<span className="toast">Iltimos Email manzilingizni to'g'ri kiriging <i class="material-icons ">error</i></span>`;
      M.toast({ html: toastHtml, classes: "rounded red darken-2 text-light " });
      return;
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: logemail,
        password: logpassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          const toastHtml = `<span className="toast">${data.error} <i class="material-icons ">error</i></span>`;
          M.toast({
            html: toastHtml,
            classes: "rounded red darken-2 text-light ",
          });
        } else {
          history.push("/");
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          const toastHtml = `<span className="toast">${data.msg} <i class="material-icons text-light">done_all</i></span>`;
          M.toast({
            html: toastHtml,
            classes: "rounded green lighten-1 text-light ",
          });
        }
      });
  };
  useEffect(()=>{
    if(img){
      uploadAvatar()
    }
  },[img])

  return (
    <Content>
      <div className="formContainer">
        <div className="formHeader">
          <div
            className={newuser ? "headerActive" : "headerInActive"}
            onClick={() => handleClick("signUp")}
          >
            <button className="headerButton"> Registratsiya </button>
          </div>
          <div
            className={newuser ? "headerInActive" : "headerActive"}
            onClick={() => handleClick("signIn")}
          >
            <button className="headerButton"> Kirish </button>
          </div>
        </div>
        <div className="formBody">
          {newuser ? (
            <Register
              email={regemail}
              password={regpassword}
              confirm={regconfirm}
              name={regname}
              setemail={setregemail}
              setpassword={setregpassword}
              setconfirm={setregconfirm}
              setname={setregname}
              img={img}
              setimg={setimg}
              url={url}
              seturl = {seturl}
            />
          ) : (
            <Login
              email={logemail}
              password={logpassword}
              setemail={setlogemail}
              setpassword={setlogpassword}
            />
          )}
        </div>
        <div className="formFooter">
          {newuser ? (
            <button onClick={() => postData()} className="saveForm">
              {" "}
              Ro'yxatdan o'tish{" "}
            </button>
          ) : (
            <button onClick={() => logData()} className="saveForm">
              {" "}
              Kirish{" "}
            </button>
          )}
        </div>
      </div>
    </Content>
  );
};
function Register(props) {
  const { setimg,url,name, setname, email, setemail, password, setpassword } = props;

  return (
    <div className="signUpContainer">
      <h4 className="headerText">Ro'yxatdan o'ting</h4>
      <div>
        <ImgUpload>
          <div className="container">
            <img
              src={url?url:'https://www.prajwaldesai.com/wp-content/uploads/2021/02/Find-Users-Last-Logon-Time-using-4-Easy-Methods.jpg'}
              alt="Avatar"
              className="image"
            />
            <div className="middle">
              <div className="text">
                <label htmlFor="upload-avatar">
                  <Input
                    accept="image/*"
                    name="avatar"
                    id="upload-avatar"
                    type="file"
                    onChange={e=>setimg(e.target.files[0])}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <AddAPhoto />
                  </IconButton>
                </label>
              </div>
            </div>
          </div>
        </ImgUpload>
      </div>
      <div className="inputSection">
        <input
          type="text"
          className="firstName"
          required
          name="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <label className="inputLabel">Ismingiz</label>
      </div>
      <div className="inputSection">
        <input
          type="text"
          className="emailAddress"
          name="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
        <label className="inputLabel">Email Manizlingiz</label>
      </div>
      <div className="inputSection">
        <input
          type="password"
          className="password"
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
        />
        <label className="inputLabel">Parolingizni kiriting</label>
      </div>
    </div>
  );
}

function Login(props) {
  const { email, setemail, password, setpassword } = props;

  return (
    <div className="signInContainer">
      <h4 className="headerText">Welcome Back</h4>
      <div className="inputSection">
        <input
          type="email"
          className="userName"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
        <label className="inputLabel">Emailizni kiriting</label>
      </div>
      <div className="inputSection">
        <input
          type="text"
          className="password"
          required
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <label className="inputLabel">Parolni kiriting</label>
      </div>
    </div>
  );
}

export const Content = styled.div`
  width: 100%;
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center;
  .comment-section {
    display: flex;
    flex-direction: column;
    p {
      padding: 0.5rem 2rem;
    }
  }
  .img-section {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .formContainer {
    color: #d8d9de;
    font-family: "Roboto", sans-serif;
    text-align: center;
    font-size: 28px;
    background-color: #3f3f3f;
    border-radius: 5px;
    box-shadow: 0px 0px 16px 0px rgba(50, 50, 50, 0.61);
    max-width: 500px;
    min-width: 500px;
    height: 100%;
    margin: 2rem auto;
    padding: 1rem 2rem;
    @media screen and (max-width: 500px) {
      min-width:auto;
      padding:.5rem 1rem;
    }
  }

  .formHeader {
    margin-bottom: 40px;
    position: relative;
    ${d_flex("row", "space-between", 'center')};
  }

  .formBody {
    height: 70%;
  }

  .formFooter {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 1rem;
  }
  .saveForm {
    outline: none;
    border: none;
    color: #d8d9de;
    font-family: "Roboto Mono", monospace;
    font-size: 20px;
    padding: 1rem 2rem;
    background-color: transparent;
    margin-top: 20px;
    border: 2px solid #ef5252;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .saveForm:hover {
    background-color: #ef5252;
    color: #3f3f3f;
  }
  .saveForm:active {
    transform: scale(1.2);
  }
  .headerActive {
    margin: 0px;
    padding: 1rem 2rem;
    width:auto;
    display:block;
    height: 100%;
    background-color: #3f3f3f;
    color: #d8d9de !important;  
    @media screen and (max-width: 400px) {
      padding:.5rem 1rem;
    }
  }
  .headerInActive {
    @media screen and (max-width: 400px) {
      padding:.5rem 1rem;
    }
    padding: 1rem 2rem;
    height: 100%;
    background-color: #ef5252;
    color: #3f3f3f;
    transition: all 0.3s ease;
  }
  .headerInActive:hover {
    background-color: #3f3f3f;
  }
  .headerButton {
    outline: none;
    border: none;
    border-radius:10px;
    overflow: hidden;
    font-family: "Roboto Mono", monospace;
    font-size: 20px;
    background-color: transparent;
    transition: all 0.5s ease;
    padding-top: 10px;
    color: #d8d9de;
    z-index: 12;
  }
  .headerText {
    margin-top: 5px;
    margin-bottom: 25px;
    z-index: 12;
  }
  .formContainer input:not([type="file"]) {
    outline: none;
    border: none;
    background-color: transparent;
    height: 40px;
    border-bottom: 2px solid #ef5252;
    color: #d8d9de;
    font-size: 18px;
  }
  .formContainer textarea {
    outline: none;
    border: none;
    background-color: transparent;
    height: 200px;
    border: 2px solid #ef5252;
    color: #d8d9de;
    font-size: 18px;
    padding: 0.5rem 1rem;
  }
  .formContainer textarea::placeholder {
    color: red;
  }
  .formContainer input:not([type="file"])::placeholder {
    color: red;
  }

  .inputSectionSplit {
    margin-bottom: 25px;
    width: 45%;
    display: inline-block;
  }
  .inputSection {
    margin-bottom: 25px;
    width: 90%;
    margin: auto;
    margin-bottom: 25px;
  }
  .firstName {
    width: 100%;
    display: block;
    transition: 0.3s ease all;
  }
  .lastName {
    width: 100%;
    display: block;
    transition: 0.3s ease all;
  }
  .textarealabel {
    pointer-events: none;
    display: block;
    font-size: 18px;
    color: #d8d9de;
    transform: translateY(calc(-200px + 0.5rem));
    transition: 0.4s ease all;
    text-align: left;
    margin-left: 1rem;
  }
  .inputLabel {
    pointer-events: none;
    display: block;
    font-size: 18px;
    color: #d8d9de;
    transform: translateY(-40px);
    transition: 0.4s ease all;
    text-align: left;
  }
  .emailAddress {
    width: 100%;
    display: block;
    transition: 0.3s ease all;
  }
  .password,
  .article {
    width: 100%;
    display: block;
    transition: 0.3s ease all;
  }
  .userName {
    width: 100%;
    display: block;
    transition: 0.3s ease all;
  }
  .custom-file-input {
    color: transparent;
  }
  .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
  }
  .custom-file-input::before {
    content: "Rasm Yuklash";
    color: white;
    display: inline-block;
    background: transparent;
    border: 1px solid green;
    border-radius: 3px;
    padding: 1rem 2em;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 18px;
  }
  .custom-file-input:hover::before {
    border-color: black;
    background: green;
  }
  .custom-file-input:active {
    outline: 0;
  }
  .custom-file-input:active::before {
    background: green;
  }
  .firstName:focus + .inputLabel {
    transform: translateY(5px);
  }
  .article:focus + .textarealabel {
    transform: translateY(5px);
  }
  .firstName:focus + .inputLabel {
    transform: translateY(5px);
  }
  .firstName:valid + .inputLabel {
    transform: translateY(5px);
  }
  .lastName:focus + .inputLabel {
    transform: translateY(5px);
  }
  .lastName:valid + .inputLabel {
    transform: translateY(5px);
  }
  .emailAddress:focus + .inputLabel {
    transform: translateY(5px);
  }
  .emailAddress:valid + .inputLabel {
    transform: translateY(5px);
  }
  .password:focus + .inputLabel {
    transform: translateY(5px);
  }
  .password:valid + .inputLabel {
    transform: translateY(5px);
  }
  .userName:focus + .inputLabel {
    transform: translateY(5px);
  }
  .userName:valid + .inputLabel {
    transform: translateY(5px);
  }
`;

export const ImgUpload = styled.div`
  .container {
    position: relative;
    width: 50%;
    overflow: hidden;
    display: flex;
    justify-content:center;
    align-items:center;
  }
  #upload-avatar{
    display:none
  }
  .image {
    opacity: 1;
    display: block;
    width:150px;
    height:150px;
    object-fit:cover;
    border-radius:50%;
    transition: 0.5s ease;
    backface-visibility: hidden;
  }

  .middle {
    transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }

  .container:hover .image {
    opacity: 0.3;
  }

  .container:hover .middle {
    opacity: 1;
  }

  .text {
    background-color: #04aa6d;
    border-radius:10px;
    color: white;
    font-size: 16px;
    padding: .5rem 1rem;
  }
  @media screen and (max-width: 350px) {
    .image{
      width:100px;
      height:100px;
    }
  }
`;

export default Signin;
