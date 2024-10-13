import { useState } from 'react';
import Interactive from './Interactive';
import Modal_Interactives from '../modal_windows/Modal_Interactives';

const Interactives = () => {
    const [currentInteractive, setCurrentInteractive] = useState(null);
    const [interactives, setInteractives] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoDuration, setVideoDuration] = useState(120); //Временное значение для видео

    const addNewInteractive = () => {
        openModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
      };
      const closeModal = () => {
        setIsModalOpen(false);
      };

    const confirmModal = (interactiveName) => {
        
        const interactive = {
            id: Date.now(),
            interactive_name: '',
            interactive_type: '',
            time_code: '',
        };

        setInteractives(prev => [...prev, interactive]);

        if(currentInteractive === null)
            setCurrentInteractive(interactive);


        // setIsModalOpen(false);
    }    
    const deleteInteractive = (id) => {
        const newInteractive = interactives.filter(i => i.id !== id);
        setInteractives(() => newInteractive);
        setCurrentInteractive(newInteractive[0] ?? null);
    }

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

    console.log('interactives', interactives);
    return (
        <div>
            <div>
                <div>
                    <button onClick={addNewInteractive}>Add Interactive</button>
                    <Modal_Interactives isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmModal} header="Добавить новый интерактив" message="Вы создаете новый интерактив. Несохраненные данные будут потеряны" answer1="Подтвердить" answer2="Сбросить" />
                </div>

                <div>
                    {interactives.map((interactive) =>
                        <button key={interactive.id} onClick={() => setCurrentInteractive(interactive)}>Button {interactive['interactive_name']}</button>
                    )}
                </div>
            </div>

            <div>
                {currentInteractive && <Interactive updateInteractive={updateInteractive} deleteInteractive={deleteInteractive} interactive={currentInteractive} videoDuration={videoDuration} />}
            </div>
        </div>
    )
}

export default Interactives