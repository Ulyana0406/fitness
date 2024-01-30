import React, { useState, useEffect } from 'react';
import * as S from './workout-page.styles';
import { MainLayout } from '../../layouts/main-layout/main-layout';
import { useParams } from 'react-router';
import { useGetWorkoutQuery, useGetCoursesQuery } from '../../serviceQuery/courses';
import { setCurrentPage } from '../../store/slices/courses';
import { useDispatch } from 'react-redux';
import styles from './workout-page.module.css'
export const WorkoutPage = ({theme}) => {
    const dispatch = useDispatch();
    const [error, setError] = useState()
    const { courseId, id } = useParams();
    const { data, isLoading } = useGetWorkoutQuery(id);
    const courses = useGetCoursesQuery();
    const [isInputResultActive, setIsInputResultActive] = useState(false);
    const [isProgressDone, setIsProgressDone] = useState(false);
    const [result, setResult] = useState([0,0,0,0,0])
    const [numExercises, setNumExercises] = useState();

    let quantity;
    let userInputData = [];

    const setInputProgress = () => {
        !isInputResultActive ? setIsInputResultActive(true) : setIsInputResultActive(false);
    }
    
    const setProgressDone = () => {
        !isProgressDone ? setIsProgressDone(true) : setIsProgressDone(false);
        setIsInputResultActive(false)
    }
    
    const countResultGuantity = (quantity, index) => {
        userInputData[index] = Math.abs(quantity);  
    }
    
    // Функция расчета результатов
    const countResultExersise = () => {
        let newResult = [];
        if (userInputData?.length === numExercises?.length) {
            for (let i = 0; i < userInputData?.length; i++) {
                newResult.push((userInputData[i] / data.exercises[i].quantity) * 100);
            } 
            setError(null)
            setProgressDone()
        } else {
            setError('Заполните поля ввода')
        }
        setResult(newResult);
    }


    const getExerciseName = (exercise) => {
        const [ name ] = exercise.split('(');
        return name;
    }

    const getColor = (index) => {
        const progressBarColors = ["#565EEF", "#FF6D00", "#9A48F1"];
        return progressBarColors[index % progressBarColors.length]
    }

    useEffect(() => {
        if (courses) {
            dispatch(setCurrentPage('workout'))
            let arr = data?.exercises?.map((exercise) => { return exercise })
            setNumExercises(arr)
        }
    }, [courses])

    return (
        <MainLayout theme={theme} isLoading={isLoading}>
            <div>
                <div>
                    <h1 className={styles.title}>{courses.data[courseId]?.nameRU}</h1>
                    <p className={styles.workoutText}>{data?.name}</p>
                </div>

                <div className={styles.workoutVideo}>
                    {isLoading ? 
                    <img src="/img/subtract.svg" alt="subtract" /> :
                    <iframe 
                        width="100%" height="100%"
                        src={data?.video}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
                    >
                    </iframe>}
                </div>

                {data?.exercises?.length && <div className={styles.workoutBlock}>
                    <div>
                        <h1 className={styles.workoutExerciseHeader}>Упражнения</h1>
                        <ul className={styles.workoutExerciseTextBox}>
                            {data?.exercises?.map((exercise, index) => {
                                return (
                                    <li className={styles.workoutExerciseText} key={index}>{exercise.name}</li>
                                )
                            })}
                        </ul>
                        <button className={styles.workoutExerciseButton} onClick={()=>{setInputProgress()}}>Заполнить свой прогресс</button>
                    {isInputResultActive && (
                        <div className={styles.pageContainer}>
                            <div className={styles.modalForm2}>
                                <img className={styles.closeArea} src='/img/close.svg' alt='close' onClick={()=>{setInputProgress()}}>
                                </img>
                                <div className={styles.progressBox}>
                                    <span className={styles.progressBoxTitle}>Мой прогресс</span>

                                    {data?.exercises?.map((exercise, index) => {
                                        return (
                                            <div className={styles.resultInputBox} key={index}>
                                                <div className={styles.resultInputBox} >{exercise.name}</div>
                                                <input className={styles.resultInput} type="number" step="1" min="0" placeholder='Введите значение' value={quantity} onInput={(event)=>{countResultGuantity(event.target.value, index)}}>
                                                </input>
                                            </div>        
                                        )
                                    })}
                                    {error && <div className={styles.error}>{error}</div>}
                                    <button className={styles.resultInputButton} onClick={()=>{countResultExersise()}}>Отправить</button>
                                </div>

                            </div>
                        </div>
                    )}
                    </div>

                    {isProgressDone && (
                        <div className={styles.progressMain} >
                            <div className={styles.progressBlock}>
                                <div className={styles.pageClose} onClick={()=>{setIsProgressDone()}}>
                                    <svg width="20px" height="20px" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_iconCarrier"><g id="Page-1" stroke="none" fill="none"  ><g id="Icon-Set-Filled"  transform="translate(-469.000000, -1041.000000)" fill="#b1aaaa"><path d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48" id="cross" ></path></g></g></g></svg>
                                </div>
                                <span className={styles.progressText}>Ваш прогресс засчитан!</span>
                                <div className={styles.progressImg}>
                                    <img width='400px' height='320px' src="/img/ok.svg" alt="ok" />
                                </div>
                            </div>
                        </div>
                        )
                    }
                    
                    <div className={styles.workoutProgress}>
                        <h1 className={styles.workoutProgressHeader}>Мой прогресс по тренировке:</h1>
                        <div className={styles.workoutProgressBlock}>

                        {data?.exercises?.map((exercise, index) => {
                                return (
                                    <div className={styles.workoutProgressContent} key={index}>
                                        <p className={styles.workoutProgressText}>{getExerciseName(exercise.name)}</p>
                                        <S.WorkoutProgressBar $color={getColor(index)}>
                                            <S.WorkoutProgressBarLine $width={result[index]} $color={getColor(index)}>
                                                {result[index] >= 80 ? <span className={styles.workoutProgressBarSpanFull}>{result[index]}%</span> : <span className={styles.workoutProgressBarSpan}>{result[index]}%</span>}
                                            </S.WorkoutProgressBarLine>
                                        </S.WorkoutProgressBar>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>}
                
            </div>
        </MainLayout>    
    )
}
