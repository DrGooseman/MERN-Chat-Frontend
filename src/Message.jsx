import React from "react";

function Message(props) {
  return (
    <div className={props.messageType + " message-row"}>
      <div className="message-content">
        {props.messageType === "other-message" && (
          <img src={props.pic} alt="add attachment" />
        )}
        <div className="message-text">{props.message}</div>
        <div className="message-time">{props.messageDate}</div>
      </div>
    </div>
  );
}

export default Message;
