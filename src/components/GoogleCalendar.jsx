import React from 'react';

const GoogleCalendar = () => (
  <div className="widget">
    <h3>Google Calendar Day View</h3>
    <iframe
      src="https://calendar.google.com/calendar/u/0/r?pli=1"
      style={{ border: 0 }}
      width="100%"
      height="300px"
      frameBorder="0"
      scrolling="no"
    ></iframe>
  </div>
);

export default GoogleCalendar;
