import React from "react";

function Message(props) {
  return (
    <div className={props.messageUserType + " message-row"}>
      <div className="message-content">
        {props.messageUserType === "other-message" && props.pic && (
          <img
            className="message-row-prof"
            src={props.pic}
            alt="add attachment"
          />
        )}
        <div className="message-text">
          {props.messageType === "picture" ? (
            <img src={process.env.REACT_APP_ASSET_URL + props.message}></img>
          ) : (
            props.message
          )}
        </div>
        <div className="message-time">{props.messageDate}</div>
      </div>
    </div>
  );
}

export default Message;
