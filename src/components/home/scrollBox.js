import React from "react";
import { Link } from "react-router-dom";
import ColumnSlider from "../universal/columnSlider";
import IconSlider from "./iconSlider";
import { FiArrowUpRight } from "react-icons/fi";

function ScrollBox({ data }) {
  return (
    <div style={displayDiv}>
      <div style={row}>
        <Link style={link} to={data[0].cloudcover ? "/weather" : "/live"}>
          {data[0].cloudcover ? "Weather" : "Concerts"}
          <FiArrowUpRight />
        </Link>
      </div>
      <ColumnSlider>
        <IconSlider data={data} />
      </ColumnSlider>
    </div>
  );
}

export default ScrollBox;

const displayDiv = {
  position: "relative",
  height: "295px",
  width: "260px",
  margin: "10px",
  backgroundColor: "#51738aeb",
  borderRadius: "20px",
  border: "3px solid #395f78",
  boxShadow: "0 0 40px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  padding: "0px 20px 5px 20px",
  overflow: "hidden",
};

const row = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
};

const link = {
  color: "white",
  textDecoration: "none",
  fontSize: "24px",
  margin: "4px",
};
