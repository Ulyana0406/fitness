import { useEffect } from 'react';
import * as S from './workouts-modal.style';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './workouts-modal.module.css'
export const WorkoutsModal = ({ action, data, courseId }) => {
    const navigate = useNavigate()

    const handleNavigate = (id) => {
        navigate(`workout/${courseId}/${id}`)
    }

    return (
        <div className={styles.workoutsModal}>
            <div className={styles.workoutsModalWrapper}>
                <img className={styles.workoutsModalClose} src='/img/close.svg' alt='close' onClick={action}/>
                <h3 className={styles.workoutsModalTitle}>
                    Выберите тренировку
                </h3>
                <div className={styles.workoutsModalContent}>
                    {data.map((item) => {
                        return (
                            <div className={styles.workoutsModalItem} key={item._id} onClick={() => handleNavigate(item._id)}>
                                <h5 className={styles.workoutsModalItemTitle}>
                                    {item.name}
                                </h5>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}