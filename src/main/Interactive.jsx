import React, {useState} from 'react';
import Testing from '../interactives/Testing';
import CorrectWordsChoice from '../interactives/CorrectWordsChoice';
import ExternalSourceLink from '../interactives/ExternalSourceLink';

const Interactive = ({ updateInteractive, deleteInteractive, interactive, videoDuration }) => {
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
              updateInteractive({...interactive, time_code: event.target.value});
            }
    };
    };
    return (
        <div>
            <div>Interactive {interactive.id}</div>
            <button onClick = {() => deleteInteractive(interactive.id)}>Delete Interactive</button>
            <section>
                <select name="interactive_type" value={interactive['interactive_type']} onChange={event => updateInteractive({...interactive, interactive_type: event.target.value})}>
                    <option hidden value="Выберите из списка"> Выберите из списка...</option>
                    <option value="testing">Тестирование</option>
                    <option value="correctWordsChoice">Выбор правильных слов</option>
                    <option value="externalSourceLink">Ссылка на внешний источник</option>
                </select>
            </section>
            <section>
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
            </section>
            <section>

            {!timeError && interactive['interactive_type'] === 'testing' && <Testing />}
          {!timeError && interactive['interactive_type'] === 'correctWordsChoice' && 
            <CorrectWordsChoice />}
          {!timeError && interactive['interactive_type'] === 'externalSourceLink' && 
            <ExternalSourceLink interactive={interactive} updateInteractive={updateInteractive}/>}
            </section>
        </div>
    )
}

export default Interactive