import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Content } from "../../pages/Signin";
import "materialize-css/dist/css/materialize.min.css";

import M from "materialize-css";
import {useHistory} from 'react-router-dom';

const Createpost = () => {
  const history = useHistory();

  const [title, settitle] = useState("");
  const [body, setbody] = useState("");
  const [img, setimg] = useState("");
  const [ url, seturl ]= useState(
    "https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool.jpg"
  );
 

  useEffect(()=>{
    if(url){
      fetch("http://localhost:5000/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Ozodbek " + localStorage.getItem('jwt')
      },
      
      body: JSON.stringify({
        title,
        body,
        picture: url,
      })
    }).then(res=>res.json())
    .then(data=>{
      if (data.error) {
        const toastHtml = `<span className="toast">${data.error} <i class="material-icons ">error</i></span>`;
        M.toast({
          html: toastHtml,
          classes: "rounded red darken-2 text-light ",
        });
      } else {
        const toastHtml = `<span className="toast">Maqola Qo'shildi <i class="material-icons text-light">done_all</i></span>`;
        M.toast({
          html: toastHtml,
          classes: "rounded green lighten-1 text-light ",
        });
        history.push('/')
      }
    })
    }
  }, [url]);


  const postDetails = () => {
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
        console.log(data);
        seturl(data.url);
      })
      .catch((err) => console.log(err));
    
  };

  return (
    <Container>
      <Content>
        
        <div className="formContainer">
          {/* <div className="img-section">
          <img
            src={url}
            alt=""
          />
        </div> */}
          <div className="formBody">
            <div className="signInContainer">
              <h4 className="headerText">Maqola Yozish</h4>
              <div className="inputSection">
                <input
                  type="text"
                  className="userName"
                  name="title"
                  required
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                />
                <label className="inputLabel">Sarlavha</label>
              </div>
              <div className="inputSection">
                <textarea
                  className="article"
                  required
                  name="body"
                  value={body}
                  onChange={(e) => setbody(e.target.value)}
                ></textarea>
                <label className="textarealabel" name="article">
                  Maqola
                </label>
              </div>
              <div className="inputSection">
                <input
                  type="file"
                  id="articleimg"
                  className="custom-file-input"
                  required
                  name="img"
                  onChange={(e) => setimg(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div className="formFooter">
            <button onClick={() => postDetails()} className="saveForm">
              Maqolani Qo'shish{" "}
            </button>
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default Createpost;
