import React from 'react';
import './App.css';
import GoogleSlides from './components/GoogleSlides';
import PomodoroTimer from './components/PomodoroTimer';
import GoogleCalendar from './components/GoogleCalendar';
import Announcements from './components/Announcements';
import GoogleSpreadsheet from './components/GoogleSpreadsheet';
import GoogleForm from './components/GoogleForm';
import MusicPlayer from './components/MusicPlayer';
import PollWidget from './components/PollWidget';
import BookQuoteWidget from './components/BookQuoteWidget';
import IssueTracker from './components/IssueTracker';
import DailyGrowthChecklist from './components/DailyGrowthChecklist';
import HealthTracker from './components/HealthTracker';

import Leaderboard from './components/Leaderboard';
import TILCorner from './components/TILCorner';
import GoogleMeetWidget from './components/GoogleMeetWidget';
import GoogleKeepWidget from './components/GoogleKeepWidget';
import ChatBoxWidget from './components/ChatBoxWidget';
import NotionPageWidget from './components/NotionPageWidget';

const App = () => {
  return (
    <div className="notice-board">
      <GoogleSlides />
      <PomodoroTimer />
      <GoogleCalendar />
      <Announcements />
      <GoogleSpreadsheet />
      <GoogleForm />
      <MusicPlayer />
      <PollWidget />
      <BookQuoteWidget />
      <IssueTracker />
      <DailyGrowthChecklist />
      <HealthTracker />
      
      <Leaderboard />
      <TILCorner />
      <GoogleMeetWidget />
      <GoogleKeepWidget />
      <ChatBoxWidget />
      <NotionPageWidget />
    </div>
  );
};

export default App;
