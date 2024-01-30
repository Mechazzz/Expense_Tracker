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
          <a href="/">App</a>
        </li>
        <li className="dashboard">
          <a href="/dashboard">Dashboard</a>
        </li>
        <li className="website">
          <a href="/settings">Settings</a>
        </li>
        <li>
          <div>{currentDateAndTime}</div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
