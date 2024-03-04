import React, { useState, useEffect } from "react";
import classes from "./navbar.module.css";
import ProfileImage from "./profileImage.jpg";
import BackgroundImage from "./bg-1.jpg";
import { FaBars } from "react-icons/fa";
import Next from "./next.png"
import Carlendar from "./calendar.png"
import ShoopingBasket from "./shopping-basket.png"
import CreditCard from "./credit-card.png"
import Lifebuoy from "./lifebuoy.png"

const Navbar = ({ toggleSidebar, sidebarVisible, activeComponent, userObject, setLoggedIn }) => {
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const[lastName, setLastname]= useState(null)

  useEffect(() => {
    if (userObject) {
      // console.log(userObject)
      setFirstName(userObject.firstName);
      setLastname(userObject.lastName)
    }
  }, [userObject]);

  const handleNameClick = () => {
    setIsContainerVisible((prev) => !prev);
  };
  const handleLogOut = () => {
    setLoggedIn(false)
  }

  return (
    <div className={classes.container} style={{ width: !sidebarVisible && '100vw' }}>
      <div>
        <button className={classes.menuButton} onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div
          onClick={handleNameClick}
          className={`${classes.profile} d-flex ${isContainerVisible && classes.active
            }`}
        >
          <span>Hi, </span>
          <span>{firstName} { lastName}</span>
          <div
            className={classes.profileImage}
            style={{ backgroundImage: `url(${ProfileImage})` }}
          ></div>
        </div>
        {isContainerVisible && (
          <div className={classes.popContainer} onClick={handleNameClick}>
            <div
              className={classes.dropdownTop}
              style={{ backgroundImage: `url(${BackgroundImage})` }}
            >
              <img
                src={ProfileImage}
                alt="Profile"
                className={classes.profileImageDropdown}
              />
              <div>{firstName} {lastName}</div>
            </div>
            <ul className={classes.profileDropdown}>
              <li>
                <div>
                  <div>
                    <img src={Carlendar} alt="Carlendar" />
                  </div>
                  <div>
                    <h4>My Profile</h4>
                    <p>Account Settings and more</p>
                  </div>
                </div>
                <div>
                  <img src={Next} alt="Next" />
                </div>
              </li>
              <li>
                <div>
                  <div>
                    <img src={ShoopingBasket} alt="Subscription" />
                  </div>
                  <div>
                    <h4>Manage Subscription</h4>
                  </div>
                </div>
                <div>
                  <img src={Next} alt="Next" />
                </div>
              </li>
              <li>
                <div>
                  <div>
                    <img src={CreditCard} alt="Billing" />
                  </div>
                  <div>
                    <h4>Billing</h4>
                  </div>
                </div>
                <div>
                  <img src={Next} alt="Next" />
                </div>
              </li>
              <li>
                <div>
                  <div>
                    <img src={Lifebuoy} alt="Support" />
                  </div>
                  <div>
                    <h4>Support</h4>
                  </div>
                </div>
                <div>
                  <img src={Next} alt="Next" />
                </div>
              </li>
              <button onClick={handleLogOut}>Sign Out</button>
            </ul>
          </div>
        )}
      </div>
      <div>
        <h5>
          {activeComponent === 'dashboard' && 'Dashboard'}
          {activeComponent === 'users' && 'Users'}
          {activeComponent === 'territory' && 'Territory'}
        </h5>
      </div>
    </div>
  );
};

export default Navbar;