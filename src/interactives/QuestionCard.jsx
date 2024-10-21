import React, {useState} from 'react'
import styles from '../css/Testing.module.css';
import Answer from './Answer';

export default function QuestionCard({ order, deleteQuestion, updateQuestion, question }) {
  const [answersArr, setAnswersArr] = useState(question.answers ?? []);
  // const [errorIds, setErrorIds] = useState([]);

  const addAnswer = () => {

    const newAnswer = {
      id: Date.now(),
      name: '',
      'status': false,
    };

  setAnswersArr(prev => [...prev, newAnswer]);
 };

 const deleteAnswer = (newObject) => {
  const newAnswer = answersArr.filter(i => i.id !== newObject);

  // const newErrorsArr = error.filter(i => i.id !== newObject);
  // updateErrorsArr(newErrorsArr);
  updateQuestion({...question, 'answers': newAnswer}); //here
  setAnswersArr(() => newAnswer);
 };

 const updateAnswer = (newObject) => {

  const index = answersArr.findIndex(item => item.id === newObject.id);
  
  let newAnswers = null;

  if(index !== -1) {
    // Если объект с таким id существует, заменяем его
    newAnswers = answersArr.map((item, idx) => idx === index ? newObject : item);
  } else {
    // Если объект с таким id не найден, добавляем новый
    newAnswers = [...answersArr, newObject];
  }

  updateQuestion({...question, 'answers': newAnswers})
  setAnswersArr(newAnswers);
 };

//  const getErrors = (errorObject) => {
//   const index = error.findIndex(item => item.id === errorObject.id);
//   if(errorObject.error === true) {
//     let newError = null;
//     if(index !== -1) {
//     newError = error.map((item, idx) => idx === index ? errorObject : item);
//     }

//     else {
//       // Если объект с таким id не найден, добавляем новый
//       newError = [...error, errorObject];
//     }
//     updateErrorsArr([...error, newError]);
//     setErrors(newError);
//   } 
  
//   if(errorObject.error === false) {
//     if(index !== -1) {
//       let newError = error;
//       newError.splice(index, 1);
//       updateErrorsArr([...error, newError]);
//       setErrors(error);
//     }
//   }
//  };


//  const addErrorIds = (id) => {
//   setErrorIds(prev => [...prev, id]);
//  };
 
 
  return (
    <div className={styles['question-block']}>

      {/* Номер и Название вопроса */}
      <div className={styles["question-wrapper"]}>
        <label>Вопрос № {order + 1}</label>
        <textarea className={styles['question-field']} value={question['question_name']} name="question_name"  placeholder="Введите вопрос" onChange={event => updateQuestion({...question, 'question_name' : event.target.value})}></textarea>
        <div >
        <button onClick={() => deleteQuestion(question.id)}>X</button>
      </div>
      </div>

      {answersArr.map((answer, index) => (
        <Answer key={answer.id} order={index} answer={answer} deleteAnswer={deleteAnswer} updateAnswer={updateAnswer}/>
      ) )}
{/* 
      {error.length === 0 && <div >
        <button onClick={addAnswer}>+</button>
      </div>} */}
      <div >
        <button onClick={addAnswer}>+</button>
      </div>
    </div>
  )
}