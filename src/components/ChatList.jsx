import React, { useState, useEffect, useContext } from "react";
import Conversation from "./Conversation";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { connectToSocket, emit } from "../api";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../auth-context";
import { getChatName, getPicture, getDate } from "./../util/utils";

function ChatList(props) {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [chats, setChats] = useState([]);
  const [lastUpdatedChat, setLastUpdatedChat] = useState();

  useEffect(() => {
    getChats();
    // connectToSocket(auth.username);
    connectToSocket(auth.username, receiveIncomingUpdate);
  }, []);

  function receiveIncomingUpdate(err, updatedChat) {
    setLastUpdatedChat(updatedChat);
    setChats(prevChats => {
      return [
        ...prevChats.filter(chat => chat._id !== updatedChat._id),
        updatedChat
      ];
    });
  }

  useEffect(() => {
    if (lastUpdatedChat && lastUpdatedChat._id === props.currentChat._id)
      props.setCurrentChat(lastUpdatedChat);
  }, [chats]);

  async function getChats() {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/chats",
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      );

      setChats(responseData.chats);

      // getQuestion();
    } catch (err) {}
  }

  function selectChat(chatId) {
    props.setCurrentChat(chats.find(chat => chat._id === chatId));
  }

  return (
    <div id="conversation-list">
      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          <Alert.Heading>An error has occured :(</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      {isLoading && (
        <div className="center-items-flex">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {chats.map(chat => (
        <Conversation
          key={chat._id}
          isActive={props.currentChat && chat._id === props.currentChat._id}
          name={getChatName(chat, auth)}
          lastMessage={chat.messages[chat.messages.length - 1].message}
          lastMessageDate={getDate(
            chat.messages[chat.messages.length - 1].date
          )}
          pic={process.env.REACT_APP_ASSET_URL + getPicture(chat, auth)}
          handleClick={() => selectChat(chat._id)}
        />
      ))}
      <button onClick={() => console.log(props.currentChat)}>click</button>
    </div>
  );
}

export default ChatList;
