import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import classes from "./Tracker.module.css";
import PropTypes from "prop-types";
import MarkerClusterGroup from 'react-leaflet-cluster';


const Tracker = ({ userLocation, userObject }) => {
  return (
    <div className={classes.trackerWrap}>
      <MapContainer center={userLocation} zoom={15} scrollWheelZoom={false}>
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
    </div>
  );
};

Tracker.propTypes = {
  userLocation: PropTypes.array.isRequired,
  userObject: PropTypes.object.isRequired
};

export default Tracker;
