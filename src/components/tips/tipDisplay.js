import React from "react";
import moment from "moment";
import Thumbnail from "../universal/thumbnail";
import Loading from "../universal/loading";
import BoxWrapper from "../universal/boxWrapper";
import HomeEntry from "../home/homeEntry";

function TipDisplay({ tip, handleEdit }) {
  if (tip) {
    return (
      <div>
        <div style={row}>
          <BoxWrapper>
            <HomeEntry data={{ ...tip, id: 1 }} handleEditMode={handleEdit} />
          </BoxWrapper>
        </div>
        <div style={row}>
          <div style={marg}>
            <p style={lowlight}>
              Latitude: <span style={highlight}>{tip.lat}</span>
            </p>
            <p style={lowlight}>
              Longditude: <span style={highlight}>{tip.lng}</span>
            </p>
            <p style={lowlight}>
              Link: <span style={highlight}>{tip.link}</span>
            </p>
            <p style={lowlight}>
              Link Text: <span style={highlight}>{tip.linkText}</span>
            </p>
          </div>
          <div style={marg}>
            <p style={lowlight}>
              Posted by:{" "}
              <span
                style={highlight}
              >{`${tip.authorFirstName} ${tip.authorLastName}`}</span>
            </p>
            <p style={lowlight}>
              Posted:{" "}
              <span style={highlight}>
                {moment(tip.createdAt.toDate()).calendar()}
              </span>
            </p>
            {tip.updatedAt && (
              <p style={lowlight}>
                Last updated:{" "}
                <span style={highlight}>
                  {moment(tip.updatedAt.toDate()).calendar()}
                </span>
              </p>
            )}
          </div>
        </div>
        <div style={column}>
          <Thumbnail src={tip.image} />
          <div style={imageContainer}>
            {tip.images.map((img) => {
              return (
                <div key={img}>
                  <Thumbnail src={img} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default TipDisplay;

const lowlight = {
  color: "#dfbaaa",
  fontWeight: "600",
};
const highlight = {
  color: "#cecbcb",
};

const imageContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "left",
};

const row = {
  background: "#464646",
  margin: "50px auto",
  padding: "20px",
  maxWidth: "800px",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  boxShadow: "0 30px 50px rgba(0, 0, 0, 0.3)",
  borderRadius: "5px",
};

const marg = {
  margin: "10px",
  maxWidth: "300px",
  overflow: "hidden",
  flexGrow: "1",
};

const column = {
  background: "#464646",
  margin: "50px auto",
  padding: "20px",
  maxWidth: "800px",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "center",
  boxShadow: "0 100px 80px rgba(0, 0, 0, 0.3)",
  borderRadius: "5px",
};
