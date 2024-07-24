import React from 'react';

const GoogleForm = () => (
  <div className="widget">
    <h3>Google Form</h3>
    <iframe
      src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
      width="100%"
      height="300px"
      frameBorder="0"
    >Loading…</iframe>
  </div>
);

export default GoogleForm;
