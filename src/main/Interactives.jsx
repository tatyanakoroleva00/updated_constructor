import { useEffect, useState } from 'react';
import Interactive from './Interactive';
import Modal_Interactives from '../modal_windows/Modal_Interactives';
import styles from '../css/Buttons.module.css';

const Interactives = ({interactives, setInteractives}) => {
    const [currentInteractive, setCurrentInteractive] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const addNewInteractive = (interactiveName) => {

        const interactive = {
            id: Date.now(),
            interactive_name: interactiveName,
            interactive_type: '',
            time_code: '',
            receivedInfo: [],
        };
        setInteractives(prev => [...prev, interactive]);
        setCurrentInteractive(interactive);

        if (currentInteractive === null)
            setCurrentInteractive(interactive);

        setIsModalOpen(false);
    };
    const deleteInteractive = (id) => {
        const newInteractive = interactives.filter(i => i.id !== id);
        setInteractives(() => newInteractive);
        setCurrentInteractive(newInteractive[0] ?? null);
    };

    const updateInteractive = (newObject) => {

        setCurrentInteractive(newObject);
        setInteractives((prevData) => {
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
        <div>
            <div>
                <div>
                    <button className={styles['add-button']} onClick={() => setIsModalOpen(true)}>Добавить интерактив</button>
                    <Modal_Interactives isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={addNewInteractive} header="Добавить новый интерактив" message="Вы создаете новый интерактив. Несохраненные данные будут потеряны" answer1="Подтвердить" answer2="Отмена" />
                </div>

                <div className={styles['buttons-row']}>
                    {interactives.map((interactive) =>
                        <button className={`${currentInteractive === interactive ? styles['active-btn'] : styles['courses-btn']}`} key={interactive.id} onClick={() => setCurrentInteractive(interactive)}>{interactive['interactive_name']}</button>
                    )}
                </div>
            </div>
            <div>
                {interactives.map(interactive =>
                    <Interactive key={interactive.id} interactive={interactive} currentInteractive={currentInteractive} updateInteractive={updateInteractive} deleteInteractive={deleteInteractive}/>
                )}
            </div>
        </div>
    )
}

export default Interactives