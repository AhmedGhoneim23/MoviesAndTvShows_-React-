import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container } from "./NavBar";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import NoImg from "./NoImage.jpg";

import axios from 'axios';

import "../styles/Videos.css";
import TrendingTrailer from '../trailers/TrendingTrailer';


function Trends() {
  const { toggle } = useContext(Container);
  const Api = 'https://api.themoviedb.org/3';
  const TrendsShown = '/trending/all/week';
  const [trendArray, setTrendArray] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [trendTitle, setTrendTitle] = useState('');
  const Image = "https://image.tmdb.org/t/p/w500/";

  const Trends = async () => {
    const data = await axios.get(`${Api}${TrendsShown}` , {
      params: {
        api_key: "8e8a3ed3b67d94a08e0dee7ceec1398c",
      },
    });
    const results = data.data.results;
    setTrendArray(results)
  };
  
  useEffect(() => {
    setTimeout(() => {
      Trends()
    }, 100)
  }, [])

  const TrendTitle = (trend) => {
    setTrendTitle(() => (trend.title ? trend.title : trend.name))
    setTrailer(!trailer)
  }
  
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {trendArray.map((trend) => {
            return (
              <Fragment>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle color="#fff" fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => TrendTitle(trend)} />
                  <img src={trend.poster_path ? `${Image}${trend.poster_path}` : NoImg} alt="" onClick={() => TrendTitle(trend) }/>
                    <h3 id="smaller-Text" style={{ color: toggle ? "gold" : "#0c1e25" }}>{trend.title ? trend.title : trend.name}</h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? console.log : <TrendingTrailer TrendTitle={trendTitle} toggle={toggle} />}
          <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={trailer ? 'DarkTheme' : 'LightThemeClose'} fontSize={55} color='#fff' cursor={'pointer'} onClick={() => {setTrailer(true)}} />
        </div>
      </div>
    </Fragment>
  )
}
export default Trends;
