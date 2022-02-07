import { Container } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { d_flex, d_grid } from "../mixins";
import { Link } from "react-router-dom";
import { Usercontext } from "../App";
import Loader from "../components/Loader";
import { ImgUpload } from "./Signin";
import { Input, IconButton } from "@mui/material";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import Editmodal from "../components/EditModal";
import M from 'materialize-css';
export default function Profile() {
  const { state, dispatch } = useContext(Usercontext);
  const [profile, setprofile] = useState([]);
  const [img, setimg] = useState(undefined);
  const [url, seturl] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [userName, setUserName] = useState("");
  const updateAvatar = (file) => {
    setimg(file);
  };

  const editprofile = function(){
    console.log(userName)
    fetch('/editname', {
      method:"put",
      headers:{
        "Content-Type": "application/json",
        Authorization: "Ozodbek " + localStorage.getItem("jwt"),
      } , 
      body:JSON.stringify({
        newname:userName
      })
    })
      .then(res=>res.json())
      .then(result=>{
        if(userName){
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...state,
              name:result.name,
            })
          );
          dispatch({ type: "EDITPROFILE", payload: result.name});
        setEdit(false);
        const toastHtml = `<span className="toast">Profilingiz o'zgartirildi <i class="material-icons text-light">done_all</i></span>`;
        M.toast({
          html: toastHtml,
          classes: "rounded green darken-2 text-light ",
        }); 
        }
      })
   
    
  }
  useEffect(() => {
    if (img) {
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
          seturl(data.url);

          fetch("/updateavatar", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Ozodbek " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              avatar: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...state,
                  avatar: result.avatar,
                })
              );
              dispatch({ type: "UPDATEAVATAR", payload: result.avatar });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [img]);

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Ozodbek " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setprofile(result.posts);
      })
      .catch((err) => console.log(err));
  }, []);
  if (!profile || !state) {
    return <Loader />;
  }
  return (
    <Container>
      <Editmodal
        isActive={isEdit}
        setActive={setEdit}
        name={userName}
        setname={setUserName}
        setimg={setimg}
        savehandler={editprofile}
      />
      <Content>
        <ImgUpload>
          <div className="container">
            <img
              src={state&&state.avatar}
              alt={state.avatar ? `avatar-${state.name}` : "avatar"}
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
                    onChange={(e) => updateAvatar(e.target.files[0])}
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
        <div className="info-profile">
          <h1 className="info-profile__name">{state.name}</h1>
          <div className="info-profile__info">
            <p>
              <Link
                to="/myfollowerpost"
                className="btn green  darken-2 waves-effect waves-light"
              >
                <span>{state.followers ? state.followers.length : 0}</span>
                &nbsp;followers
              </Link>
            </p>
            <p>
              <Link
                to="/myfollowerpost"
                className="btn blue darken-2 waves-effect waves-light"
              >
                {state.following?.length || 0}
                &nbsp;<span>following</span>
              </Link>
            </p>
            <p>{profile.length} posts</p>
          </div>
          <div className="info-profile__info">
            <button onClick={()=>setEdit(true)} className="btn btn green darken-1"><i className="material-icons">settings</i></button>
          </div>
        </div>
      </Content>
      <h3>Galleraya</h3>
      <Gallery>
        {profile ? (
          profile.map((item) => (
            <div className="gallery-item" key={item._id}>
              <img src={item.photo} alt={item.title} />
            </div>
          ))
        ) : (
          <p>Gallery is Empty</p>
        )}
      </Gallery>
    </Container>
  );
}

export const Content = styled.div`
  padding: 2rem 0;
  ${d_grid("300px", "2rem")};
  border-bottom: 1px solid gray;
  .img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .info-profile {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    &__name {
      font-size: 2rem;
      font-weight: bold;
      line-height: 40px;
      opacity: 0.7;
      padding-bottom: 1rem;
      font-family: "Glory", sans-serif;
    }
    &__info {
      margin:1rem;
      ${d_flex("", "space-between", "center")};
      flex-wrap:wrap;
      p {
        
        font-size: 20px;
        margin-right: 1rem;
        margin-top:1rem;
        font-weight: 500;
      }
    }
  }
`;

export const Gallery = styled.div`
  padding: 2rem 0;
  ${d_grid("200px", "20px")};

  .gallery-item {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
