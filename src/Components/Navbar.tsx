import "../Styling/Navbar.css";
import { useState, useEffect } from "react";
import moment from "moment-timezone";

const Navbar = () => {
  const [currentDateAndTime, setCurrentDateAndTime] = useState(
    moment().format("MMMM Do YYYY, HH:mm")
  );
  const updateTime = () => {
    setCurrentDateAndTime(moment().format("MMMM Do YYYY, HH:mm"));
  };
  useEffect(() => {
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <a href="/" className="title">
        Website
      </a>
      <ul>
        <li className="website">
          <a href="/settings">Settings</a>
        </li>
        <li className="website">
          <a href="/app">App</a>
        </li>
        <li>
          <div>{currentDateAndTime}</div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
