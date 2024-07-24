import React, { useState } from 'react';
import axios from 'axios';

const IssueTracker = () => {
  const [issue, setIssue] = useState('');
  const [message, setMessage] = useState('');

  const submitIssue = async () => {
    try {
      await axios.post('https://your-google-sheets-endpoint', { issue });
      setMessage('Issue submitted successfully!');
    } catch (error) {
      setMessage('Error submitting issue.');
    }
  };

  return (
    <div className="widget">
      <h3>Issue Tracker</h3>
      <textarea value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Describe your issue"></textarea>
      <button onClick={submitIssue}>Submit</button>
      <p>{message}</p>
    </div>
  );
};

export default IssueTracker;
