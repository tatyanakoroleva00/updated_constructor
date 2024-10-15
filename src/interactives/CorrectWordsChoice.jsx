import React from "react";
import { useState, useEffect } from "react";
import styles from '../css/CorrectWordsChoice.module.css';
import Word from "./Word";

export default function CorrectWordsChoice({ receivedInfo, updateInteractive, interactive }) {
  const [task, setTask] = useState({ task: receivedInfo.task });
  const [currentWord, setCurrentWord] = useState(null);
  const [words, setWords] = useState(receivedInfo.words ?? []);
  const [error, setError] = useState('');

  const changeHandler = (event) => { //Меняем инфу в инпуте
    const { name, value } = event.target;
    setTask((prev) => ({ ...prev, [name]: value }));
    updateInteractive({ ...interactive, receivedInfo: { ...task, wordsArr: words } });
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
    const index = words.findIndex(item => item.id === newObject.id);

    let newWords = null;
    if (index !== -1) {
      // Если объект с таким id существует, заменяем его
      newWords = words.map((item, idx) => idx === index ? newObject : item);
    } else {
      // Если объект с таким id не найден, добавляем новый
      newWords = [...words, newObject];
    }

    setCurrentWord(newObject);
    setWords(newWords);

    updateInteractive({ ...interactive, receivedInfo: { ...task, words: newWords } });

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
          value={task.task}
        ></textarea>
      </section>


      <section className={styles["words-wrapper"]}>

        {words.length > 0 && (<div className={styles['table-names-block']}>
          <div>Слова: </div>
          <div>Правильность слова: </div>
        </div>)}
        <div className={styles["words-field"]}>

          {words.map((word, index) =>
            <Word key={word.id} order={index} word={word} updateWord={updateWord} deleteWord={deleteWord} error={error} setError={setError} />
          )}
          {!error && <div className={styles.buttons}>
            <button className={styles["add-button"]} onClick={addNewWord}>Добавить слово</button>
          </div>}

        </div>
      </section>

    </div>
  );
};
