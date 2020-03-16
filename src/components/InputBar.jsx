import React from "react";

function InputBar() {
  return (
    <div className="input-bar">
      <input
        type="text"
        className="input-text-field"
        placeholder="Type your message..."
      />
      <button className="btn btn-primary input-button">Hello</button>
    </div>
  );
}

export default InputBar;
