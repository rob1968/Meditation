import React from 'react';

const AudioPlayer = ({ audioUrl }) => {
  return (
    audioUrl && (
      <div className="mt-4">
        <audio controls src={audioUrl}></audio>
      </div>
    )
  );
};

export default AudioPlayer;