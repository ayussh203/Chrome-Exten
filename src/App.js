import React, { useState, useEffect } from "react";
import axios from 'axios';
import { motion } from 'framer-motion';

import "./App.css";
import DailyQuote from "./dailyQuote";

const CLIENT_ID = 'd0b5a1e9ca704bc38105d52609f381d6';
const REDIRECT_URI = 'http://localhost:3000/callback';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';

const variants = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  slideIn: {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } }
  }
};

const App = () => {
  const DEFAULT_TIME = 20 * 60; // 20 minutes in seconds
  const [time, setTime] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState([]); // State for tasks
  const [newTask, setNewTask] = useState(""); // State for new task input
  const [steps, setSteps] = useState(0); // State for health tracker steps
  const [leaderboard, setLeaderboard] = useState({
    steps: 0,
    pagesRead: 0,
    pomodoroTimers: 0
  }); // State for leaderboard
  const [tilEntries, setTilEntries] = useState([]); // State for TIL entries
  const [tilTitle, setTilTitle] = useState(""); // State for TIL title input
  const [tilSummary, setTilSummary] = useState(""); // State for TIL summary input
  const [issues, setIssues] = useState([]); // State for issues
  const [issueDescription, setIssueDescription] = useState(""); // State for issue description input

  // State and functions for Spotify Music Widget
  const [token, setToken] = useState('');
  const [tracks, setTracks] = useState([]);

  // State for managing enabled/disabled widgets
  const [widgetSettings, setWidgetSettings] = useState({
    googleSlide: true,
    pomodoroTimer: true,
    googleCalendar: true,
    announcements: true,
    googleSpreadsheet: true,
    googleForm: true,
    music: true,
    spotifyMusic: true,
    issueTracker: true,
    dailyGrowthChecklist: true,
    healthTracker: true,
    leaderboard: true,
    tilCorner: true,
    googleMeet: true,
    googleKeep: true,
    pollWidget: true, // Added poll widget state
    floatingEmojis: true // Added floating emojis widget state
  });

  // State for Poll Widget
  const [poll, setPoll] = useState({
    question: "Is this a useful feature?",
    options: [
      { text: "Yes", votes: 0 },
      { text: "No", votes: 0 },
      { text: "Maybe", votes: 0 }
    ]
  });

  const handleVote = (index) => {
    const newPoll = { ...poll };
    newPoll.options[index].votes += 1;
    setPoll(newPoll);
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');
    
    if (!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    setToken(token);
  }, []);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(DEFAULT_TIME);
  };

  const increaseTime = () => {
    setTime(time + 60);
  };

  const decreaseTime = () => {
    if (time > 60) {
      setTime(time - 60);
    }
  };

  const handleTaskInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleTaskToggle = (index) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddSteps = () => {
    setSteps(steps + 1000);
    setLeaderboard({ ...leaderboard, steps: steps + 1000 });
  };

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  const searchTracks = async (query) => {
    try {
      const { data } = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: query,
          type: 'track'
        }
      });
      setTracks(data.tracks.items);
    } catch (error) {
      console.error("Error searching tracks:", error);
    }
  };

  const handleTilTitleChange = (e) => {
    setTilTitle(e.target.value);
  };

  const handleTilSummaryChange = (e) => {
    setTilSummary(e.target.value);
  };

  const handleAddTil = () => {
    if (tilTitle.trim() && tilSummary.trim()) {
      setTilEntries([...tilEntries, { title: tilTitle, summary: tilSummary }]);
      setTilTitle("");
      setTilSummary("");
    }
  };

  const handleIssueDescriptionChange = (e) => {
    setIssueDescription(e.target.value);
  };

  const handleAddIssue = () => {
    if (issueDescription.trim()) {
      setIssues([...issues, { description: issueDescription }]);
      setIssueDescription("");
    }
  };

  const handleWidgetToggle = (widget) => {
    setWidgetSettings({ ...widgetSettings, [widget]: !widgetSettings[widget] });
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const widgetVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="notice-board">
      {/* Meta Widget */}
      <motion.div 
    className="widget" 
    id="meta-widget"
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}
  >
    <h3>Meta: Enable/Disable Widgets</h3>
    {Object.keys(widgetSettings).map(widget => (
      <div key={widget} className="meta-item">
        <input 
          type="checkbox" 
          checked={widgetSettings[widget]} 
          onChange={() => handleWidgetToggle(widget)} 
        />
        <label>{widget.replace(/([A-Z])/g, ' $1').trim()}</label>
      </div>
    ))}
  </motion.div>

      {/* Conditionally Render Other Widgets */}
      {widgetSettings.googleSlide && (
  <motion.div 
    className="widget" 
    id="google-slide-widget"
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}
  >
    <h3>Google Slides</h3>
    <iframe
      src="https://docs.google.com/presentation/d/e/2PACX-1vSCjlPiiSDdqtM_xFwGaPJjDd0fwR8PETXugekVf_tDchdkGAO_I48Tf27UIME-Bsi-9ZGjjBxvhQOQ/embed?start=true&loop=true&delayms=3000"
      width="100%"
      height="300px"
      frameBorder="0"
      allowFullScreen={true}
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
    ></iframe>
  </motion.div>
)}

      {widgetSettings.pomodoroTimer && (
        <motion.div 
        className="widget pomodoro-timer-widget"
        initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}
        >
          <h3>Pomodoro Timer</h3>
          <div className="timer">{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</div>
          <div className="timer-controls">
            <button className="control-button" onClick={increaseTime}>
              +
            </button>
            <button className="control-button" onClick={decreaseTime}>
              -
            </button>
          </div>
          <div className="timer-actions">
            <button className="start-button" onClick={startTimer}>
              Start
            </button>
            <button className="stop-button" onClick={stopTimer}>
              Stop
            </button>
          </div>
          <div className="reset-action">
            <button className="reset-button" onClick={resetTimer}>
              Reset
            </button>
          </div>
        </motion.div>
      )}

      {widgetSettings.googleCalendar && (
        <motion.div 
        className="widget" 
    id="google-calendar-widget"
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}
        >
          <h3>Google Calendar Day View</h3>
          <iframe
            src="https://calendar.google.com/calendar/embed?src=somya.sethi.831%40gmail.com&ctz=Asia%2FKolkata&mode=DAY&bgcolor=%23FEFBD8&color=%23EECEB9&showTitle=0&showTz=0&showCalendars=1&showNav=1&showPrint=0"
            style={{ border: 0 }}
            width="100%"
            height="300px"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </motion.div>
      )}

{widgetSettings.announcements && (
        <motion.div 
          className="widget" 
          id="announcements-widget"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3>Announcements</h3>
          <marquee behavior="scroll" direction="left">
            Happy Birthday.
          </marquee>
        </motion.div>
      )}


      {widgetSettings.googleSpreadsheet && (
        <motion.div 
          className="widget" 
          id="google-spreadsheet-widget"
          initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}
        >
          <h3>Google Spreadsheet</h3>
          <iframe
            src="https://docs.google.com/spreadsheets/d/1kJh2FDisDD1jwt5CkZCVr7L6s3yyoGJbaOfqrK7NFh4/edit?usp=sharing"
            width="100%"
            height="300px"
            frameBorder="0"
          ></iframe>
        </motion.div>
      )}

      {widgetSettings.googleForm && (
        <motion.div 
          className="widget" 
          id="google-form-widget"
          initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}
        >
         <h3>Google Form</h3>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSc-wRJUhmE474R_k5_vaTg-FlcBwJu4xZNJy2GV7IFA1oxDMA/viewform?embedded=true"
            width="100%"
            height="300px"
            frameBorder="0"
          >
            Loading…
          </iframe>
        </motion.div>
      )}

     

      {widgetSettings.spotifyMusic && (
        <motion.div 
          className="widget" 
          id="spotify-music-widget"
          
        >
          <h3>Spotify Music</h3>
          {!token ? (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            >
              Login to Spotify
            </a>
          ) : (
            <div>
              <button onClick={logout}>Logout</button>
              <input
                type="text"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    searchTracks(e.target.value);
                  }
                }}
                placeholder="Search for a track"
              />
              <div>
                {tracks.map(track => (
                  <div key={track.id}>
                    <img src={track.album.images[0].url} alt={track.name} />
                    <p>{track.name}</p>
                    <audio controls>
                      <source src={track.preview_url} type="audio/mpeg" />
                    </audio>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {widgetSettings.issueTracker && (
        <motion.div 
          className="widget" 
          id="issue-tracker-widget"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3>Issue Tracker</h3>
          <textarea 
            placeholder="Describe your issue" 
            value={issueDescription} 
            onChange={handleIssueDescriptionChange}
          ></textarea>
          <button onClick={handleAddIssue}>Submit</button>
          <div className="issue-entries">
            {issues.map((issue, index) => (
              <div key={index} className="issue-entry">
                <p>{issue.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {widgetSettings.dailyGrowthChecklist && (
        <motion.div 
          className="widget" 
          id="daily-growth-checklist-widget"
          initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}
        >
          <h3>Daily Growth Checklist</h3>
          <div id="task-container">
            <input
              id="task-input"
              type="text"
              placeholder="Task"
              value={newTask}
              onChange={handleTaskInputChange}
            />
            <button id="add-task-button" onClick={handleAddTask}>Add Task</button>
          </div>
          <ul id="task-list">
            {tasks.map((task, index) => (
              <li key={index} className={task.completed ? "completed" : ""}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskToggle(index)}
                />
                <span>{task.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {widgetSettings.healthTracker && (
        <motion.div 
          className="widget" 
          id="health-tracker-widget"
          initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}
        >
          <h3>Health Tracker</h3>
          <p>Steps: {steps}</p>
          <button onClick={handleAddSteps}>Add 1000 Steps</button>
        </motion.div>
      )}

      {widgetSettings.leaderboard && (
        <motion.div 
          className="widget" 
          id="leaderboard-widget"
          initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}
        >
          <h3>Leaderboard</h3>
          <div>
            <h4>Most steps walked</h4>
            <p>{leaderboard.steps}</p>
          </div>
          <div>
            <h4>Most pages read</h4>
            <p>{leaderboard.pagesRead}</p>
          </div>
          <div>
            <h4>Most pomodoro timers clocked</h4>
            <p>{leaderboard.pomodoroTimers}</p>
          </div>
        </motion.div>
      )}
      <DailyQuote/>

      {widgetSettings.tilCorner && (
        <motion.div 
          className="widget" 
          id="til-corner-widget"
          initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}
        >
          <h3>Today I Learned (TIL) Corner</h3>
          <div>
            <input 
              type="text" 
              placeholder="Title" 
              value={tilTitle} 
              onChange={handleTilTitleChange}
            />
            <textarea 
              placeholder="Summary" 
              value={tilSummary} 
              onChange={handleTilSummaryChange}
            ></textarea>
          </div>
          <button onClick={handleAddTil}>Add TIL</button>
          <div className="til-entries">
            {tilEntries.map((entry, index) => (
              <div key={index} className="til-entry">
                <h4>{entry.title}</h4>
                <p>{entry.summary}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {widgetSettings.googleMeet && (
        <motion.div 
          className="widget" 
          id="google-meet-widget"
          initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}
        >
          <h3>Google Meet</h3>
          <div className="google-meet-content">
            <a 
              href="https://meet.google.com/your-meet-code" 
              target="_blank" 
              rel="noopener noreferrer"
              className="google-meet-link"
            >
              Connect Here
            </a>
          </div>
        </motion.div>
      )}

      {widgetSettings.googleKeep && (
        <motion.div 
          className="widget" 
          id="google-keep-widget"
          initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}
        >
          <h3>Google Keep</h3>
          <p>
            <a
              href="https://keep.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Google Keep
            </a>
          </p>
        </motion.div>
      )}

      {/* Poll Widget */}
      {widgetSettings.pollWidget && (
        <motion.div 
          className="widget" 
          id="poll-widget"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3>{poll.question}</h3>
          {poll.options.map((option, index) => (
            <button key={index} onClick={() => handleVote(index)}>
              {option.text} ({option.votes})
            </button>
          ))}
        </motion.div>
      )}

      {/* Floating Emojis Widget */}
     {widgetSettings.floatingEmojis && (
  <motion.div 
    className="widget" 
    id="floating-emojis-widget"
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}
  >
    <h3>Floating Emojis</h3>
    <span className="emoji" role="img" aria-label="emoji">😊</span>
    <span className="emoji" role="img" aria-label="emoji">🎉</span>
    <span className="emoji" role="img" aria-label="emoji">👍</span>
    <span className="emoji" role="img" aria-label="emoji">💡</span>
    <span className="emoji" role="img" aria-label="emoji">❤️</span>
    <span className="emoji" role="img" aria-label="emoji">🌟</span>
    <span className="emoji" role="img" aria-label="emoji">🔥</span>
    <span className="emoji" role="img" aria-label="emoji">😎</span>
    <span className="emoji" role="img" aria-label="emoji">🌈</span>
    <span className="emoji" role="img" aria-label="emoji">🎶</span>
  </motion.div>
)}
    </div>
  );
};

export default App;
