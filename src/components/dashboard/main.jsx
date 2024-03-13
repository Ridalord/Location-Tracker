
import {useState, useEffect} from "react";
// import Select from "./select/select";
import classes from "./dashboard.module.css"
import User from "./user.png"
import File from "./folder.png"
// import CardTemplate from "./cardTemplate/cardTemplate";
import PropTypes from "prop-types"


const Main = ({ userObject }) => {
  const [,setFirstName] = useState(null);
  const [,setLastname] = useState(null)

  useEffect(() => {
    if (userObject) {
      // console.log(userObject)
      setFirstName(userObject.firstName);
      setLastname(userObject.lastName)
    }
  }, [setFirstName, setLastname, userObject]);
  return (
    <div className={ classes.mainContainer}>
      <div className={classes.mainWrap}>
        {/* <div className={`${classes.activity}`}>
          <span>
            <h3>Company Activity</h3>
            <Select />
          </span>
          <div className={classes.data}>
            <span>0</span>
            <span>Total Doors Knocked</span>
          </div>
        </div> */}
        <div className={classes.pinsFile}>
          <div>
            <img src={User} alt="User Icon" />
            <div>
              <span>Name</span>
              <span>Imported this month</span>
            </div>
          </div>
          <div>
            <img src={File} alt="User Icon" />
            <div>
              <span>0.00 GB / 1.00 GB</span>
              <span>File Storage Space</span>
            </div>
          </div>
        </div>
        {/* <CardTemplate userObject={userObject} title="Most Doors Knocked" name={firstName + ' ' +lastName} className={classes.third} />
        <CardTemplate userObject={userObject} title="Top Sales Rep" name={firstName + ' ' + lastName} className={classes.fourth} />
        <CardTemplate userObject={userObject} title="Best Closing Ratio" name={firstName + ' ' + lastName} className={classes.fifth} />
        <CardTemplate userObject={userObject} title="Team Sales Ranking" name="Team 1 Phone" className={classes.sixth} /> */}
      </div>
    </div>
  );
};

Main.propTypes = {
  userObject: PropTypes.object
}

export default Main;
