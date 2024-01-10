import "../Styling/Navbar.css";

const Navbar = () => {
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
      </ul>
    </nav>
  );
};

export default Navbar;
