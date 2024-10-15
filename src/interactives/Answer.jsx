import React from 'react';
import styles from '../css/Testing.module.css'

const Answer = ({ answer, order, updateAnswer, deleteAnswer }) => {
    return (
        <div className={styles["answers-wrapper"]}>
            <div className={styles['answer-wrapper']}>
                <span>{order + 1}</span>
                <input className={styles['answer-field']} name="answer" type="text" onChange={event => updateAnswer({...answer, question_name : event.target.value})} />
                <input type='checkbox' value={answer.status} name='status' onChange={event => updateAnswer({...answer, status: event.target.value})} />
                <button onClick={() => deleteAnswer(answer.id)}>X</button>
            </div>
            
        </div>
    )
}

export default Answer