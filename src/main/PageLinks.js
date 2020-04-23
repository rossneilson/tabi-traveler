import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import image1 from "../1.jpg";
import image2 from "../2.jpg";
import image3 from "../3.jpg";

const useStyles = createUseStyles({
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative"
  },
  card: {
    backgroundColor: "black",
    fontSize: "200%",
    width: "100%",
    height: "500px",
    minWidth: "350px",
    flexGrow: 2,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "500px",
    opacity: 0.7,
    transition: "1s",
    "&:hover": {
      opacity: 1,
      transform: "scaleY(1.01)"
    }
  },
  content: {
    opacity: 1,
    position: "absolute"
  }
});

export default function PageLinks(props) {
  const classes = useStyles();
  return (
    <div className={classes.flexContainer}>
      <Link style={{ width: "33.333333%" }} to="/portfolio">
        <div className={classes.card}>
          <div
            className={classes.image}
            style={{
              background: "url(" + image1 + ") no-repeat Top right",
              backgroundSize: "cover"
            }}
          />
          <p className={classes.content}>{props.language("main.portfolio")}</p>
        </div>
      </Link>
      <Link style={{ width: "33.333333%" }} to="/blog">
        <div className={classes.card}>
          <div
            className={classes.image}
            style={{
              background: "url(" + image2 + ") no-repeat Bottom right",
              backgroundSize: "cover"
            }}
          />
          <p className={classes.content}>{props.language("main.blog")}</p>
        </div>
      </Link>
      <Link style={{ width: "33.333333%" }} to="/prints">
        <div className={classes.card}>
          <div
            className={classes.image}
            style={{
              background: "url(" + image3 + ") no-repeat top right",
              backgroundSize: "cover"
            }}
          />
          <p className={classes.content}>{props.language("main.prints")}</p>
        </div>
      </Link>
    </div>
  );
}
