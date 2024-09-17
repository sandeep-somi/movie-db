import React from 'react'
import ReactPlayer from 'react-player'

const YoutubePlayer = ({ videoKey }) => (
  <div className='player-wrapper'>
    <ReactPlayer
      className="video-player"
      url={`https://www.youtube.com/watch?v=${videoKey}`}
      controls={true}
      playing={true}
      data-testid="youtube-player"
      width='100%'
      height='100%'
    />
  </div>);

export default YoutubePlayer;