import React from "react";
import moment from "moment";
import HomeEntry from "./homeEntry";
import BoxWrapper from "../universal/boxWrapper";
import Loading from "../universal/loading";

function BlogDisplay({ blog, handleEdit }) {
  if (blog) {
    return (
      <div>
        <div style={row}>
          <BoxWrapper>
            <HomeEntry data={{ ...blog, id: 1 }} handleEditMode={handleEdit} />
          </BoxWrapper>
        </div>
        <div style={row}>
          <div style={marg}>
            <p style={lowlight}>
              Link URL: <span style={highlight}>{blog.link}</span>
            </p>
            <p style={lowlight}>
              Link Text: <span style={highlight}>{blog.linkText}</span>
            </p>
            <p style={lowlight}>
              Position: <span style={highlight}>{Number(blog.rank) + 1}</span>
            </p>
          </div>
          <div style={marg}>
            <p style={lowlight}>
              Posted by:{" "}
              <span
                style={highlight}
              >{`${blog.authorFirstName} ${blog.authorLastName}`}</span>
            </p>
            <p style={lowlight}>
              Posted:{" "}
              <span style={highlight}>
                {moment(blog.createdAt.toDate()).calendar()}
              </span>
            </p>
            {blog.updatedAt && (
              <p style={lowlight}>
                Last updated:{" "}
                <span style={highlight}>
                  {moment(blog.updatedAt.toDate()).calendar()}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default BlogDisplay;

const lowlight = {
  color: "#dfbaaa",
  fontWeight: "600",
};
const highlight = {
  color: "#cecbcb",
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
