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
      const newChats = [
        ...prevChats.filter(chat => chat._id !== updatedChat._id),
        updatedChat
      ];
      sortChats(newChats);
      return newChats;
    });
  }

  useEffect(() => {
    if (
      lastUpdatedChat &&
      props.currentChat &&
      lastUpdatedChat._id === props.currentChat._id
    )
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

      let chats = responseData.chats;

      sortChats(chats);

      setChats(chats);

      // getQuestion();
    } catch (err) {}
  }

  function selectChat(chatId) {
    props.setCurrentChat(chats.find(chat => chat._id === chatId));
  }

  function sortChats(chats) {
    chats.sort((a, b) =>
      new Date(a.messages[a.messages.length - 1].date) >
      new Date(b.messages[b.messages.length - 1].date)
        ? -1
        : new Date(b.messages[b.messages.length - 1].date) >
          new Date(a.messages[a.messages.length - 1].date)
        ? 1
        : 0
    );
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
    </div>
  );
}

export default ChatList;
