import React from 'react';

const GoogleMeetWidget = () => {
  return (
    <div className="widget">
      <h3>Google Meet</h3>
      <iframe
        src="https://meet.google.com/"
        width="100%"
        height="300px"
        frameBorder="0"
        allow="camera; microphone"
      ></iframe>
    </div>
  );
};

export default GoogleMeetWidget;
