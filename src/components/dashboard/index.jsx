import { useState} from "react";
import classes from "./dashboard.module.css";
import Navbar from "./navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import Main from "./main";
// import Territory from "./territory/Territory";
// import Users from "../users/users";
import PropTypes from "prop-types"


const DashboardContainer = ({ toggleSidebar, sidebarVisible, userObject, setLoggedIn }) => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const handleLinkClick = (component) => {
    // Close the sidebar when a link is clicked
    // You can add additional logic here if needed
    console.log(component)
    toggleSidebar();
    setActiveComponent(component);
  };
  // console.log(activeComponent)

  return (
    <div className={`${classes.wrap} d-flex`}>
      <Sidebar visible={sidebarVisible} setSidebarVisible={toggleSidebar} onLinkClick={handleLinkClick} userObject={userObject} />
      <main className={classes.main} style={{width: !sidebarVisible && `100vw`,position: !sidebarVisible && 'absolute'}}>
        <Navbar toggleSidebar={toggleSidebar} userObject={userObject} setLoggedIn={setLoggedIn} activeComponent={activeComponent} sidebarVisible={sidebarVisible} />
        <div className={classes.content}>
          {activeComponent === "dashboard" && <Main userObject={userObject} />}
          {/* {activeComponent === "territory" && <Territory />}
          {activeComponent === "users" && <Users userObject={userObject} token={token} />} */}
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
  setLoggedIn: PropTypes.func
}

const Dashboard = ({ userObject, token, setLoggedIn }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div>
      <DashboardContainer userObject={userObject} token={token} setLoggedIn={setLoggedIn} toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />
    </div>
  );
};

Dashboard.propTypes = {
  userObject: PropTypes.object,
  token: PropTypes.string,
  setLoggedIn: PropTypes.func,
}

export default Dashboard;