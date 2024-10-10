import React, { useState } from "react";
import { Link } from 'react-router-dom';
// import './Index.css';
function Index() {
  const [isServicesDropdownVisible, setServicesDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setServicesDropdownVisible(!isServicesDropdownVisible);
  };

  return (
    <div className="container">
      <section className="top-nav">
        <div className="logo" id="logo">  
          Logo
        </div>
        <input id="menu-toggle" type="checkbox" />
        <label className="menu-button-container" htmlFor="menu-toggle">
          <div className="menu-button"></div>
        </label>
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <div className="dropdown" onClick={toggleDropdown}>
              <Link to="#">
                Services
              </Link>
              {/* Dropdown Menu */}
              {isServicesDropdownVisible && (
                <ul className="dropdown-menu">
                  <li><Link to="/service1">Service 1</Link></li>
                  <li><Link to="/service2">Service 2</Link></li>
                  <li><Link to="/service3">Service 3</Link></li>
                </ul>
              )}
            </div>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Index;
