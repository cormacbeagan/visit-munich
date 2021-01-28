import React, { useEffect, useRef } from "react";
import "../../styles/button.css";

function Switch(props) {
  const { onClick, switched } = props;
  const checkBox = useRef();
  useEffect(() => {
    if (switched) {
      checkBox.current.checked = switched;
    }
  }, []);

  const handleChange = (e) => {
    onClick(e.target.checked);
  };

  return (
    <label className="switch">
      <input type="checkbox" onChange={handleChange} ref={checkBox} />
      <span className="slider round"></span>
    </label>
  );
}

export default Switch;
