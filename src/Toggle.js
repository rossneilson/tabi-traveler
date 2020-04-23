import React from "react";
import { createUseStyles } from "react-jss";
import Switch from "react-switch";

const useStyles = createUseStyles({
  en: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: 10,
    color: "white",
    paddingRight: 2
  },
  jp: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: 10,
    color: "white",
    paddingRight: 2
  }
});

export default function Toggle(props) {
  const classes = useStyles();
  return (
    <div>
      <Switch
        checked={props.checked}
        onChange={props.changeLanguage}
        height={30}
        width={80}
        offColor="#8698da"
        onColor="#8698da"
        aria-label="language switch"
        uncheckedIcon={<div className={classes.en}>English</div>}
        checkedIcon={<div className={classes.jp}>日本語</div>}
      />
    </div>
  );
}
