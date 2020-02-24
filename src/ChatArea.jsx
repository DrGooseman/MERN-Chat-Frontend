import React, { useState } from "react";

function ChatArea(props) {
  const [text, setText] = useState("");

  function changeText(event) {
    setText(event.target.value);
  }

  return (
    <div id="chat-form">
      <img src="https://picsum.photos/20" alt="add attachment" />
      <input
        type="text"
        placeholder="type a message"
        onChange={changeText}
        value={text}
      />
      <button
        onClick={() => {
          if (!text) return;
          props.handleSend(text);
          setText("");
        }}
        className={"btn btn-primary " + (text === "" ? " disabled" : "")}
      >
        Send
      </button>
    </div>
  );
}

export default ChatArea;
