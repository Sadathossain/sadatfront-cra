import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
        <ul>
          <li>
            <Link to="/login">Login Page</Link>
            <Link to="/home">Home Page</Link>
          </li>
          <li>
            <Link to="/jukebox">Jukebox Page</Link>
            <Link to="/gameroom">Gameroom Page</Link>
            <Link to="/newsroom">Newsroom Page</Link>
            <Link to="/forecast">Forecast Page</Link>
            <Link to="/whoami">Whoami Page</Link>
          </li>
          <li>
            <Link to="/notebook">Markdown Editor Page</Link>
            <Link to="/notebook/cookbook">Cookbook Page</Link>
            <Link to="/notebook/diffeditor">Diff Editor Page</Link>
            <Link to="/notebook/notebook">Notebook Page</Link>
            {/* <Link to="/notebook/mdeditor">Markdown Editor Page</Link> */}
          </li>
        </ul>
    </div>
  );
};

export default Home;