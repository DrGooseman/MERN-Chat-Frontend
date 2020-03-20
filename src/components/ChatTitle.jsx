import React, { useContext, useState } from "react";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";

import { getChatName } from "./../util/utils";

import { AuthContext } from "../auth-context";
import AddUserModal from "./AddUserModal";
import { disconnect } from "../api";

function ChatTitle(props) {
  const auth = useContext(AuthContext);
  const [showingAddUserModal, setShowingAddUserModal] = useState(false);

  function handleLogout() {
    disconnect();
    auth.logout();
  }

  return (
    <React.Fragment>
      <AddUserModal
        currentChat={props.currentChat}
        show={showingAddUserModal}
        onHide={() => setShowingAddUserModal(false)}
      />

      <div id="chat-title">
        <span>{props.currentChat && getChatName(props.currentChat, auth)}</span>
        {props.currentChat ? (
          <Button onClick={() => setShowingAddUserModal(true)}>Add User</Button>
        ) : (
          <div></div>
        )}

        {/* <img
        onClick={props.handleDeleteChat}
        src="https://picsum.photos/20"
        alt="delete conversation"
      ></img> */}
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
              <br></br>
              <Button onClick={handleLogout}>Logout</Button>
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
    </React.Fragment>
  );
}

export default ChatTitle;
