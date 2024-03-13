import classes from "./Tracker.module.css"
import PropTypes from "prop-types";

export default function LocationItem({location}) {
  return (
    <div className={classes.locationItem}>
      <div className={classes.details}>
        <h4>Alaba</h4>
        <div className={classes.points}>
          <span>Longitude: {location.longitide}</span>
          <span>Latitude: {location.latitude}</span>
        </div>
      </div>
      <div>
        <p>2 hours ago</p>
      </div>
    </div>
  )
}

LocationItem.propTypes = {
  location: PropTypes.array
}
