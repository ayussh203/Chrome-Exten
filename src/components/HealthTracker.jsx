import React, { useState } from 'react';

const HealthTracker = () => {
  const [steps, setSteps] = useState(0);

  const increaseSteps = () => {
    setSteps(steps + 1000);
  };

  return (
    <div className="widget">
      <h3>Health Tracker</h3>
      <p>Steps: {steps}</p>
      <button onClick={increaseSteps}>Add 1000 Steps</button>
    </div>
  );
};

export default HealthTracker;
