import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import {
  TiWeatherPartlySunny,
  TiWeatherCloudy,
  TiWeatherSunny,
  TiWeatherShower,
  TiWeatherSnow,
} from "react-icons/ti";
import TempInput from "../weather/tempInput";
import moment from "moment";

function IconSlider({ data }) {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    if (data[0].cloudcover) {
      let icon;
      const iconArray = data.map((item) => {
        switch (item.icon) {
          case "partly-cloudy-day":
            icon = <TiWeatherPartlySunny style={iconStyle} />;
            break;
          case "clear-day":
            icon = <TiWeatherSunny style={iconStyle} />;
            break;
          case "cloudy":
            icon = <TiWeatherCloudy style={iconStyle} />;
            break;
          case "rain":
            icon = <TiWeatherShower style={iconStyle} />;
            break;
          case "snow":
            icon = <TiWeatherSnow style={iconStyle} />;
            break;
          default:
            icon = <p>Cloudy with a chance of ERRORS</p>;
        }
        return (
          <div style={weatherEntry}>
            <p style={pStyle}>
              {moment(item.datetime).format("ddd Do MMM YYYY")}
            </p>
            {icon}
            <TempInput avg={item.temp} max={item.tempmax} min={item.tempmin} />
          </div>
        );
      });
      setDataArray(iconArray);
    } else {
      const bandArray = data.map((item) => {
        return (
          <div style={row}>
            <div style={concertEntry}>
              <p style={pStyle}>{item.performance[0].artist.displayName}</p>
              <p style={venueStyle}>{item.venue.displayName}</p>
            </div>
            <a href={item.uri} target="_blank" rel="noreferrer">
              <img
                src="/images/sk-badge-pink.png"
                alt="Sonkick Logo"
                style={logoStyle}
              />
            </a>
          </div>
        );
      });
      setDataArray(bandArray);
    }
  }, [data]);

  return (
    <div style={column}>
      {dataArray.map((icon) => {
        return <div key={uniqid()}>{icon}</div>;
      })}
    </div>
  );
}

export default IconSlider;

const iconStyle = {
  height: "50px",
  width: "50px",
  color: "#e2e2e2",
};

const column = {
  display: "flex",
  flexDirection: "column",
};

const row = {
  marginTop: "5px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  borderBottom: "2px solid #243443",
  postion: "relative",
};

const concertEntry = {
  marginBottom: "5px",
  marginRight: "25px",
};

const weatherEntry = {
  margin: "5px 0",
  borderBottom: "2px solid #243443",
};

const pStyle = {
  margin: "0",
  color: "white",
  fontWeight: "600",
};

const venueStyle = {
  margin: "0",
  color: "#bebdc0",
};

const logoStyle = {
  height: "25px",
  width: "25px",
  cursor: "pointer",
  marginTop: "15px",
  position: "absolute",
  right: "0px",
};
