import React, { useState, useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../auth-context";

function ChatArea(props) {
  const [text, setText] = useState("");
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  function changeText(event) {
    setText(event.target.value);
  }

  async function sendMessage() {
    const chat = {
      users: props.currentChat.users,
      message: { message: text, user: auth.username, date: new Date() }
    };
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/chats",
        "POST",
        JSON.stringify(chat),
        {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      );
    } catch (err) {}
  }

  return (
    <div id="chat-form">
      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          <Alert.Heading>An error has occured :(</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
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
          sendMessage();
          //props.handleSend(text);
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
