import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="notice-board">
      {/* Google Slide Widget */}
      <div className="widget" id="google-slide-widget">
        <h3>Google Slides</h3>
        <iframe
          src="https://docs.google.com/presentation/d/e/YOUR_EMBEDDED_ID/embed?start=false&loop=false&delayms=3000"
          width="100%"
          height="300px"
          frameBorder="0"
          allowFullScreen={true}
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
        ></iframe>
      </div>

      {/* Pomodoro Timer Widget */}
      <div className="widget" id="pomodoro-timer-widget">
        <h3>Pomodoro Timer</h3>
        <div id="timer">{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
        <button id="start-button" onClick={startTimer}>Start</button>
      </div>

      {/* Google Calendar Widget */}
      <div className="widget" id="google-calendar-widget">
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

      {/* Announcements Widget */}
      <div className="widget" id="announcements-widget">
        <h3>Announcements</h3>
        <marquee behavior="scroll" direction="left">Happy Birthday.</marquee>
      </div>

      {/* Google Spreadsheet Widget */}
      <div className="widget" id="google-spreadsheet-widget">
        <h3>Google Spreadsheet</h3>
        <iframe
          src="https://docs.google.com/spreadsheets/d/1-bMrNct6qG741LQoqFro1BuZRsRZm4FKwkM91YxtaN0/edit?gid=0#gid=0"
          width="100%"
          height="300px"
          frameBorder="0"
        ></iframe>
      </div>

      {/* Google Form Widget */}
      <div className="widget" id="google-form-widget">
        <h3>Google Form</h3>
        <iframe
          src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
          width="100%"
          height="300px"
          frameBorder="0"
        >Loading…</iframe>
      </div>

      {/* Music Widget */}
      <div className="widget" id="music-widget">
        <h3>Music</h3>
        <audio controls>
          <source src="YOUR_AUDIO_FILE_URL" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default App;
