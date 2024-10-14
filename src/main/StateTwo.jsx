import React, { useState } from "react";
import Interactives from "./Interactives";
import styles from '../css/StateOne.module.css';
import InitialDataForm from "./InitialDataForm";
import FinishCourse from "./FinishCourse";
import Modal from '../modal_windows/Modal';

const StateTwo = ({ globalData, serverDataGot, setGlobalData, interactives, setInteractives }) => {
  const [finishBtnClicked, setFinishBtnClicked] = useState(false);
  const [initialForm, setInitialForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const confirmModal = () => {
    window.location.reload();
  };

  return (
    <div className={`${finishBtnClicked && styles.hidden}`}>
      {/* Заголовок проекта */}
      {globalData['heading'] && <h1 className={styles.title}>{globalData['heading']}</h1>}
      
      {/* Переход к списку проектов + модальное окно */}
      {initialForm && <div>
        <button onClick={() => setIsModalOpen(true)} >К списку проектов</button>
        <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmModal} header="Переход к списку проектов" message="Несохраненные данные могут быть потеряны. Вы готовы перейти?" answer1="Да" answer2="Нет, остаться" />
      </div>}

      {/* Кнопки "назад - вперед" и "завершить проект / сохранить изменения" */}
      <div className={styles['buttons-row']}>
      <button onClick={() => setInitialForm(!initialForm)}>{initialForm ? 'Вперед' : 'Назад'}</button>
      {!initialForm && <FinishCourse serverDataGot={serverDataGot} globalData={globalData} interactives={interactives} setFinishBtnClicked={setFinishBtnClicked} />
      } </div>

      {/* Первоначальная форма */}
      {initialForm && <InitialDataForm globalData={globalData} setGlobalData={setGlobalData} />}

      {/* Интерактивы */}
      {!initialForm && <div>
        <Interactives setInteractives={setInteractives} interactives={interactives} globalData={globalData} setGlobalData={setGlobalData} />
      </div>}

      {/* После завершения проекта - сообщение */}
      {finishBtnClicked && <div>
        <p>{serverDataGot ? 'Изменения сохранены' : 'Проект создан'}</p>
      </div>}
    </div>
  );
};

export default StateTwo;
