import React from 'react';

function ChatBox(props) {
  return (
    <div className='app'>
        <div className="chat-section">
          <div className="challenge-details">
            {props.details}
          </div>
          <div className="chat-window">
            {props.windowChat}
            {props.messageInput}
          </div>
        </div>
    </div>
    
  );
}

export default ChatBox;
