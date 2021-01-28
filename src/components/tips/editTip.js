import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, useHistory } from "react-router-dom";
import { FaTrashAlt, FaArrowAltCircleUp } from "react-icons/fa";
import Button from "../universal/button";
import Thumbnail from "../universal/thumbnail";
import Input from "../universal/input";
import {
  updateTip,
  deleteTipImage,
  deleteTip,
} from "../../store/actions/tipActions";
import TipDisplay from "./tipDisplay";
import ImageUpload from "../universal/imageUpload";
import Loading from "../universal/loading";
import TextArea from "../universal/textArea";

let idToPass;

function EditTip(props) {
  const { tip, auth, updateTip, deleteTipImage, deleteTip } = props;
  const history = useHistory();
  let { id } = useParams();
  idToPass = id;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(tip);
  const [editImage, setEditImage] = useState("");

  useEffect(() => {
    if (tip) {
      setFormData(tip);
    }
  }, [tip]);

  if (!auth.uid) return <Redirect to="/signin" />;

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setEditImage(tip.image);
  };

  const handleEditThmbnail = (url) => {
    if (!isEditing) return;
    setEditImage(url);
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleReady = (e) => {
    const obj = {};

    for (let key in formData) {
      if (formData[key] === "") {
        obj[key] = tip[key];
      }
    }
    setFormData((prev) => ({ ...prev, ...obj }));
    uploadUpdate({ ...formData, ...obj });
  };

  const uploadUpdate = (obj) => {
    updateTip(obj, id);
    setIsEditing(!isEditing);
  };

  const handleImageDelete = (url) => {
    const doubelCheck = window.confirm(
      "Are you sure you want to delete the image?"
    );
    if (doubelCheck) {
      deleteTipImage(url, id);
    }
  };

  const handleCancel = () => {
    setFormData(tip);
    setIsEditing(!isEditing);
  };

  const handleDeleteTip = () => {
    if (tip.images[0]) {
      alert("Delete images first.");
      return;
    }
    const doubleCheck = window.confirm(
      "Do you really want to delete the whole document?"
    );
    if (doubleCheck) {
      deleteTip(id);
      history.push("/tips");
    }
  };

  if (tip) {
    return (
      <div className="container" style={detailsDiv}>
        <div style={rightBut}>
          {!isEditing && <Button onClick={handleEdit} children={"Edit"} />}
          <Button
            onClick={() => history.push(`/tips/${idToPass}`)}
            children={"Back to Map"}
          />
          {isEditing && (
            <Button onClick={handleDeleteTip} children={"delete wall"} />
          )}
        </div>
        {isEditing ? (
          <div>
            <div style={row}>
              <Input
                type={"text"}
                id={"name"}
                name={"Name"}
                onChange={handleChange}
                value={formData.name}
                required={true}
              />
              <Input
                type={"text"}
                id={"subtitle"}
                name={"Subtitle"}
                onChange={handleChange}
                value={formData.subtitle}
                required={true}
              />
            </div>
            <div style={row}>
              <TextArea
                type={"textarea"}
                id={"textInput"}
                name={"Tip"}
                onChange={handleChange}
                value={formData.textInput}
                required={true}
              />
            </div>
            <div style={row}>
              <Input
                type={"text"}
                id={"link"}
                name={"Link"}
                onChange={handleChange}
                value={formData.link}
              />
              <Input
                type={"text"}
                id={"linkText"}
                name={"Link text"}
                onChange={handleChange}
                value={formData.linkText}
              />
            </div>
            <div style={row}>
              <Input
                type={"text"}
                id={"lat"}
                name={"Latitude"}
                onChange={handleChange}
                value={formData.lat}
                required={true}
              />
              <Input
                type={"text"}
                id={"lng"}
                name={"Longditude"}
                onChange={handleChange}
                value={formData.lng}
                required={true}
              />
            </div>
            <div style={column}>
              <Thumbnail src={editImage} />
              <div style={imageContainer}>
                {tip.images.map((img) => {
                  return (
                    <div
                      key={img}
                      style={{ position: "relative", zIndex: "1" }}
                    >
                      <Thumbnail src={img} />
                      <div style={{ position: "absolute", top: "20px" }}>
                        <button
                          onClick={() => handleEditThmbnail(img)}
                          style={imageBtn}
                        >
                          <FaArrowAltCircleUp size={24} />
                        </button>
                        <button
                          onClick={() => handleImageDelete(img)}
                          style={imageBtn}
                        >
                          <FaTrashAlt size={24} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <TipDisplay tip={formData} handleEdit={handleEdit} />
        )}
        <div style={editContainer}>
          <div>
            {isEditing ? (
              <div style={centerDiv}>
                <Button onClick={handleReady} children={"Save"} />
                <Button children={"cancel"} onClick={handleCancel} />
              </div>
            ) : (
              <div className="" style={centerDiv}>
                <Button onClick={handleEdit} children={"Edit"} />
              </div>
            )}
            <Button
              onClick={() => history.push(`/tips/${idToPass}`)}
              children={"Back to Map"}
            />
          </div>
          {isEditing && <ImageUpload id={id} usage={"tip"} />}
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

const mapStateToProps = (state) => {
  const tips = state.firestore.data.tips;
  const tip = tips ? tips[idToPass] : null;
  return {
    tip: tip,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTip: (tip, id) => dispatch(updateTip(tip, id)),
    deleteTipImage: (image, id) => dispatch(deleteTipImage(image, id)),
    deleteTip: (id) => dispatch(deleteTip(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "tips" }])
)(EditTip);

const detailsDiv = {
  margin: "50px auto",
  marginTop: "120px",
  width: "88%",
  maxWidth: "1000px",
  padding: window.innerWidth / 16 + "px",
  backgroundColor: "#333333",
  color: "#f3f3f3",
  boxShadow: "0 100px 80px rgba(0, 0, 0, 0.3)",
};

const rightBut = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginBottom: "10px",
};

const imageContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "left",
};

const editContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
};

const centerDiv = {
  textAlign: "center",
};

const imageBtn = {
  marginLeft: "10px",
  display: "block",
  color: "white",
};

const row = {
  background: "#464646",
  margin: "50px auto",
  padding: "20px",
  maxWidth: "650px",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  boxShadow: "0 30px 50px rgba(0, 0, 0, 0.3)",
  borderRadius: "5px",
};

const column = {
  background: "#464646",
  margin: "50px auto",
  padding: "20px",
  maxWidth: "650px",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "center",
  boxShadow: "0 100px 80px rgba(0, 0, 0, 0.3)",
  borderRadius: "5px",
};
