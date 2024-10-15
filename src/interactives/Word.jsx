import React from "react";
import { useState } from "react";
import styles from "../css/CorrectWordsChoice.module.css";
export default function Word ({updateWord, deleteWord, word, order, error, setError}) {
  const changeHandler = (event) => {
    const {name, value} = event.target;
    updateWord({...word, [name] : value});
   
    if(value.trim() === '') {
      setError('Поле не должно быть пустым');
    } else {
      setError('');
    }
  };

  const handleBlur = (event) => {
    // Валидация на пустоту при потере фокуса
    if (event.target.value.trim() === '') {
      setError('Поле не должно быть пустым');
    }
  };

  return (
    <>
    <div className={styles["word-container"]}>
      <div className={styles['word-field']}>
        <span>{order + 1}.&nbsp;</span>
        <input className={styles.word} name="word_name" value={word['word_name']} type="text" onChange={changeHandler} onBlur={handleBlur}/>
      </div>
      <div className={styles['radio-wrapper']}>
        <input  type="radio" id="no" name={word['word_name']} value="no" checked={word.status === 'no'} onChange={event => updateWord({...word, status : event.target.value})}  />
        <label htmlFor="no">Нет</label>
        <input  type="radio" id="yes" name={word['word_name']} value="yes" checked={word.status === 'yes'} onChange={event => updateWord({...word, status : event.target.value})}/>
        <label htmlFor="yes">Да</label>
        <button className={styles['delete-btn']} onClick={() => deleteWord(word['id'])}>Х</button>
      </div>
    </div>
    {error && <div style={{ color: 'red' }}>{error}</div>}
    </>
  );
};