import React, { useState } from "react";
import Interactives from "./Interactives";
import styles from '../css/StateOne.module.css';
import InitialDataForm from "./InitialDataForm";
import InitialData from "./InitialData";
import FinishCourse from "./FinishCourse";
const StateTwo = ({ globalData, serverDataGot, setGlobalData, interactives, setInteractives }) => {
  const [finishBtnClicked, setFinishBtnClicked] = useState(false);
  const [initialForm, setInitialForm] = useState(false);

  return (
    <div className={`${finishBtnClicked && styles.hidden}`}>
      {globalData['heading'] && <h1 className={styles.title}>{globalData['heading']}</h1>}

      <div className={styles['buttons-row']}>
      <div><InitialData setInitialForm={setInitialForm} /></div>

      <div><FinishCourse initialForm={initialForm} serverDataGot={serverDataGot} globalData={globalData} interactives={interactives} setFinishBtnClicked={setFinishBtnClicked} /></div>
      </div>

      {initialForm && <InitialDataForm globalData={globalData} setGlobalData={setGlobalData} />}

      <div>
        <Interactives setInteractives={setInteractives} interactives={interactives} globalData={globalData} setGlobalData={setGlobalData} />
      </div>

      {finishBtnClicked && <div>
        <p>{serverDataGot ? 'Изменения сохранены' : 'Проект создан'}</p>
      </div>}
    </div>
  );
};

export default StateTwo;
