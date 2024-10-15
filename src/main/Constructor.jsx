import React, { useState } from "react";
import styles from "../css/Constructor.module.css";
import StateOne from "./StateOne";
import StateTwo from "./StateTwo";
import Interactives from "./Interactives";

const Constructor = ({playBtnIsClicked, setPlayBtnIsClicked, setVideoCourseId}) => {
  const [globalData, setGlobalData] = useState({
    'heading': '',
    'url': '',
  });


  const [videoDuration, setVideoDuration] = useState(0); //Временное значение для видео
  const [switchStates, setSwitchStates] = useState(false);
  const [serverDataGot, setServerDataGot] = useState(false);
  const [interactives, setInteractives] = useState([]);

  return (
    <div className={styles["constructor-wrapper"]}>
      <div className={`${switchStates && styles.invisible}`}>
        <StateOne setServerDataGot={setServerDataGot} setInteractives={setInteractives} setVideoCourseId={setVideoCourseId} setPlayBtnIsClicked={setPlayBtnIsClicked} playBtnIsClicked={playBtnIsClicked} setGlobalData={setGlobalData} setSwitchStates={setSwitchStates} />
      </div>
      <div className={`${!switchStates && styles.invisible}`}>
        <StateTwo setInteractives={setInteractives} interactives={interactives} serverDataGot={serverDataGot} videoDuration={videoDuration} setGlobalData={setGlobalData} globalData={globalData}/>
      </div>
    </div>
  );
};

export default Constructor;
