import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SendIcon from "@mui/icons-material/Send";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Container, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import HomeSidebar from "./../components/HomeSidebar";
import { Usercontext } from "./../App";
import CommentIcon from "@mui/icons-material/Comment";
import Loader from "../components/Loader";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SubscribeUserPost() {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(Usercontext);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    fetch("/subscribepost", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Ozodbek " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      })
      .catch((err) => console.log(err));
  }, []);

  const LikePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Ozodbek " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newPosts = data.map((item) => {
          console.log(result);
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newPosts);
      })
      .catch((err) => console.log(err));
  };
  const UnLikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Ozodbek " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newPosts = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newPosts);
      })
      .catch((err) => console.log(err));
  };

  const commentPost = (comment, postId) => {
    fetch("/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Ozodbek " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        comment,
        postId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newPosts = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newPosts);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const onSubmitHandler = (e, id) => {
    e.preventDefault();
    if (e.target[0].value.length !== 0) {
      commentPost(e.target[0].value, id);
      console.log(e.target[0].value);
      e.target[0].value = "";
    }
  };
  const deletePost = (id) => {
    fetch(`/deletepost/${id}`, {
      method: "delete",
      headers: {
        Authorization: "Ozodbek " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newPosts = data.filter((post) => post._id !== result._id);
        setData(newPosts);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {!data ? (
        <Loader />
      ) : (
        <Container sx={{ padding: "2rem 0" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Grid item xs={12} sm={7} md={8}>
              <Box
                mt={3}
                sx={{
                  display: "grid",
                  gridGap: "30px",
                  gridTemplateColumns: "repeat(auto-fill)",
                }}
              >
                <h4>Mening Do'stlarim postlari</h4>
                {data ? (
                  data
                    .map((post) => (
                      <Card key={post._id}>
                        <CardHeader
                          action={
                            post.postedBy._id === state._id ? (
                              <IconButton
                                aria-label="settings"
                                onClick={() => deletePost(post._id)}
                              >
                                <DeleteForeverIcon
                                  sx={{ color: "red", fontSize: 30 }}
                                />
                              </IconButton>
                            ) : null
                          }
                          avatar={
                            <Link
                              to={
                                post.postedBy._id === state._id
                                  ? `/profile`
                                  : `/user/${post.postedBy._id}`
                              }
                            >
                              {" "}
                              <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                              >
                                {post.postedBy.name.slice(0, 1)}
                              </Avatar>
                            </Link>
                          }
                          title={post.postedBy.name}
                          subheader={new Date().toDateString()}
                        />
                        <CardMedia
                          component="img"
                          height="300"
                          image={post.photo}
                          alt="Paella dish"
                        />

                        <CardActions disableSpacing>
                          {post.likes.includes(state._id) ? (
                            <IconButton
                              aria-label="share"
                              onClick={() => UnLikePost(post._id)}
                            >
                              <ThumbDownAltIcon />
                            </IconButton>
                          ) : (
                            <IconButton
                              aria-label="add to favorites"
                              onClick={() => LikePost(post._id)}
                            >
                              <ThumbUpIcon />
                            </IconButton>
                          )}
                          <IconButton onClick={handleExpandClick}>
                            <ExpandMore
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                              <CommentIcon />
                            </ExpandMore>
                          </IconButton>
                        </CardActions>
                        <CardActions>
                          <IconButton
                            sx={{
                              fontSize: 18,
                              fontWeight: "500",
                              pointerEvents: "none",
                            }}
                          >
                            Likes:&nbsp;{post.likes.length}
                          </IconButton>
                          <IconButton
                            sx={{
                              fontSize: 18,
                              pointerEvents: "none",
                              fontWeight: "500",
                            }}
                          >
                            Comments:&nbsp;{post.comments.length}
                          </IconButton>
                        </CardActions>
                        <CardContent>
                          <Typography variant="h4" color="text.secondary">
                            {post.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <div className="inputSection">
                              <form
                                onSubmit={(e) => onSubmitHandler(e, post._id)}
                                style={{ display: "flex" }}
                              >
                                <input
                                  type="text"
                                  placeholder="Izoh Yozish"
                                  className="firstName"
                                />
                                <CardHeader
                                  avatar={
                                    <Link
                                      to={
                                        post.postedBy._id === state._id
                                          ? `/profile`
                                          : `/user/${post.postedBy._id}`
                                      }
                                    >
                                      <Avatar
                                        sx={{ bgcolor: red[500] }}
                                        aria-label="recipe"
                                      >
                                        {state.name.slice(0, 1)}
                                      </Avatar>
                                    </Link>
                                  }
                                  action={
                                    <IconButton
                                      type="submit"
                                      aria-label="settings"
                                    >
                                      <SendIcon />
                                    </IconButton>
                                  }
                                />
                              </form>
                            </div>
                          </Typography>
                        </CardContent>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <Typography sx={{ padding: "0 2rem" }} paragraph>
                            Comments
                          </Typography>
                          <CardContent
                            sx={{ maxHeight: 300, overflowY: "auto" }}
                          >
                            {post.comments.length ? (
                              post.comments
                                .map((comment) => (
                                  <Typography
                                    paragrapy
                                    key={comment._id}
                                    sx={{
                                      border: "1px solid rgb(116, 135, 121,.4)",
                                      marginBottom: "1rem",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    <div className="comment-section">
                                      <CardHeader
                                        avatar={
                                          <Link
                                            to={
                                              comment.commitedBy._id ===
                                              state._id
                                                ? `/profile`
                                                : `/user/${comment.commitedBy._id}`
                                            }
                                          >
                                            <Avatar
                                              sx={{ bgcolor: red[500] }}
                                              aria-label="recipe"
                                            >
                                              {comment.commitedBy.name.slice(
                                                0,
                                                1
                                              )}
                                            </Avatar>
                                          </Link>
                                        }
                                        title={comment.commitedBy.name}
                                        subheader={new Date().toDateString()}
                                      />
                                      <p
                                        style={{
                                          maxWidth: "80%",
                                          padding: ".5rem 2rem",
                                          pacity: ".8",
                                        }}
                                      >
                                        {" "}
                                        Comment:&nbsp;{comment.text}
                                      </p>
                                    </div>
                                  </Typography>
                                ))
                                .reverse()
                            ) : (
                              <h5>No Comments</h5>
                            )}
                          </CardContent>
                          <CardContent>
                            <ExpandMore
                              onClick={handleExpandClick}
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardContent>
                        </Collapse>
                      </Card>
                    ))
                    .reverse()
                ) : (
                  <h1>Not found</h1>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={5} md={4}>
              <HomeSidebar />
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
}
