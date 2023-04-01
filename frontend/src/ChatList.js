import React from 'react';
import "./ChatList.css";


export function ChatList() {
  const chatThreads = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Bob Smith' },
  ];

  return (
    <div>
      <h3>ChatList</h3>
      <ul>
        {chatThreads.map(chatThread => (
          <li key={chatThread.id}>{chatThread.name}</li>
        ))}
      </ul>
    </div>
  );
}
