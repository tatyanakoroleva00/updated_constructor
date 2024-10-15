import React, { useState } from 'react';
import Testing from '../interactives/Testing';
import CorrectWordsChoice from '../interactives/CorrectWordsChoice';
import ExternalSourceLink from '../interactives/ExternalSourceLink';
import styles from "../css/Interactive.module.css";

const Interactive = ({ updateInteractive, deleteInteractive, interactive,  videoDuration, currentInteractive, error, setError}) => {
  const [timeError, setTimeError] = useState(false);

  const changeHandler = (event) => {
    if (event.target.name === 'time_code') {
      let timeSplitted = event.target.value.split(':');
      let minutes = Math.floor(+timeSplitted[0]);
      let secondsInMinutes = minutes * 60;
      let seconds = Math.floor(+timeSplitted[1]);
      let convertedTime = secondsInMinutes + seconds;

      if (convertedTime > videoDuration) {
        setTimeError(true);

      } else {
        setTimeError(false);
        updateInteractive({ ...interactive, time_code: event.target.value });
      }
    };
  };


  return (
    <div className={`${currentInteractive !== interactive && styles['invisible']}`}>
      <div><b>Интерактив: {interactive['interactive_name']}</b></div>
      <section>
        <div className={styles.block}>
        <label>Тип интерактива: &nbsp;</label>
          <select name="interactive_type"  value={interactive['interactive_type']} onChange={event => updateInteractive({ ...interactive, interactive_type: event.target.value })}>
            <option hidden value="Выберите из списка"> Выберите из списка...</option>
            <option value="testing">Тестирование</option>
            <option value="correctWordsChoice">Выбор правильных слов</option>
            <option value="externalSourceLink">Ссылка на внешний источник</option>
          </select>
          </div>
          <div className={styles.block}>
          <label>TimeCode:&nbsp;</label>
          <input
            type="text"
            name="time_code"
            onChange={changeHandler}
            value={interactive['time_code']}
            placeholder='00:05'
            required
            maxLength={5}
          />
        </div>
      </section>
      <section>

        {!timeError && interactive['interactive_type'] === 'testing' && <Testing receivedInfo={interactive['receivedInfo']} interactive={interactive} updateInteractive={updateInteractive}/>}
        {!timeError && interactive['interactive_type'] === 'correctWordsChoice' &&
          <CorrectWordsChoice receivedInfo={interactive['receivedInfo']} interactive={interactive} updateInteractive={updateInteractive}/>}
        {!timeError && interactive['interactive_type'] === 'externalSourceLink' &&
          <ExternalSourceLink receivedInfo={interactive['receivedInfo']} interactive={interactive} updateInteractive={updateInteractive} />}
      </section>
      <button className={styles['delete-button']} onClick={() => deleteInteractive(interactive.id)}>Удалить интерактив</button>
    </div>
  )
}

export default Interactive