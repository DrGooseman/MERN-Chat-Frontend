import React, { useContext } from "react";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";

import { getChatName } from "./../util/utils";

import { AuthContext } from "../auth-context";

function ChatTitle(props) {
  const auth = useContext(AuthContext);

  return (
    <div id="chat-title">
      <span>{props.currentChat && getChatName(props.currentChat, auth)}</span>
      <img
        onClick={props.handleDeleteChat}
        src="https://picsum.photos/20"
        alt="delete conversation"
      ></img>
      <OverlayTrigger
        trigger="click"
        key="profile"
        placement="left"
        overlay={
          <div className="popover-positioned-left">
            <img
              src={process.env.REACT_APP_ASSET_URL + auth.picture}
              alt="profile-pic"
            ></img>
            <h2>{auth.username}</h2>
            <h3>{auth.email}</h3>
            <Button onClick={auth.logout}>Logout</Button>
          </div>
        }
      >
        <div className="profile-pic">
          <img
            src={process.env.REACT_APP_ASSET_URL + auth.picture}
            alt="profile-pic"
          ></img>
        </div>
      </OverlayTrigger>
    </div>
  );
}

export default ChatTitle;
