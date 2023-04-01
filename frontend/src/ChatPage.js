import React from 'react';
import {ChatList} from './ChatList';
import {ChatRoom} from './ChatRoom';
// import {ChatMessages} from './ChatMessages';
// import {ChatInput} from './ChatInput';

import { NavigationBar } from "./NavBar";
import './Chat.css';

export function ChatPage() {


  return (
    <div>
        {/* Navigationbar */}
      <NavigationBar page={"user"} />
        <div>
        <h1>Chat</h1>
        <div className="chat-container">
            <ChatList />
            <div className="chat-messages">
            <ChatRoom />
            </div>
        </div>
        </div>
    </div>
  );
}

