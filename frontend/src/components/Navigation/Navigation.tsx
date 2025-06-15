import { Link, NavLink } from "react-router-dom";
import { Search, Bell, User, Home } from "lucide-react";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation(): JSX.Element {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="brand-name">
            <Home className="home-icon" />
            <h3 className="brand-text">CashFlow</h3>
          </Link>
          {/* <div className="search-container">
            <Search className="search-icon" />
            
          </div> */}
        </div>

        <div className="navbar-right">
          <div>
            <ProfileButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
