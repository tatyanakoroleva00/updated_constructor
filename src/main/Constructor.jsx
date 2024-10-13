import React, { useState } from "react";
import styles from "../css/Constructor.module.css";
// import StateOne from "./StateOne";
import StateTwo from "./StateTwo";

const Constructor = () => {
  const [switchStates, setSwitchStates] = useState(false);
  return (
    <div className={styles["constructor-wrapper"]}>
      {/* <div className={`${switchStates && styles.invisible}`}>
        <StateOne />
      </div> */}
      <div className={`${switchStates && styles.invisible}`}>
        <StateTwo />
      </div>
    </div>
  );
};

export default Constructor;
