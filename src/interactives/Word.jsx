import React from "react";
import { useState } from "react";
import styles from "../css/CorrectWordsChoice.module.css";
export default function Word ({updateWord, deleteWord, word, order}) {

  return (
    <div className={styles["word-container"]}>
      <div className={styles['word-field']}>
        <span>{order + 1}.&nbsp;</span>
        <input className={styles.word} name="word_name" value={word['word_name']} type="text" onChange={event => updateWord({...word, word_name : event.target.value})}/>
      </div>
      <div className={styles['radio-wrapper']}>
        <input  type="radio" id="no" name={word['word_name']} value="no" checked={word.status === 'no'} onChange={event => updateWord({...word, status : event.target.value})}  />
        <label htmlFor="no">Нет</label>
        <input  type="radio" id="yes" name={word['word_name']} value="yes" checked={word.status === 'yes'} onChange={event => updateWord({...word, status : event.target.value})}/>
        <label htmlFor="yes">Да</label>
        <button className={styles['delete-btn']} onClick={() => deleteWord(word['id'])}>Х</button>
      </div>
    </div>
  );
};