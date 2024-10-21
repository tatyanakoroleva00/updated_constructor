import React, {useState} from 'react'
import styles from '../css/Buttons.module.css';

const FinishCourse = ({globalData, serverDataGot, setFinishBtnClicked, interactives}) => {



  const finishCourseHandler = () => { //Получаем все данные, полученные от пользователя и отправляем их на сервер
    let finalData = {...globalData, interactives};

    fetch('http://quiz.site/send-videocourse-data-handler', {
      method: 'POST',
      body: JSON.stringify(finalData)
    })
      .then(response => response.text())
      .then(data => {
      setFinishBtnClicked(true);
      window.setTimeout(() => {
        window.location.reload();
      }, 3000)
      })
  }

  return (
    <>
    {!serverDataGot && interactives.length > 0 && <button className={styles['finish-button']} onClick={finishCourseHandler}>Завершить проект</button>}
    {serverDataGot && interactives.length > 0 && <button className={styles['finish-button']} onClick={finishCourseHandler}>Сохранить изменения</button>}
    </>
  )
}

export default FinishCourse