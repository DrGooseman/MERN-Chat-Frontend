import React, { useState } from "react";
import ChatArea from "./ChatArea";
import Message from "./Message";
import Conversation from "./Conversation";

const conversations = [
  {
    _id: 0,
    participants: ["Jim", "Bill"],
    messages: [
      { content: "This is a message", date: "Apr 2 1:54", owner: "Jim" },
      { content: "What do you wanna do?", date: "Apr 2 1:54", owner: "Bill" },
      {
        content: "I dont fucking know, man...",
        date: "Apr 2 1:54",
        owner: "Jim"
      }
    ]
  },
  {
    _id: 1,
    participants: ["Jim", "Jerry"],
    messages: [
      { content: "This is a message TWO", date: "Apr 2 1:54", owner: "Jerry" },
      {
        content: "What do you wanna do TWO?",
        date: "Apr 2 1:54",
        owner: "Jim"
      },
      {
        content: "I dont fucking know, man... TWO",
        date: "Apr 2 1:54",
        owner: "Jerry"
      }
    ]
  }
];

function App() {
  // const [conversations, setConversations] = useState(conversations);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState("Jim");

  function selectChat(chatId) {
    setCurrentChat(conversations.find(chat => chat._id === chatId));
  }

  function getChatName(chat) {
    let chatName = "";
    chat.participants.forEach(user => {
      if (user !== currentUser) {
        if (chatName.length > 0) chatName += ", ";
        chatName += user;
      }
    });
    return chatName;
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
      owner: currentUser,
      date: datetime
    };

    // const newConversations = [...conversations];
    // newConversations
    const updatedChat = { ...currentChat };
    updatedChat.messages.push(newMessage);
    setCurrentChat(updatedChat);
  }

  return (
    <div id="chat-container">
      <div id="search-container">
        <input type="text" placeholder="Search" />
      </div>

      <div id="conversation-list">
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
      </div>

      <div id="new-message-container">
        <a href="#">+</a>
      </div>

      <div id="chat-title">
        <span>{currentChat && getChatName(currentChat)}</span>
        <img src="https://picsum.photos/20" alt="delete conversation"></img>
      </div>

      <div id="chat-message-list">
        {currentChat &&
          currentChat.messages
            .slice(0)
            .reverse()
            .map((message, index) => (
              <Message
                key={index}
                messageType={
                  message.owner === currentUser
                    ? "you-message"
                    : "other-message"
                }
                message={message.content}
                messageDate={message.date}
                pic="https://picsum.photos/24"
              />
            ))}
      </div>

      {currentChat && <ChatArea handleSend={sendMessage} />}
    </div>
  );
}

export default App;
