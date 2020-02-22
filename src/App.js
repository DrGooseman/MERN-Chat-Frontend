import React from "react";

function App() {
  return (
    <div id="chat-container">
      <div id="search-container">
        <input type="text" placeholder="Search" />
      </div>

      <div id="conversation-list">
        <div className="conversation">
          <img src="https://picsum.photos/20" alt="add attachment" />
          <div className="title-text">John Doe</div>
          <div className="created-date">Apr 16</div>
          <div className="conversation-message">This is a message.</div>
        </div>
      </div>

      <div id="new-message-container">
        <a href="#">+</a>
      </div>

      <div id="chat-title">
        <span>The chat name</span>
        <img src="https://picsum.photos/20" alt="delete conversation"></img>
      </div>

      <div id="chat-message-list">
        <div className="message-row you-message">
          <div className="message-content">
            <div className="message-text">Ok then</div>
            <div className="message-time">Apr 16</div>
          </div>
        </div>
        <div className="message-row other-message">
          <div className="message-content">
            <img src="https://picsum.photos/200" alt="add attachment" />
            <div className="message-text">Ok then</div>
            <div className="message-time">Apr 16</div>
          </div>
        </div>
      </div>

      <div id="chat-form">
        <img src="https://picsum.photos/20" alt="add attachment" />
        <input type="text" placeholder="type a message" />
      </div>
    </div>
  );
}

export default App;
