import { useEffect, useState } from "react";
import classes from "./dashboard.module.css";
import Navbar from "./navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import Main from "./main";
import PropTypes from "prop-types";
import Tracker from "./tracker/Tracker";

const DashboardContainer = ({ toggleSidebar, sidebarVisible, userObject, setLoggedIn, setUserObject }) => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        // Get initial location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );

        // Watch for location changes
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
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

    getLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      setUserObject((prevUserObject) => ({
        ...prevUserObject,
        locations: [
          { latitude: userLocation[0], longitude: userLocation[1] },
          ...(prevUserObject.locations || []).slice(0, 4),
        ],
      }));
    }
  }, [userLocation, setUserObject]);

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
          2023 &copy; Lexarsmart
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
  setUserObject: PropTypes.func
};

const Dashboard = ({ userObject, token, setLoggedIn, setUserObject }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div>
      <DashboardContainer userObject={userObject} token={token} setLoggedIn={setLoggedIn} toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} setUserObject={setUserObject} />
    </div>
  );
};

Dashboard.propTypes = {
  userObject: PropTypes.object,
  token: PropTypes.string,
  setLoggedIn: PropTypes.func,
  setUserObject: PropTypes.func,
};

export default Dashboard;
