import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import GoogleMapReact from "google-map-react";
import LocationPin from "./locationPin";
import Switch from "./switch";
import { mapStyleDark, mapStyleLight } from "./mapData";
import { useDimensionSetter } from "../../hooks/useDimensionSetter";
const googleToken = process.env.REACT_APP_GOOGLE_KEY;
const middle = {
  lat: 48.1372,
  lng: 11.576044,
};

const Map = ({
  location,
  zoomLevel,
  handleInfo,
  projects,
  mapStyle,
  color,
  switched,
}) => {
  const [width, height] = useDimensionSetter();
  const [zoom, setZoom] = useState();
  const [styles, setStyles] = useState();

  const handleZoomChange = (e) => {
    setZoom(e.zoom);
  };

  useEffect(() => {
    setStyles(mapStyle);
  }, []);

  const handleStyle = (check) => {
    if (check) {
      setStyles(mapStyleDark);
    } else {
      setStyles(mapStyleLight);
    }
  };

  const mapContainer = {
    height: height - 80 + "px",
    width: width + "px",
    position: "fixed",
    left: "0",
    bottom: "0",
    zIndex: "1",
  };

  return (
    <div>
      <div style={mapContainer}>
        <div style={buttonStyle}>
          <Switch onClick={handleStyle} switched={switched} />
        </div>
        <GoogleMapReact
          center={location}
          bootstrapURLKeys={{ key: googleToken }}
          defaultCenter={middle}
          defaultZoom={12}
          zoom={zoomLevel}
          gestureHandling={"greedy"}
          id={"map"}
          onChange={handleZoomChange}
          options={{
            styles: styles,
            fullscreenControl: false,
          }}
        >
          {projects.map((item) => {
            if (item.id === null) {
              item.id = uniqid();
            }
            return (
              <LocationPin
                handleInfo={handleInfo}
                key={item.id}
                id={item.id}
                lat={item.lat}
                lng={item.lng}
                text={item.name}
                zoom={zoom}
                color={color}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;

const buttonStyle = {
  position: "absolute",
  bottom: "50px",
  left: "10px",
  zIndex: "99",
};
