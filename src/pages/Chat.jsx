import React, { useState, useContext, useRef, useEffect } from "react";

import ChatArea from "../components/ChatArea";
import Message from "../components/Message";
import ChatList from "../components/ChatList";
import NewChatModal from "../components/NewChatModal";
import ChatTitle from "../components/ChatTitle";

import { AuthContext } from "../auth-context";

import { getChatName, getPictureOfUser, getDate } from "./../util/utils";

function Chat() {
  const [currentChat, setCurrentChat] = useState(null);
  const [showingNewChatModal, setShowingNewChatModal] = useState(false);
  const [previousChatId, setPreviousChatId] = useState();

  const messagesEndRef = useRef(null);

  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!currentChat) return;
    if (!previousChatId || previousChatId !== currentChat._id) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
    setPreviousChatId(currentChat._id);
  }, [currentChat]);

  function handleDeleteChat() {
    // setConversations(
    //   conversations.filter(conversation => conversation._id !== currentChat._id)
    // );
    setCurrentChat(null);
  }

  function sendMessage(messageContent) {
    const currentdate = new Date();
    var datetime =
      currentdate.toLocaleString("default", { month: "short" }) +
      " " +
      currentdate.getDate() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes();

    const newMessage = {
      content: messageContent,
      owner: auth.username,
      date: datetime
    };

    // const newConversations = [...conversations];
    // newConversations
    const updatedChat = { ...currentChat };
    updatedChat.messages.push(newMessage);
    setCurrentChat(updatedChat);
  }

  function handleCreateChat(chat) {
    setCurrentChat(chat);
  }

  return (
    <div id="chat-container">
      <div id="search-container">
        <input type="text" placeholder="Search" />
      </div>

      <ChatList setCurrentChat={setCurrentChat} currentChat={currentChat} />
      {/* <div id="conversation-list">
        {conversations.map(chat => (
          <Conversation
            key={chat._id}
            isActive={currentChat && chat._id === currentChat._id}
            name={getChatName(chat)}
            lastMessage={chat.messages[chat.messages.length - 1].content}
            lastMessageDate={chat.messages[chat.messages.length - 1].date}
            pic="https://picsum.photos/24"
            handleClick={() => selectChat(chat._id)}
          />
        ))}
      </div> */}

      <NewChatModal
        handleCreateChat={handleCreateChat}
        show={showingNewChatModal}
        onHide={() => setShowingNewChatModal(false)}
      />

      <div id="new-message-container">
        <button onClick={() => setShowingNewChatModal(true)}>+</button>
      </div>

      <ChatTitle
        currentChat={currentChat}
        handleDeleteChat={handleDeleteChat}
      />
      <div className="bug-parent">
        <div id="chat-message-list">
          <div ref={messagesEndRef}></div>
          {currentChat &&
            currentChat.messages
              .slice(0)
              .reverse()
              .map((message, index) => (
                <Message
                  key={index}
                  messageType={message.messageType}
                  messageUserType={
                    message.user === auth.username
                      ? "you-message"
                      : "other-message"
                  }
                  message={message.message}
                  messageDate={getDate(message.date)}
                  pic={
                    process.env.REACT_APP_ASSET_URL +
                    getPictureOfUser(currentChat, message.user)
                  }
                />
              ))}
        </div>
      </div>

      {currentChat && (
        <ChatArea currentChat={currentChat} handleSend={sendMessage} />
      )}
    </div>
  );
}

export default Chat;
