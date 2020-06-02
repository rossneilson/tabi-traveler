import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

import frame from "../frame.png";
import mainImage from "../mainImage.jpg";

export default function FrontSection(props) {
  const [offset, setOffset] = useState(0);

  const listener = (e) => {
    if (!(window.pageYOffset > 900)) {
      setOffset(window.pageYOffset);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  const useStyles = createUseStyles({
    mainSection: {
      width: "auto",
      background: "url(" + frame + ") bottom right",
      backgroundRepeat: "no-repeat",
      textAlign: "right",
      minHeight: "100vh",
      height: "auto",
      webkitBackgroundSize: "cover",
      mozBackgroundSize: "cover",
      oBackgroundSize: "cover",
      backgroundSize: "cover",
      position: "relative",
      zIndex: 999,
    },
    content: {
      width: "100%",
      background: "url(" + mainImage + ") bottom right",
      backgroundRepeat: "no-repeat",
      textAlign: "right",
      minHeight: "100vh",
      height: "auto",
      webkitBackgroundSize: "cover",
      mozBackgroundSize: "cover",
      oBackgroundSize: "cover",
      backgroundSize: "cover",
      position: "relative",
      zIndex: 1,
    },
    navigation: {
      width: "19%",
      display: "flex",
      flexDirection: "column",
      alignItems: "right",
      justifyContent: "center",
    },
    title: {
      marginTop: "60px",
      color: "#8698da",
    },
    names: {
      color: "#8698da",
    },
    desc: {
      color: "#8698da",
      marginBottom: "50px",
    },
    pageButton: {
      marginTop: "10px",
      padding: "15px",
      marginBottom: "20px",
      color: "#acb8e4",
      fontSize: "120%",
      textAlign: "right",
      transition: "1s",
      "&:hover": {
        color: "#5065A3",
      },
    },
  });
  const classes = useStyles();

  return (
    <div>
      <div
        className={classes.content}
        style={{ backgroundPositionY: offset / 1.6 }}
      >
        <div className={classes.mainSection}>
          <div className={classes.navigation}>
            <h1 className={classes.title}>{props.language("main.title")}</h1>
            <h3 className={classes.desc}>
              {props.language("main.names")}
              <br />
              {props.language("main.desc")}
            </h3>
            <Link to="/portfolio" className={classes.pageButton}>
              {props.language("main.portfolio")}
            </Link>
            <Link to="/blog" className={classes.pageButton}>
              {props.language("main.blog")}
            </Link>
            <Link to="/prints" className={classes.pageButton}>
              {props.language("main.prints")}
            </Link>
            <Link to="/contact" className={classes.pageButton}>
              {props.language("main.contact")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
