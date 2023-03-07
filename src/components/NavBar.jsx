import React, { Fragment, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Routes, Route, NavLink } from "react-router-dom";
import  Movies  from "./Movies";
import  TvShows  from "./TvShows";
import  Pricing  from "./Pricing";
import  Trends  from "./Trends";

import "../styles/NavBarStyle.css";

export const Container = React.createContext();

function NavBar() {
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState('');

  return (
    <Container.Provider value={{toggle, inputValue}}>
      <Fragment>
        <nav id={toggle ? "" : "navBarColor"}>
          <div className="nav-options">
            <NavLink to="/">
            <h1 id={toggle ? "" : "heading"}>LooKMoviE</h1>
            </NavLink>
            <NavLink to="/" style={toggle ? ({isActive}) => {return {color:isActive ? 'yellow' : '#EE9B00'}} : ({isActive}) => {return {color:isActive ? 'yellow' : '#EEE'}}}>
            <span id={toggle ? "Movies" : "MoviesLight"}>Movies</span>
            </NavLink>
            <NavLink to="/TvShows" style={toggle ? ({isActive}) => {return {color:isActive ? 'yellow' : '#EE9B00'}} : ({isActive}) => {return {color:isActive ? 'yellow' : '#EEE'}}}>
            <span id={toggle ? "Movies" : "MoviesLight"}>TvShows</span>
            </NavLink>
            <NavLink to="/Trends"  style={toggle ? ({isActive}) => {return {color:isActive ? 'yellow' : '#EE9B00'}} : ({isActive}) => {return {color:isActive ? 'yellow' : '#EEE'}}}>
            <span id={toggle ? "Movies" : "MoviesLight"}>Trending</span>
            </NavLink>
            <NavLink to="/Pricing" style={toggle ? ({isActive}) => {return {color:isActive ? 'yellow' : '#EE9B00'}} : ({isActive}) => {return {color:isActive ? 'yellow' : '#EEE'}}}>
            <span id={toggle ? "Movies" : "MoviesLight"}>Pricing</span>
            </NavLink>
          </div>
          <div className="input-group">
          <input type="text" placeholder="Search Whatever You Want" onChange={(e) => setInputValue(e.target.value)} />
          <HiSearch id="search"  fontSize={21} color="black" />
          <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
            <div id={toggle ? "Color-switcher-mover" : "Color-switcher-moved"}></div>
          </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={ <Movies /> } />
          <Route path="TvShows" element={ <TvShows /> } />
          <Route path="Pricing" element={ <Pricing /> } />
          <Route path="Trends" element={ <Trends /> } />
        </Routes>
      </Fragment>
    </Container.Provider>
  );
};

export default NavBar;
