import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors"; "@mui/icons-material/MoreVert";
import { Content } from "./Homesidebar.el";
import Loader from "./Loader";
import { Link } from "react-router-dom";
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

export default function HomeSidebar() {
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    fetch("http://localhost:5000/allusers", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Ozodbek " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setUsers(result);
      })
      .catch((err) => console.log(err));
  }, []);
  if (!users) {
    return <Loader />;
  }
  return (
    <Content>
      <h5>
        <b>Barcha Foydalanuvchilar</b>
      </h5>
      <div className="content">
        {users ? (
          users
            .map((user) => (
              <Card key={user._id}>
                <CardHeader
                  // action={
                  //   <IconButton aria-label="settings">
                  //     <MoreVertIcon />
                  //   </IconButton>
                  // }
                  avatar={
                    <Link to={`/user/${user._id}`}>
                      <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                        src={user.avatar}
                      >
                        {user.name.slice(0, 1)}
                      </Avatar>
                    </Link>
                  }
                  title={user.name}
                  subheader={user.email}
                />
              </Card>
            ))
            .reverse()
        ) : (
          <h1>Not found</h1>
        )}
      </div>
    </Content>
  );
}
