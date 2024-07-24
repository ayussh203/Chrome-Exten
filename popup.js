document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup loaded');

  // Initialize Google Slide widget
  const googleSlideWidget = document.getElementById('google-slide-widget');
  googleSlideWidget.innerHTML = '<iframe src="https://docs.google.com/presentation/d/e/YOUR_EMBEDDED_ID/embed?start=false&loop=false&delayms=3000" width="100%" height="300px" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';

  // Initialize Pomodoro Timer widget
  const pomodoroWidget = document.getElementById('pomodoro-timer-widget');
  pomodoroWidget.innerHTML = '<div id="timer">25:00</div><button id="start-button">Start</button>';

  let timer;
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', () => {
      let time = 25 * 60;
      clearInterval(timer);
      timer = setInterval(() => {
          const minutes = Math.floor(time / 60);
          const seconds = time % 60;
          document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
          time--;
          if (time < 0) clearInterval(timer);
      }, 1000);
  });

  // Initialize Google Calendar widget
  const googleCalendarWidget = document.getElementById('google-calendar-widget');
  googleCalendarWidget.innerHTML = '<iframe src="https://calendar.google.com/calendar/u/0/r?pli=1" style="border: 0" width="100%" height="300px" frameborder="0" scrolling="no"></iframe>';

  // Initialize Announcements widget
  const announcementsWidget = document.getElementById('announcements-widget');
  announcementsWidget.innerHTML = '<marquee behavior="scroll" direction="left">Happy Birthday.</marquee>';

  // Initialize Google Spreadsheet widget
  const googleSpreadsheetWidget = document.getElementById('google-spreadsheet-widget');
  googleSpreadsheetWidget.innerHTML = '<iframe src="https://docs.google.com/spreadsheets/d/1-bMrNct6qG741LQoqFro1BuZRsRZm4FKwkM91YxtaN0/edit?gid=0#gid=0" width="100%" height="300px" frameborder="0"></iframe>';

  // Initialize Google Form widget
  const googleFormWidget = document.getElementById('google-form-widget');
  googleFormWidget.innerHTML = '<iframe src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" width="100%" height="300px" frameborder="0">Loading…</iframe>';

  // Initialize Music widget
  const musicWidget = document.getElementById('music-widget');
  musicWidget.innerHTML = '<audio controls><source src="YOUR_AUDIO_FILE_URL" type="audio/mpeg">Your browser does not support the audio element.</audio>';
});
