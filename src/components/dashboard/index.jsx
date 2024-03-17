import { useEffect, useState } from "react";
import classes from "./dashboard.module.css";
import Navbar from "./navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import Main from "./main";
import PropTypes from "prop-types";
import Tracker from "./tracker/Tracker";

const DashboardContainer = ({ toggleSidebar, sidebarVisible, userObject, setLoggedIn, setUserObject, loggedIn }) => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [userLocation, setUserLocation] = useState({});
  const [footerYear, setFooterYear] = useState(new Date().getFullYear()); // Initialize with current year

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        // Get initial location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const timestamp = new Date().getTime(); // Get current timestamp
            setUserLocation({ latitude, longitude, timestamp }); // Include timestamp
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );

        // Watch for location changes
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const timestamp = new Date().getTime(); // Get current timestamp
            setUserLocation({ latitude, longitude, timestamp }); // Include timestamp
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );

        // Clear watch on component unmount
        return () => navigator.geolocation.clearWatch(watchId);
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

     // Check if the user is logged in
      getLocation();
    
  }, [loggedIn]);


  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude && userObject ) { // Check if user is logged in and user object exists
      // Update userObject with the new location data if the number of locations is less than 5
      const users = JSON.parse(localStorage.getItem("users"))
      const userIndex = users.findIndex(User => User.email === userObject.email);
      const updateObject = users[userIndex] ;

      if ((updateObject.locations || []).length < 5) {
        setUserObject((prevUserObject) => ({
          ...prevUserObject,
          locations: [
            ...prevUserObject.locations || [],
            {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              timestamp: userLocation.timestamp
            }
          ],
        }));
        
      }
      // localStorage.setItem("userObject", JSON.stringify(userObject))
    }
  }, [userLocation.latitude, userLocation.longitude]);
  const users = JSON.parse(localStorage.getItem('users')) || [];

  useEffect(() => {
    // localStorage.setItem('userObject', JSON.stringify(userObject));

    const userIndex = users.findIndex(User => User.email === userObject.email);

    // const userIndex = localStorage.getItem("userIndex")
    if (userIndex !== -1) {
      users[userIndex] = userObject;
      console.log(users[userIndex])

      // Save the updated array back to local storage
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [userObject, users]);

  // Update footer year when component mounts
  useEffect(() => {
    setFooterYear(new Date().getFullYear());
  }, []);

  const handleLinkClick = (component) => {
    toggleSidebar();
    setActiveComponent(component);
  };

  return (
    <div className={`${classes.wrap} d-flex`}>
      <Sidebar visible={sidebarVisible} setSidebarVisible={toggleSidebar} onLinkClick={handleLinkClick} userObject={userObject} />
      <main className={classes.main} style={{ width: !sidebarVisible && `100vw`, position: !sidebarVisible && 'absolute' }}>
        <Navbar toggleSidebar={toggleSidebar} userObject={userObject} setLoggedIn={setLoggedIn} activeComponent={activeComponent} sidebarVisible={sidebarVisible} />
        <div className={classes.content}>
          {activeComponent === "dashboard" && <Main userObject={userObject} />}
          {activeComponent === "tracker" && <Tracker userLocation={userLocation} userObject={userObject} />}
        </div>
        <div className={classes.footer}>
          {footerYear} &copy; Zidio Development
        </div>
      </main>
    </div>
  );
};

DashboardContainer.propTypes = {
  toggleSidebar: PropTypes.func,
  sidebarVisible: PropTypes.bool,
  userObject: PropTypes.object,
  token: PropTypes.string,
  setLoggedIn: PropTypes.func,
  loggedIn: PropTypes.bool,
  setUserObject: PropTypes.func
};

const Dashboard = ({ userObject, token, setLoggedIn, setUserObject,loggedIn }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div>
      <DashboardContainer loggedIn={loggedIn} userObject={userObject} token={token} setLoggedIn={setLoggedIn} toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} setUserObject={setUserObject} />
    </div>
  );
};

Dashboard.propTypes = {
  userObject: PropTypes.object,
  token: PropTypes.string,
  setLoggedIn: PropTypes.func,
  loggedIn: PropTypes.bool,
  setUserObject: PropTypes.func,
};

export default Dashboard;
