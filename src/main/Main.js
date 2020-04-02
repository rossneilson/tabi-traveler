import React from "react";
import { createUseStyles } from "react-jss";
import FrontSection from "./FrontSection";
import PortfolioSection from "./PortfolioSection";
import PageLinks from "./PageLinks";
// import ContactFooter from "./ContactFooter";

const useStyles = createUseStyles({});

function Main(props) {
  const classes = useStyles();

  return (
    <div>
      <FrontSection />
      <PortfolioSection />
      <PageLinks />
    </div>
  );
}

export default Main;
