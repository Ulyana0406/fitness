import { FitnessCard } from '../../components/fitness-card/fitness-card';
import { MainLayout } from '../../layouts/main-layout/main-layout';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllCourses, setCurrentPage } from '../../store/slices/courses'
import { useGetCoursesQuery } from '../../serviceQuery/courses'
import { allCoursesSelector } from '../../store/selectors/courses'
import styles from './main-page.module.css'
export const MainPage = ({theme}) => {
    const dispatch = useDispatch();
    const [errorFetch, setErrorFetch] = useState(null)
    const { data, isError, isLoading } = useGetCoursesQuery()
    const workout = useSelector(allCoursesSelector);
    const handlerScrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    useEffect(() => {
        if (data) {
            const arr = Object.values(data).sort((a, b) => a.order - b.order);
            const arr2 = arr.flat().map(({_id, nameEN, nameRU}) => {
                let arr = { _id, nameEN, nameRU } 
                return arr
            })
            dispatch(setAllCourses(arr2))
            setErrorFetch(null)
            dispatch(setCurrentPage('main'))
        }
        if (isError) {
            setErrorFetch('Не удалось загрузить данные, попробуйте позже')
        }
    }, [data, isError])

    return (
        <MainLayout theme={theme} isLoading={isLoading}>
            <div className={styles.mainInfo}>
                <div className={styles.mainTitleBox}>
                    <p className={styles.mainSuperTitle}>
                        Онлайн-тренировки для занятий дома
                    </p>
                    <h1 className={styles.mainTitle}>
                        Начните заниматься спортом и улучшите качество жизни
                    </h1>
                </div>
                <img className={styles.mainImg} src="/img/sale-sticker.svg" alt="sale-sticker" />
            </div>
            <div className={styles.mainCards}>
                {workout.map(({_id, nameEN, nameRU}) => {
                    return <FitnessCard title={nameRU} img={nameEN} key={_id} path={_id} />
                })}
            </div>
            <button className={styles.mainButtonUp} onClick={handlerScrollToTop}>Наверх ↑</button>
        </MainLayout>
    );
}