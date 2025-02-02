import React from "react";
import QuestionCard from "./QuestionCard";
import { useState } from "react";
import styles from '../css/Testing.module.css';

export default function Testing({ interactive, updateInteractive, receivedInfo }) {
  const [questions, setQuestions] = useState(receivedInfo.questions ?? []);
  // const [errors, setErrors] = useState([]);

  // Добавить новый вопрос
  const addNewQuestion = () => {

    const newQuestion = {
      'id': Date.now(),
      'question_name': '',
    };
    setQuestions(prev => [...prev, newQuestion]);
    // setErrors(prev => [...prev, newQuestion.id])
  };

  // Удалить вопрос
  const deleteQuestion = (id) => {
    const newQuestion = questions.filter(i => i.id !== id);

    updateInteractive({...interactive, receivedInfo: {'questions': newQuestion}}); //here

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

    updateInteractive({...interactive, receivedInfo: {'questions': newQuestions}});
    setQuestions(newQuestions);
  };

  // const updateErrorsArr = (newArr) => {
  //   setErrors(newArr);
  // };

  return (
    <div className={styles.question}>
      {questions.map((question, index) => (

        <div key={question.id}>
          {/* <QuestionCard error={errors} updateErrorsArr={updateErrorsArr} setErrors={setErrors} order={index} question={question} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion}/> */}


          <QuestionCard order={index} question={question} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion}/>
        </div>
      ))}

    <div className={styles['btns-wrapper']}>
    {/* {errors.length === 0 && <button onClick={addNewQuestion}>Добавить вопрос</button>} */}
    {<button onClick={addNewQuestion}>Добавить вопрос</button>}
      </div>
    </div>
  );
}
