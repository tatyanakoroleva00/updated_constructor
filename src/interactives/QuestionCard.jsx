import React, {useState} from 'react'
import styles from '../css/Testing.module.css';
import Answer from './Answer';

export default function QuestionCard({ order, deleteQuestion, updateQuestion, question, questions }) {

  const [answersArr, setAnswersArr] = useState(question.answers ?? []);

  const addAnswer = () => {

    const newAnswer = {
      id: Date.now(),
      name: '',
      status: '',
    };

  setAnswersArr(prev => [...prev, newAnswer]);
 };

 const deleteAnswer = (newObject) => {

  const newAnswer = answersArr.filter(i => i.id !== newObject.id);
  setAnswersArr(() => newAnswer);

 };

 const updateAnswer = (newObject) => {
  const index = answersArr.findIndex(item => item.id === newObject.id);

  let newAnswers = null;

  if(index !== -1) {
    // Если объект с таким id существует, заменяем его

    newAnswers = answersArr.map((item, idx) => idx === index ? newObject : item);
  } else {
    newAnswers = [answersArr, newObject];
  }
  setAnswersArr(newAnswers);
  updateQuestion({...question, answers: newAnswers})
 };
  
  return (
    <div className={styles['question-block']}>

      {/* Номер и Название вопроса */}
      <div className={styles["question-wrapper"]}>
        <label>Вопрос № {order + 1}</label>
        <textarea className={styles['question-field']} name="question_name"  placeholder="Введите вопрос" onChange={event => updateQuestion({...question, name : event.target.value})}></textarea>
      </div>

      {answersArr.map((answer, index) => (
        <Answer key={answer.id} order={index} answer={answer} deleteAnswer={deleteAnswer} updateAnswer={updateAnswer}/>
      ) )}

      <div >
        <button onClick={addAnswer}>+</button>
      </div>
    </div>
  )
}