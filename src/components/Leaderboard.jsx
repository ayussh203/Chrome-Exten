import React, { useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([
    { category: 'Most steps walked', value: 0 },
    { category: 'Most pages read', value: 0 },
    { category: 'Most pomodoro timers clocked', value: 0 }
  ]);

  return (
    <div className="widget">
      <h3>Leaderboard</h3>
      {leaders.map((leader, index) => (
        <div key={index}>
          <h4>{leader.category}</h4>
          <p>{leader.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
