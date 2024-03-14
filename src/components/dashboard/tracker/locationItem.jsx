import { useState, useEffect } from "react";
import classes from "./Tracker.module.css";
import PropTypes from "prop-types";

const LocationItem = ({ location }) => {
  const [locationData, setLocationData] = useState({});
  const [timeElapsed, setTimeElapsed] = useState("");
  const APIKEY = 'd7b734ebc3b34fac9958084cf6863e5a'
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        // console.log("fetching data")
        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json&apiKey=${APIKEY}`);
        const data = await response.json();
        // console.log(data)
        setLocationData(data);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocationData();
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTimeInSeconds = Math.floor((currentTime - location.timestamp) / 1000);
      setTimeElapsed(formatTimeElapsed(elapsedTimeInSeconds));
    }, 1000);

    return () => clearInterval(interval);
  }, [location.latitude, location.longitude, location.timestamp]);
  // console.log(locationData)

  const formatTimeElapsed = (elapsedSeconds) => {
    if (elapsedSeconds < 60) {
      return `${elapsedSeconds} seconds`;
    } else if (elapsedSeconds < 3600) {
      const minutes = Math.floor(elapsedSeconds / 60);
      return `${minutes} minutes`;
    } else if (elapsedSeconds < 86400) {
      const hours = Math.floor(elapsedSeconds / 3600);
      return `${hours} hours`;
    } else {
      const days = Math.floor(elapsedSeconds / 86400);
      return `${days} days`;
    }
  };


  return (
    <div className={classes.locationItem}>
          <div className={classes.details}>
        {locationData.results && <h4>{locationData.results[0].city + ' ' + locationData.results[0].state + ', ' + locationData.results[0].country}</h4>}
            <div className={classes.points}>
              <span>Longitude: {location.longitude}</span>
              <span>Latitude: {location.latitude}</span>
            </div>
          </div>
          <div>
        <p>{timeElapsed} ago</p>
          </div>
    </div>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object
};

export default LocationItem;
