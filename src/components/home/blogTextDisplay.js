import React from "react";

function BlogTextDisplay({ data }) {
  return (
    <div style={{ marginLeft: "-5px" }}>
      <p style={label}>{data.textInput}</p>
    </div>
  );
}

export default BlogTextDisplay;

const label = {
  margin: "0",
  color: "white",
};
