import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import aboutImage from "../DSC_0143-3.jpg";
// import frame from "../frame2.jpg";

const useStyles = createUseStyles({
  wrap: {
    width: "100%",
    height: "100vh",
    position: "relative",
    background: "#3b3d40",
    // background: "url(" + frame + ") no-repeat center right fixed",
    backgroundSize: "cover"
  },
  aboutImage: {
    width: "70%",
    height: "70%",
    background: "url(" + aboutImage + ") no-repeat top right fixed",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    float: "right",
    zIndex: "1",
    marginTop: "6%"
  },
  about: {
    background: "white",
    color: "#5065A3",
    textAlign: "left",
    marginTop: "10%",
    marginLeft: "5%",
    maxWidth: "500px",
    position: "absolute",
    padding: "20px 40px 40px 40px"
  },
  cta: {
    textAlign: "center",
    padding: "12px",
    background: "#f79a60",
    color: "white",
    marginTop: "120px",
    marginLeft: "35%",
    borderRadius: "5px",
    transition: "0.5s",
    "&:hover": {
      background: "#5065A3"
    }
  }
});

export default function AboutSection(props) {
  const classes = useStyles();
  return (
    <div className={classes.wrap}>
      <div className={classes.aboutImage} />
      <div className={classes.about}>
        <p style={{ fontSize: "200%" }}>{props.language("about.title")}</p>
        <div style={{ borderTop: "1px solid #5065A3", width: "100px" }} />
        <p>{props.language("about.1")}</p>
        <p>{props.language("about.2")}</p>
        <p>{props.language("about.3")}</p>
        <p>{props.language("about.4")}</p>
        <p style={{ marginTop: "30px", marginBottom: "20px" }}>
          {props.language("about.5")}
        </p>
        <Link to="/contact" className={classes.cta}>
          {props.language("about.contact")}
        </Link>
      </div>
    </div>
  );
}
