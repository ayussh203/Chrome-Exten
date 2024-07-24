import React, { useState } from 'react';

const PollWidget = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const options = [
    { id: 1, text: 'Option 1' },
    { id: 2, text: 'Option 2' },
    { id: 3, text: 'Option 3' },
  ];

  const handleVote = () => {
    if (selectedOption) {
      setSubmitted(true);
      // You can add logic here to save the vote to a server or Google Sheet
    }
  };

  return (
    <div className="widget">
      <h3>Poll</h3>
      {!submitted ? (
        <div>
          {options.map((option) => (
            <div key={option.id}>
              <input
                type="radio"
                id={option.id}
                name="poll"
                value={option.text}
                onChange={() => setSelectedOption(option.id)}
              />
              <label htmlFor={option.id}>{option.text}</label>
            </div>
          ))}
          <button onClick={handleVote}>Submit Vote</button>
        </div>
      ) : (
        <p>Thank you for voting!</p>
      )}
    </div>
  );
};

export default PollWidget;
