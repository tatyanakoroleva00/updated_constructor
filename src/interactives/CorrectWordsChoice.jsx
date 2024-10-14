import React from "react";
import { useState, useEffect } from "react";
import styles from '../css/CorrectWordsChoice.module.css';
import Word from "./Word";

export default function CorrectWordsChoice({ receivedInfo, updateInteractive, interactive }) {
  const [data, setData] = useState({ task: receivedInfo.task, words: receivedInfo.words });
  const [currentWord, setCurrentWord] = useState(null);
  const [words, setWords] = useState([]);

  const changeHandler = (event) => { //Меняем инфу в инпуте
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
    updateInteractive({ ...interactive, receivedInfo: data });
  };

  const addNewWord = () => {

    const newWord = {
      id: Date.now(),
      word_name: '',
      status: '',
    };

    setWords(prev => [...prev, newWord]);
  };

  const deleteWord = (id) => {
    const newWord = words.filter(i => i.id !== id);
    setWords(() => newWord);
    setCurrentWord(newWord[0] ?? null);    
  };

  const updateWord = (newObject) => {

    setCurrentWord(newObject);
    setWords((prevData) => {
      const index = prevData.findIndex(item => item.id === newObject.id);

      if (index !== -1) {
          // Если объект с таким id существует, заменяем его
          return prevData.map((item, idx) => idx === index ? newObject : item);
      } else {
          // Если объект с таким id не найден, добавляем новый
          return [...prevData, newObject];
      }
  });
  };

  return (
    <div className={styles["correct-words-form"]}>
      <section className={styles["task-wrapper"]}>
        <p>Задание: </p>

        <textarea
          placeholder="Введите задание"
          name="task"
          rows={5}
          onChange={changeHandler}
          value={data.task}
        ></textarea>
      </section>


      <section className={styles["words-wrapper"]}>

      {words.length > 0 && (<div className={styles['table-names-block']}>
          <div>Слова: </div>
          <div>Правильность слова: </div>
        </div>)}
        <div className={styles["words-field"]}>



          {words.map((word, index) =>
            <Word key={word.id} order={index} word={word} updateWord={updateWord} deleteWord={deleteWord}/>
          )}
          <div className={styles.buttons}>
            <button className={styles["add-button"]} onClick={addNewWord}>Добавить слово</button>
          </div>

        </div>
      </section>

    </div>
  );
};
