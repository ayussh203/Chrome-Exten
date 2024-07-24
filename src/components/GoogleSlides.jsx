import React from 'react';

const GoogleSlides = () => (
  <div className="widget">
    <h3>Google Slides</h3>
    <iframe
      src="https://docs.google.com/presentation/d/e/YOUR_EMBEDDED_ID/embed?start=false&loop=false&delayms=3000"
      width="100%"
      height="300px"
      frameBorder="0"
      allowFullScreen
      mozAllowFullScreen="true"
      webkitAllowFullScreen="true"
    ></iframe>
  </div>
);

export default GoogleSlides;
