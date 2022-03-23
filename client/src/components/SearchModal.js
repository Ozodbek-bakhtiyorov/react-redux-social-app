import { CardHeader, IconButton, Avatar, Card } from "@mui/material";
import React from "react";
import { ContentModal } from "./EditModal";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default function SearchModal(props) {
  const { isActive, setActive, findedusers, search, setSearch } = props;

  const handleClick = (e) => {
    if (
      e.target.contains(document.querySelector(".modal-content")) &&
      !(e.target == document.querySelector(".modal-content"))
    ) {
      setActive(false);
      console.log();
      console.log(e.target);
    }
  };

  return (
    <ContentModal
      isActiv={isActive}
      className={`${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      <div className="modal-content">
        <span
          onClick={() => setActive(false)}
          className="close-btn green darken-2 text-light"
        >
          <i className="material-icons">close</i>
        </span>
        <span className="title">Kerakli foydalanuvchini qidirish</span>
        <div className="input-field">
          <i className="material-icons blue-text prefix">search</i>
          <input
            id="icon_prefix"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="validate"
          />
          <label htmlFor="icon_prefix">Qidirish</label>
        </div>
        <div className="search-result">
          {findedusers ? (
            findedusers.map((user) => (
              <Card key={user._id} sx={{ margin: "1rem .5rem" }}>
                <CardHeader
                  avatar={
                    <Link to={`/user/${user._id}`}>
                      {" "}
                      <Avatar
                        sx={{ bgcolor: "red" }}
                        aria-label="recipe"
                        src={user.avatar}
                        alt={user.name}
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
          ) : (
            <Loader />
          )}
        </div>
        <button
          onClick={() => {
            setSearch("");
            setActive(false);
          }}
          className=" btn-close btn blue darken-2 text-light waves-effect waves-light "
        >
          Close
        </button>
      </div>
    </ContentModal>
  );
}
