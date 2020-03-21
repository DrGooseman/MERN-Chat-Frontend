import React, { useRef, useState, useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../auth-context";

function ChatArea(props) {
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  function changeText(event) {
    setText(event.target.value);
  }

  const filePickerRef = useRef();

  function pickImageHandler() {
    filePickerRef.current.click();
  }

  function pickedImageHandler(event) {
    let pickedFile;
    //  let fileIsValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      // setFile(pickedFile);
      //  fileIsValid = true;
      sendPicture(pickedFile);
    } //else fileIsValid = false;
  }

  async function sendMessage() {
    const chat = {
      chatId: props.currentChat._id,
      message: {
        message: text,
        user: auth.username,
        date: new Date(),
        messageType: "text"
      }
    };
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/chats",
        "PATCH",
        JSON.stringify(chat),
        {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      );
    } catch (err) {}
  }

  async function sendPicture(pickedFile) {
    try {
      const formData = new FormData();
      formData.append("chatId", props.currentChat._id);
      formData.append("user", auth.username);
      formData.append("picture", pickedFile);
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/chats/picture",
        "PATCH",
        formData,
        {
          Authorization: auth.token
        }
      );
      // setFile(null);
    } catch (err) {}
  }

  return (
    <div id="chat-form">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedImageHandler}
      />

      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          <Alert.Heading>An error has occured :(</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      <button onClick={pickImageHandler}>
        <i className="fas fa-paperclip fa-2x"></i>
      </button>

      {/* <img src="https://picsum.photos/20" alt="add attachment" /> */}
      <input
        type="text"
        placeholder="type a message"
        onChange={changeText}
        value={text}
        onKeyDown={event => {
          if (!text) return;
          if (event.key !== "Enter") return;
          sendMessage();
          //props.handleSend(text);
          setText("");
        }}
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
