import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
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

  const startTimer = () => setIsRunning(true);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="widget">
      <h3>Pomodoro Timer</h3>
      <div id="timer">{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
      <button id="start-button" onClick={startTimer}>Start</button>
    </div>
  );
};

export default PomodoroTimer;
