import React, {useState} from "react";
import styles from '../css/Modal.module.css';
export default function Modal_Interactives ({ isOpen, onClose, onConfirm, header, message, answer1, answer2}) {
  const [interactiveName, setInteractiveName] = useState('');
  
  const handleSubmit = () => {
    onConfirm(interactiveName);
    setInteractiveName('');
  }
    if (!isOpen) return null;
    return(
      <div className={styles['modal-overlay']}>
        <div className={styles['modal']}>
          <h2>{header}</h2>
          <p>{message}</p>
          <input className={styles['interactive-name']} placeholder="Название интерактива" onChange={(event) => setInteractiveName(event.target.value)} />
          <div className={styles['modal-buttons']}>
            <button onClick={handleSubmit}>{answer1}</button>
            <button onClick={onClose}>{answer2}</button>
          </div>
        </div>
      </div>
    );
  };