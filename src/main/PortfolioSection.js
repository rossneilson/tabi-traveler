import React from "react";
import { createUseStyles } from "react-jss";
import portfolioImage from "../DSC_0143-3.jpg";

const useStyles = createUseStyles({
  wrap: {
    width: "100%",
    height: "100vh",
    position: "relative",
    backgroundSize: "cover",
    background: "#f5f9fa"
  },
  portfolioSection: {
    width: "100%",
    height: "100%",
    background: "url(" + portfolioImage + ") no-repeat center right fixed",
    backgroundRepeat: "no-repeat",
    float: "right",
    zIndex: "1"
  },
  about: {
    background: "white",
    color: "#5065A3",
    textAlign: "left",
    marginTop: "10%",
    marginLeft: "5%",
    maxWidth: "500px",
    position: "absolute",
    padding: "20px"
  }
});

export default function PortfolioSection(props) {
  const classes = useStyles();
  return (
    <div className={classes.wrap}>
      <div className={classes.portfolioSection} />
      <div className={classes.about}>
        <p style={{ fontSize: "200%" }}>About us</p>
        <div style={{ borderTop: "1px solid #5065A3", width: "100px" }} />
        <p>
          We are a young couple from Scotland and Japan and due to being so far
          apart we need to travel, a lot
        </p>
        <p>
          ... and we have fallen in love with it. We both had a passion for
          photography beforehand
        </p>
        <p>
          But now being able to travel and has allowed us to explore new places
          and culture's through our photography
        </p>
        <p>And this is something that we would love to share with everyone</p>
      </div>
    </div>
  );
}
