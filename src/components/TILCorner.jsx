import React, { useState } from 'react';

const TILCorner = () => {
  const [tilEntries, setTilEntries] = useState([
    { title: '', summary: '' }
  ]);

  const addTIL = () => {
    setTilEntries([...tilEntries, { title: '', summary: '' }]);
  };

  return (
    <div className="widget">
      <h3>Today I Learned (TIL) Corner</h3>
      {tilEntries.map((entry, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Title"
            value={entry.title}
            onChange={(e) => {
              const newEntries = [...tilEntries];
              newEntries[index].title = e.target.value;
              setTilEntries(newEntries);
            }}
          />
          <textarea
            placeholder="Summary"
            value={entry.summary}
            onChange={(e) => {
              const newEntries = [...tilEntries];
              newEntries[index].summary = e.target.value;
              setTilEntries(newEntries);
            }}
          />
        </div>
      ))}
      <button onClick={addTIL}>Add TIL</button>
    </div>
  );
};

export default TILCorner;
