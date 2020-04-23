import React from "react";
import { createUseStyles } from "react-jss";
// import footerImage from "../contactMountain.png";

const useStyles = createUseStyles({
  wrap: {
    width: "100%",
    height: "100vh",
    position: "relative",
    backgroundSize: "cover",
    background: "#f5f9fa",
    display: "flex",
    justifyContent: "center"
  },
  // aboutImage: {
  //   width: "100%",
  //   height: "100%",
  //   background: "url(" + footerImage + ") no-repeat center center fixed",
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "cover",
  //   zIndex: "1",
  //   maxWidth: "1000px",
  //   float: "center"
  // },
  about: {
    background: "white",
    color: "#5065A3",
    textAlign: "left",
    maxWidth: "500px",
    position: "absolute",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    zIndex: "3",
    margin: "50px",
    alignItems: "center"
  }
});

export default function ContactFooter(props) {
  const classes = useStyles();
  return (
    <div className={classes.wrap}>
      {/* <div className={classes.aboutImage} /> */}
      <div className={classes.about}>
        <p style={{ fontSize: "200%" }}>Contact</p>
        <div style={{ borderTop: "1px solid #5065A3", width: "100px" }} />
        <p>
          We are a young couple from Scotland and Japan and due to being so far
          apart we need to travel, a lot
        </p>
      </div>
    </div>
  );
}
