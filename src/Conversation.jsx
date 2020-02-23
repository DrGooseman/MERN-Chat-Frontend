import React from "react";

function Conversation(props) {
  return (
    <div
      className={"conversation" + (props.isActive ? " active" : "")}
      onClick={props.handleClick}
    >
      <img src={props.pic} alt="add attachment" />
      <div className="title-text">{props.name}</div>
      <div className="created-date">{props.lastMessageDate}</div>
      <div className="conversation-message">{props.lastMessage}</div>
    </div>
  );
}

export default Conversation;
