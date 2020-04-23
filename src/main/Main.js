import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";

import FrontSection from "./FrontSection";
import AboutSection from "./AboutSection";
import PageLinks from "./PageLinks";
import Toggle from "../Toggle";

const useStyles = createUseStyles({
  toggleWrap: {
    position: "fixed",
    zIndex: 99999,
    margin: "15px"
  }
});

function Main(props) {
  const classes = useStyles();

  const { t, i18n } = useTranslation();

  const checkLanguage = () => {
    if (i18n.language === "jp") {
      return true;
    } else if (i18n.language === "en") {
      return false;
    }
  };

  const [checked, setChecked] = useState(checkLanguage());

  const changeLanguage = () => {
    setChecked(!checked);
    if (checked) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("jp");
    }
  };

  useEffect(() => {
    document.title = t("title.tab");
  });

  return (
    <div>
      <div className={classes.toggleWrap}>
        <Toggle changeLanguage={changeLanguage} checked={checked} />
      </div>

      <FrontSection language={t} />
      <AboutSection language={t} />
      <PageLinks language={t} />
    </div>
  );
}

export default Main;
