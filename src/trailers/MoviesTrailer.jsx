import React, { Fragment, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';

import '../styles/MovieTrailer.css';


function MoviesTrailer({MoviesTitle, toggle}) {
  const [video, setVideo] = useState("");
  const [videoURL, setVideoURL] = useState("");

  function handleSearch() {
    setVideo(MoviesTitle)
    movieTrailer(video).then((res) => {
    setVideoURL(res);
    });
  }

  useEffect(() => {
    handleSearch()
  }, [videoURL])

  return (
    <Fragment>
      <div className='container'></div>
      <div className='player'>
        <h2 id={toggle ? 'TrailerMovie-name-dark' : 'TrailerMovie-name-light'}>{MoviesTitle}</h2>
        <ReactPlayer url={videoURL} controls={true} width={'900px'} height={'600px'} muted={false}/>
      </div>
    </Fragment>
  )
}

export default MoviesTrailer;