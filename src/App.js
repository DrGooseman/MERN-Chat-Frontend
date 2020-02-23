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
  const [currentChat, setCurrentChat] = useState(conversations[0]);
  const [currentUser, setCurrentUser] = useState("Jim");

  function selectChat(chatId) {
    setCurrentChat(conversations.find(chat => chat._id === chatId));
  }

  function getChatName(chat) {
    return chat.participants;
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
            isActive={chat._id === currentChat._id}
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
        <span>{getChatName(currentChat)}</span>
        <img src="https://picsum.photos/20" alt="delete conversation"></img>
      </div>

      <div id="chat-message-list">
        {currentChat.messages.map(message => (
          <Message
            messageType={
              message.owner === currentUser ? "you-message" : "other-message"
            }
            message={message.content}
            messageTime={message.time}
            pic="https://picsum.photos/24"
          />
        ))}
      </div>

      <ChatArea />
    </div>
  );
}

export default App;
