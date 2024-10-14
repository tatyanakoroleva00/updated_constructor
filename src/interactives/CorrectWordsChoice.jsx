import React from "react";
import { useState, useEffect } from "react";
import styles from '../css/CorrectWordsChoice.module.css';
import Word from "./Word";

export default function CorrectWordsChoice({ receivedInfo, updateInteractive, interactive }) {
  const [data, setData] = useState({ task: receivedInfo.task, words: receivedInfo.words });
  const [words, setWords] = useState([]);

  console.log(words, 'words');

  // useEffect(() => {
  //   getData(data);
  // }, [data])

  // useEffect(() => {
  //   if(serverDataGot && serverData['interactives'][interactiveIndex]) {
  //     let serverDataReceived = serverData['interactives'][interactiveIndex]['data']['receivedInfo'];
  //   setData(serverDataReceived);

  //   let elemArr = [];
  //     for (let key in serverDataReceived) {
  //       if(key.includes('word')) {
  //         elemArr.push(key);
  //       }
  //     }
  //     setWordsArr(elemArr);

  // }}, [])

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

  const deleteWordHandler = () => {
    // let lastWordKey = words.length; //Удаляем последний введенный вопрос с ответами из массива данных
    // let lastWord = 'word' + lastWordKey;
    // delete data[lastWord];
    words.pop();
    setWords(words);

    // setWords(words.slice(0, -1));
  }

  // const wordsDataHandler = (order, wordLine) => {
  //   let word = `word${order}`;
  //   setData(prev => ({ ...prev, [word]: wordLine }));
  // };

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
            <Word key={word.id} index={index} />
          )}
          <div className={styles.buttons}>
            <button className={styles["add-button"]} onClick={addNewWord}>Добавить слово</button>
            {words.length > 0 && <button className={styles["remove-button"]} onClick={deleteWordHandler}>Удалить слово</button>}
          </div>

        </div>
      </section>

    </div>
  );
};
