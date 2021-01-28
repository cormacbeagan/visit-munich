import React from "react";
import WeatherData from "./weatherData";

function DisplayWeather({ data }) {
  const tempColor = (temp) => {
    if (temp < 0) {
      return "#034a88";
    } else if (temp < 8) {
      return "#0e483b";
    } else if (temp < 14) {
      return "#736705";
    } else if (temp < 22) {
      return "#ad8900";
    } else if (temp < 28) {
      return "#bf6708";
    } else {
      return "#630909";
    }
  };

  let max;
  let min;
  const checkColor = () => {
    if (data.normal) {
      max = data.normal.tempmax[2];
      min = data.normal.tempmin[0];
    } else {
      max = data.tempmax;
      min = data.tempmin;
    }
  };
  checkColor();
  const top = tempColor(max);
  const bottom = tempColor(min);

  const displayDiv = {
    height: "300px",
    width: "300px",
    margin: "10px",
    borderRadius: "20px",
    border: "3px solid #395f78",
    opacity: "0.85",
    background: `linear-gradient(217deg, ${top}, ${bottom})`,
  };

  return (
    <div style={displayDiv}>
      <WeatherData data={data} />
    </div>
  );
}

export default DisplayWeather;
