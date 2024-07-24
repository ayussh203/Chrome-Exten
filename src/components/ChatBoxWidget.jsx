import React, { useState } from 'react';
import axios from 'axios';

const ChatBoxWidget = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const askQuestion = async () => {
    try {
      const res = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: input,
        max_tokens: 150,
      }, {
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
        },
      });
      setResponse(res.data.choices[0].text);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <div className="widget">
      <h3>Chat Box</h3>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={askQuestion}>Ask</button>
      <p>{response}</p>
    </div>
  );
};

export default ChatBoxWidget;
