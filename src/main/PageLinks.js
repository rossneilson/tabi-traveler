import React from "react";
import { createUseStyles } from "react-jss";
import portfolioImage from "../DSC_0143-3.jpg";

const useStyles = createUseStyles({
  flexContainer: {
    backgroundColor: "#76aed7",
    zIndex: "998",
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    padding: "13px"
  },
  card: {
    zIndex: "998",
    width: "400px",
    height: "25%",
    margin: "1% 1% 5% 1%",
    flexGrow: 2,
    transition:
      "transform .6s ease,filter .6s ease,-webkit-transform .6s ease,-webkit-filter .6s ease",
    transitionDelay: "var(--wait,0)",
    willChange: "transform",
    backgroundColor: "#ffffffd2"
  }
});

export default function PageLinks(props) {
  const classes = useStyles();
  return (
    <div className={classes.flexContainer}>
      <div className={classes.card}>Test</div>
      <div className={classes.card}>Test2</div>
      <div className={classes.card}>Test3</div>
    </div>
  );
}
