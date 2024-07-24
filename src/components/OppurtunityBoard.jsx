import React, { useState } from 'react';

const OpportunityBoard = () => {
  const [opportunities, setOpportunities] = useState([{ task: '' }]);

  const addOpportunity = () => {
    setOpportunities([...opportunities, { task: '' }]);
  };

  return (
    <div className="widget">
      <h3>Opportunity Board</h3>
      {opportunities.map((opp, index) => (
        <div key={index}>
          <input
            type="text"
            value={opp.task}
            onChange={(e) => {
              const newOpportunities = [...opportunities];
              newOpportunities[index].task = e.target.value;
              setOpportunities(newOpportunities);
            }}
          />
        </div>
      ))}
      <button onClick={addOpportunity}>Add Opportunity</button>
    </div>
  );
};

export default OpportunityBoard;
