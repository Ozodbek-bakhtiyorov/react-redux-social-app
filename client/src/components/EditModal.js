import React, {useEffect} from "react";
import styled from "styled-components";
import "materialize-css/dist/css/materialize.min.css";
import { d_flex } from "../mixins";
import { useDisableScroll } from "../hooks/useDisableScroll";
const Editmodal = ({ isActive, name, setname, setimg, setActive,savehandler }) => {
  useDisableScroll(isActive);
  return (
    <ContentModal
      className={`${isActive ? "active" : ""}`}
      onClick={(e) =>e.stopPropagation()}
      isActive={isActive}
    >
      <div className="modal-content">
        <span
          onClick={() => setActive(false)}
          className="close-btn green darken-2 text-light"
        >
          <i className="material-icons">close</i>
        </span>
        <span className="title">Profil Ma'lumotlarini o'zgartirish</span>
        <div className="input-field">
          <i className="material-icons blue-text prefix">account_circle</i>
          <input
            id="icon_prefix"
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="validate"
          />
          <label htmlFor="icon_prefix">Foydalanuvchi Nomi</label>
        </div>
        <div className="file-field input-field">
          <div className="btn yellow brown darken-3 waves-effect waves-light ">
            <span>
              <i className="material-icons">add_a_photo</i>
            </span>
            <input type="file" onChange={(e) => setimg(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          onClick={() =>savehandler()}
          className="btn blue darken-2 text-light waves-effect waves-light"
        >
          Save
        </button>
      </div>
    </ContentModal>
  );
};

export const ContentModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  border-radius:100%;
  opacity: 0;
  transform: scale(0);
  background: rgba(0, 0, 0, 0.8);
  transform-origin: top left;
  z-index: 1000;
  transition: all 0.4s ease-in-out;
  &.active {
    opacity: 1;
    border-radius:0;
    transform: scale(1);
  }

  ${d_flex("row", "center", "center")};
  .modal-content {
    background: rgba(255, 255, 255, 0.7);
    position: relative;
    .input-field {
      .btn {
        border-radius: 50%;
      }
    }
    .close-btn {
      ${d_flex("row", "center", "center")};
      position: absolute;
      padding: 0.3rem;
      border-radius: 50%;
      cursor: pointer;
      top: 1rem;
      right: 1rem;
      .material-icons {
        color: white;
      }
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      color:black;
    }
    width: 500px;
    heigh: 70vh;
    padding: 1rem 2rem;
    border-radius: 10px;
    border: 1px solid white;
  }
  .search-result{
    padding:1rem 0;
    max-height:400px;
    overflow:auto;
    .close-btn{
      padding:1rem 0;
    }
  }
`;

export default Editmodal;
