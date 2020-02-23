import React from "react";

function ChatArea() {
  return (
    <div id="chat-form">
      <img src="https://picsum.photos/20" alt="add attachment" />
      <input type="text" placeholder="type a message" />
      <button className="btn btn-primary">Send</button>
    </div>
  );
}

export default ChatArea;
