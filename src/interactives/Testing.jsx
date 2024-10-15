import React from "react";
import QuestionCard from "./QuestionCard";
import { useState, useEffect } from "react";
import styles from '../css/Testing.module.css';

export default function Testing({ interactive, updateInteractive, receivedInfo }) {
  const [questions, setQuestions] = useState(receivedInfo.questions ?? []);

  console.log('questions', questions);

  // Добавить новый вопрос
  const addNewQuestion = () => {

    const newQuestion = {
      'id': Date.now(),
      'question_name': '',
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  // Удалить вопрос
  const deleteQuestion = (id) => {
    const newQuestion = questions.filter(i => i.id !== id);
    setQuestions(() => newQuestion);
  };

  // Обновить вопрос
  const updateQuestion = (newObject) => {
    const index = questions.findIndex(item => item.id === newObject.id);
    let newQuestions = null;

    if (index !== -1) {
      // Если объект с таким id существует, заменяем его
      newQuestions = questions.map((item, idx) => idx === index ? newObject : item);
    } else {
      // Если объект с таким id не найден, добавляем новый
      newQuestions = [...questions, newObject];
    }

    setQuestions(newQuestions);
    updateInteractive({...interactive, receivedInfo: questions});
  };

  return (
    <div className={styles.question}>
      {questions.map((question, index) => (

        <div key={question.id}>
          <QuestionCard order={index} question={question} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion} questions={questions}/>
        </div>
      ))}

      <div className={styles['btns-wrapper']}>
        <button onClick={addNewQuestion}>Добавить вопрос</button>
      </div>
    </div>
  );
}
