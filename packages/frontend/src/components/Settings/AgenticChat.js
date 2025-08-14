// Agentic Chat Interface
import React, { useState } from 'react';

function AgenticChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    // Send message to AI system and update chat
    const newMessage = {
      user: 'You',
      text: inputValue,
    };
    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate AI response
    const aiResponse = {
      user: 'AI',
      text: 'This is a simulated AI response.',
    };
    setMessages(prev => [...prev, aiResponse]);
  };

  return (
    <div className="agentic-chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.user === 'You' ? 'user-message' : 'ai-message'}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}

export default AgenticChat;
