import {useState, useEffect} from "react";
import classes from "./sidebar.module.css"
import { FaChartPie, FaHome, FaMapMarked, FaServer, FaTasks, FaUserFriends, FaUsers, FaWrench } from "react-icons/fa";
import SidebarItem from "./sidebarItem";
import PropTypes from "prop-types"



export default function Sidebar({ visible, onLinkClick, userObject }) {
  const [userRole, setUserRole]=useState(null)
  const handleLinkClick = (event, component) => {
    event.preventDefault();
    onLinkClick(component);
  };
  useEffect(() => {
    if (userObject) {
      console.log(userObject)
      setUserRole(userObject.role);
    }
  }, [userObject]);
  console.log(userRole)

  const navItems = [
    { icon: <FaHome />, url: "/dashboard", name: "Dashboard" },
    { icon: <FaMapMarked />, url: "/territory", name: "Territory" },
    { icon: <FaTasks />, url: "/todo", name: "Todo" },
    {
      icon: <FaServer />,
      url: "/leads",
      name: "Leads",
      dropdownItems: [
        { url: "/import", name: "Import" },
        { url: "/import", name: "History" },
      ],
    },
    {
      icon: <FaChartPie />,
      url: "/reports",
      name: "Reports",
      dropdownItems: [
        { url: "/pins", name: "Manage Pins" },
        { url: "/proposals", name: "Proposals" },
        { url: "/activity", name: "Activity" },
      ],
    }, (userRole === 'admin') && (
    { icon: <FaUsers />, url: "/users", name: "Users" }),
    (userRole === 'admin') && ({ icon: <FaUserFriends />, url: "/teams", name: "Manage Teams" }),
    (userRole === 'admin') && ({
      icon: <FaWrench />,
      url: "/configuration",
      name: "Configuration",
      dropdownItems: [
        { url: "/pins", name: "Pins" },
        { url: "/tags", name: "Tags" },
        {
          url: "/inventory",
          name: "Inventory",
          dropdownItems: [
            { url: "/products", name: "Products" },
            { url: "/kits", name: "Kits" },
          ]
        },
        { url: "/services", name: "Services" },
        { url: "/contract", name: "Contract Terms" },
        { url: "/details", name: "Company Details" },
        { url: "/leaderboard", name: "Leaderboard" },
        { url: "/integration", name: "Integration" },
      ],
    }),
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