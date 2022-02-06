import { Container } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { Usercontext } from "./../App";
import { useParams } from "react-router-dom";
import { Content, Gallery } from "./Profile";
import Loader from "../components/Loader";
export default function Userprofile() {
  const { id } = useParams();

  const { state, dispatch } = useContext(Usercontext);
  const [profile, setprofile] = useState(null);
  const [showFollowBtn, setShowFollowBtn] = useState(true);
  console.log(state?state.following.includes(id):'none')
  useEffect(()=>{
    if(state){
      if(state.following.includes(id)){
        setShowFollowBtn(false)
      }
      else{setShowFollowBtn(true)}
    }
  }, [state])
  
  useEffect(() => {
   
    fetch(`http://localhost:5000/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Ozodbek " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setprofile(result);
      })
      .catch((err) => console.log(err));
  },[id]);

  const unFollowUser = () => {
    fetch("http://localhost:5000/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Ozodbek " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setprofile((prev) => {
          const newFollowers = prev.user.followers.filter((f) => f != data._id);
          return {
            ...prev,
            user: {
              ...prev.user,
              followers: newFollowers,
            },
          };
        });
        console.log(profile);
      });
    setShowFollowBtn(true);
  };
  const followUser = () => {
    
    fetch("http://localhost:5000/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Ozodbek " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.fallowers },
        });
        localStorage.setItem("user", JSON.stringify(data));
       if(profile){
        setprofile((prev) => {
          return {
            ...prev,
            user: {
              ...prev.user,
              followers: [...prev.user.followers, data._id],
            },
          };
        });
       }
        console.log(profile);
      });
    setShowFollowBtn(false);
  };
  if (!profile) {
    return <Loader />;
  }
  return (
    <Container>
      <Content>
        <div className="img">
          {profile?.user.avatar ? (
            <img src={profile.user.avatar} alt={profile.user.name} />
          ) : (
            <img
              src="https://www.prajwaldesai.com/wp-content/uploads/2021/02/Find-Users-Last-Logon-Time-using-4-Easy-Methods.jpg"
              alt={profile.user.name}
            />
          )}
        </div>
        <div className="info-profile">
          <h1 className="info-profile__name">{profile.user.name}</h1>
          <div className="info-profile__info">
            <p>{profile?.user.following.length || 0} following</p>
            <p>{profile?.user.followers.length || 0} followers</p>
            <p>{profile?.posts.length || 0} posts</p>
          </div>
          <div className="info-profile__info">
            {showFollowBtn ? (
              <button
                onClick={() => followUser()}
                className="btn blue text-light"
              >
                Follow
              </button>
            ) : (
              <button
                onClick={() => unFollowUser()}
                className="btn red text-light"
              >
                Unfollow
              </button>
            )}
          </div>
        </div>
      </Content>
      <h3>Galleraya</h3>
      <Gallery>
        {profile.posts.length ? (
          profile.posts.map((item) => (
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
