import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import frame from "../frame.png";
import mainImage from "../mainImage.jpg";

console.log(mainImage);

export default function FrontSection(props) {
  const [offset, setOffset] = useState(0);

  const listener = e => {
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
      minHeight: "119.5vh",
      height: "auto",
      webkitBackgroundSize: "cover",
      mozBackgroundSize: "cover",
      oBackgroundSize: "cover",
      backgroundSize: "cover",
      position: "relative",
      zIndex: 999
    },
    content: {
      width: "100%",
      background: "url(" + mainImage + ") bottom right",
      backgroundRepeat: "no-repeat",
      textAlign: "right",
      minHeight: "119.5vh",
      height: "auto",
      webkitBackgroundSize: "cover",
      mozBackgroundSize: "cover",
      oBackgroundSize: "cover",
      backgroundSize: "cover",
      position: "relative",
      zIndex: 1
    },
    navigation: {
      width: "19%",
      display: "flex",
      flexDirection: "column",
      alignItems: "right",
      justifyContent: "center"
    },
    title: {
      marginTop: "60px",
      color: "#8698da"
    },
    names: {
      color: "#8698da"
    },
    desc: {
      color: "#8698da",
      marginBottom: "50px"
    },
    pageButton: {
      marginTop: "10px",
      padding: "15px",
      marginBottom: "20px",
      color: "#acb8e4",
      fontSize: "120%",
      textAlign: "right",
      "&:hover": {
        color: "#5065A3"
      }
    }
  });
  const classes = useStyles();

  return (
    <div>
      <div
        // src={mainImage}
        className={classes.content}
        style={{ backgroundPositionY: offset / 1.6 }}
      >
        <div className={classes.mainSection}>
          <div className={classes.navigation}>
            <h1 className={classes.title}>Tabi Traveler</h1>
            <h3 className={classes.desc}>
              Ross & Kona
              <br />
              Travel Photographers
            </h3>
            <a href="" className={classes.pageButton}>
              About
            </a>
            <a href="" className={classes.pageButton}>
              Portfolio
            </a>
            <a href="" className={classes.pageButton}>
              Blog
            </a>
            <a href="" className={classes.pageButton}>
              Shop
            </a>
            <a href="" className={classes.pageButton}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
