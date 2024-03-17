// import {useState, useEffect} from "react";
import classes from "./sidebar.module.css"
import { FaHome, FaMapMarked} from "react-icons/fa";
import SidebarItem from "./sidebarItem";
import PropTypes from "prop-types"



export default function Sidebar({ visible, onLinkClick}) {
  const handleLinkClick = (event, component) => {
    event.preventDefault();
    onLinkClick(component);
  };
  
  // console.log(userRole)

  const navItems = [
    { icon: <FaHome />, url: "/dashboard", name: "Dashboard" },
    { icon: <FaMapMarked />, url: "/tracker", name: "Tracker" },
  ];
  return (
    <div className={`${classes.container}`} style={{ transform: visible ? 'translateX(0)' : 'translateX(-100%)' }}>
      <div >
        <div className={classes.header}>
          <h2>Location Tracker</h2>
        </div>
        <nav>
          <ul>
            {navItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                url={item.url}
                name={item.name}
                dropdownItems={item.dropdownItems}
                handleLinkClick={(event) => handleLinkClick(event, item.url.replace('/', '').toLowerCase())}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  visible: PropTypes.bool,
  onLinkClick: PropTypes.func,
  userObject: PropTypes.object
}