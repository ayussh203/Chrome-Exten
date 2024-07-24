import React from 'react';

const MusicPlayer = () => (
  <div className="widget">
    <h3>Music</h3>
    <audio controls>
      <source src="YOUR_AUDIO_FILE_URL" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
);

export default MusicPlayer;
