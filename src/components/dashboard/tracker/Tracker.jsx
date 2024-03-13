import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import classes from "./Tracker.module.css";
import PropTypes from "prop-types";
import MarkerClusterGroup from 'react-leaflet-cluster';


const Tracker = ({ userLocation, userObject }) => {
  return (
    <div className={`d-flex ${classes.trackerWrap}`}>
      <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={15} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {userObject.locations.map((location, index) => ( // Added parentheses to return the Marker components
            <Marker key={index} position={[location.latitude, location.longitude]}>
              <Popup>
                Location {index+1}.
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      <div className={classes.locationWrap}>
        <h2>Locations</h2>
        <div className={classes.locationContainer}>
          <div className={classes.locationItem}>
            <div className={classes.details}>
              <h4>Alaba</h4>
              <div className={classes.points}>
                <span>Longitude: 38434645477</span>
                <span>Latitude: 95975697697</span>
              </div>
            </div>
            <div>
              <p>2 hours ago</p>
            </div>
          </div>
          <div className={classes.locationItem}>
            <div className={classes.details}>
              <h4>Alaba</h4>
              <div className={classes.points}>
                <span>Longitude: 38434645477</span>
                <span>Latitude: 95975697697</span>
              </div>
            </div>
            <div>
              <p>2 hours ago</p>
            </div>
          </div>
          <div className={classes.locationItem}>
            <div className={classes.details}>
              <h4>Alaba</h4>
              <div className={classes.points}>
                <span>Longitude: 38434645477</span>
                <span>Latitude: 95975697697</span>
              </div>
            </div>
            <div>
              <p>2 hours ago</p>
            </div>
          </div>
          <div className={classes.locationItem}>
            <div className={classes.details}>
              <h4>Alaba</h4>
              <div className={classes.points}>
                <span>Longitude: 38434645477</span>
                <span>Latitude: 95975697697</span>
              </div>
            </div>
            <div>
              <p>2 hours ago</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

Tracker.propTypes = {
  userLocation: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired
};

export default Tracker;
