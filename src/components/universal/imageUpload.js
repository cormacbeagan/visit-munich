import React, { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { connect } from "react-redux";
import { uploadImage } from "../../store/actions/projectActions";
import { uploadTipImage } from "../../store/actions/tipActions";
import { FaFileImport } from "react-icons/fa";
import Button from "./button";

const compressOptions = {
  maxSizeMB: 1.5,
  maxWidthOrHeight: 2120,
  useWebWorker: true,
};

function ImageUpload(props) {
  const { uploadImage, id, usage, uploadTipImage } = props;
  const [imageName, setImageName] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const input = useRef();

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const compImage = await imageCompression(imageFile, compressOptions);
    if (usage === "wall") {
      uploadImage(compImage, id);
    } else if (usage === "tip") {
      uploadTipImage(compImage, id);
    }
    input.current.value = null;
    setImageName(null);
    setImageFile(null);
  };

  const handleImageFileSelect = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageName(e.target.files[0].name);
    }
  };

  return (
    <div style={divStyle}>
      <h4 style={heading}>Upload Image: </h4>
      <form onSubmit={handleImageUpload}>
        <div style={fileDiv}>
          <div style={uploadDiv}>
            <label htmlFor="file" style={uploadLogo}>
              <input
                style={noDisp}
                ref={input}
                onChange={handleImageFileSelect}
                type="file"
                accept="image/*,.pdf"
                id="file"
              />
              <FaFileImport size={32} onClick={() => setImageName(null)} />
            </label>
          </div>
          {imageFile && <p style={highlight}>{imageName}</p>}
        </div>
        <div className="input-field">
          {imageFile && <Button children={"Upload Image"} />}
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (image, id) => dispatch(uploadImage(image, id)),
    uploadTipImage: (image, id) => dispatch(uploadTipImage(image, id)),
  };
};

export default connect(null, mapDispatchToProps)(ImageUpload);

const divStyle = {
  marginBottom: "20px",
};

const heading = {
  margin: "10px 0px",
};

const highlight = {
  color: "#d65f3d",
};

const fileDiv = {
  maxHeight: "75px",
};

const uploadDiv = {
  display: "inline",
  margin: "0px 10px",
};

const uploadLogo = {
  cursor: "pointer",
  color: "#616161",
};

const noDisp = {
  display: "none",
};
