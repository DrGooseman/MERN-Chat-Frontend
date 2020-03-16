import React from "react";
import ChatArea from "./ChatArea";
import InputBar from "./InputBar";

function Right() {
  return (
    <div className="right">
      <div className="rel">
        <h1>Right</h1>
        <ChatArea>Right</ChatArea>
        <InputBar></InputBar>
      </div>
    </div>
  );
}

export default Right;
