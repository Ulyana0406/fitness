import { useState, useEffect } from 'react';
import * as S from './profile-page.styles';
import { UpdateUserData } from '../../components/updata-user-data/updata-user-data';
import { userFitnessCards } from '../../mock/courses-data'
import { MainLayout } from '../../layouts/main-layout/main-layout';
import { useGetWorkoutsQuery, useGetCoursesQuery } from '../../serviceQuery/courses';
import { WorkoutsModal } from '../../components/workouts-modal/workouts-modal';
import { useSelector, useDispatch } from 'react-redux'
import { setAllWorkouts, setCurrentPage } from '../../store/slices/courses'
import { currentCourseSelector } from '../../store/selectors/courses'
import styles from './profile-page.module.css'
export const ProfilePage = () => {
    const dispatch = useDispatch();
    const [isLoginMode, setIsLoginMode] = useState(null);
    const [loginShow, setLoginShow] = useState(false)
    const handleLoginClick = () => {setLoginShow(!loginShow); setIsLoginMode(true);}
    const [passwordShow, setPasswordShow] = useState(false)
    const handlePasswordClick = () => {setPasswordShow(!passwordShow); setIsLoginMode(false);}

    const {data, isError, isLoading} = useGetWorkoutsQuery(); 
    useEffect(() => {
        if (data) {
            dispatch(setAllWorkouts(data));
            dispatch(setCurrentPage('profile'))
        }
    }, [data, isError, isLoading])

    const [isShowWorkouts, setShowWorkouts] = useState(false)
    const user = useSelector((state) => state.auth);
    const courses = useGetCoursesQuery();
    const [workoutsData, setWorkoutsData] = useState([])
    const [courseId, setCourseId] = useState(null)

    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        if (loginShow || passwordShow) {
            setIsActive(true);
        }
    }, [loginShow, passwordShow, data])

    const handleShowWorkoutsModal = (id) => {
        if (isShowWorkouts) {
            setShowWorkouts(false);
            return;
        }

        setWorkoutsData(courses.data[id].workouts.map(id => data[id]))
        setCourseId(id)
        setShowWorkouts(true);
    }

    // // получить курс из LS и отобразить его вместо userFitnessCards
    // const courseUserId = localStorage.getItem('userCourses');
    // useEffect(() => {
    //     // console.log('workoutsData', workoutsData);
    //     if (courseUserId) {
    //         const arr = courses.data[courseUserId].workouts.map(id => data[id])
    //         console.log( arr);
    //     }
    // },[data, courseUserId])
    // //

    return (
            <MainLayout theme='white' isLoading={isLoading}>
                <div className={styles.mainInfo}>
                    <h1 className={styles.mainTitle}>Мой профиль</h1>
                    <div className={styles.mainTextBlock}>
                        <p className={styles.mainText}>Логин: {user.userName}</p>
                
                    </div>
                    <div className={styles.mainButtonBlock}>
                        <button className={styles.mainButton} type="button"  onClick={() => handleLoginClick()} >Изменить логин</button>
                        <button className={styles.mainButton} type="button"  onClick={() => handlePasswordClick()}>Изменить пароль</button>
                    </div>
                </div> 
                <div className={styles.mainCards}>
                    {userFitnessCards.map(({title, img, id}) => {
                        return (
                            <div className={styles.fitnessCard} key={title} onClick={() => handleShowWorkoutsModal(id)}>
                                <h3 className={styles.fitnessCardTitle}>
                                    {title}
                                </h3>
                                <img src={`/img/${img}.svg`} alt={title} />
                                <button className={styles.fitnessCardButton} type="button">Перейти</button>
                            </div>
                        )
                    })}
                </div>
                {isActive && <UpdateUserData isLoginMode={isLoginMode} setIsActive={setIsActive}/> }
                {isShowWorkouts && <WorkoutsModal action={handleShowWorkoutsModal} data={workoutsData} courseId={courseId} />}
            </MainLayout>
    )
}