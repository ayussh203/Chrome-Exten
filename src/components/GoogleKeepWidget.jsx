import React from 'react';

const GoogleKeepWidget = () => {
  return (
    <div className="widget">
      <h3>Google Keep</h3>
      <iframe
        src="https://keep.google.com/"
        width="100%"
        height="300px"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default GoogleKeepWidget;
