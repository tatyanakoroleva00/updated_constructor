import React, {useState, useEffect} from 'react';
import styles from '../css/Testing.module.css'

const Answer = ({ answer, order, updateAnswer, deleteAnswer}) => {
    // const [answerName, setAnswerName] = useState('');
    // const [error, setError] = useState(false);
    // const [errorMsg, setErrorMsg] = ['Пустое поле'];

    // useEffect(() => {
    //     if(answerName === '') {
    //         addErrorIds([answer.id]);
    //     }
    // }, [answerName])

    const changeHandler = (event) => {
        const {name, value, checked} = event.target;

        if(name === 'status') {
            updateAnswer({...answer, [name] : checked});
        }
        else {
            updateAnswer({...answer, [name] : value});
            // setAnswerName(value);
            // (value.trim() === '') ? getErrors({'id' : answer.id, 'error' : true}) : getErrors({'id' : answer.id, 'error' : false});
        }
    };

    return (
        <>
        <div className={styles["answers-wrapper"]}>
            <div className={styles['answer-wrapper']}>
                <span>{order + 1}</span>
                <input className={styles['answer-field']} value={answer.name} name="name" type="text" onChange={(event) => changeHandler(event)} />
                <input type='checkbox' name='status' checked={answer.status === true} onChange={(event) => changeHandler(event)}/>
                
                <button onClick={() => deleteAnswer(answer.id)}>X</button>
            </div>
            
        </div>
        {/* {answerName === '' && <div style={{ color: 'red' }}>{errorMsg}</div>} */}
        </>
    )
}

export default Answer