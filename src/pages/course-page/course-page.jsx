import { BaseButton } from "../../components/button/button";
import { MainLayout } from "../../layouts/main-layout/main-layout";
import * as S from './course-page.style';
import { ProgressBlock } from '../../components/progress-block/progress-block'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentCourseSelector } from '../../store/selectors/courses'
import { useGetCourseQuery } from '../../serviceQuery/courses'
import { setCurrentCourse, setCurrentPage } from '../../store/slices/courses'
import { useNavigate  } from "react-router-dom";
import styles from './course-page.module.css'
export const CoursePage = ({theme, isShowButton}) => {
    const [show, setShow] = useState(false)
    const auth = localStorage.getItem('auth')
    const navigate = useNavigate();
    const handleLoginClick = ({auth}) => {
        if (!!auth) {
            setShow(!show)
            localStorage.setItem('userCourses', id)
        }
        else {
            navigate('/auth', { replace: true });
        }
    }

    const dispatch = useDispatch()
    const { id } = useParams()
    const { data, isLoading } = useGetCourseQuery(id)   
    const course = useSelector(currentCourseSelector)

    useEffect(() => {
        if (data) {
            dispatch(setCurrentCourse(data))
            dispatch(setCurrentPage('course'))
        }
    }, [data])

    return (
        <MainLayout theme={theme} isShowButton={isShowButton} isLoading={isLoading}>
            <div className={styles.coursePageContainer}>
                <div className={styles.titleBox}>
                    <h1 className={styles.title}>{course.nameRU}</h1>
                    <img src={`/img/page-img/${course.nameEN}.svg`} alt={course.nameRU} />
                </div>
                
                <div>
                    <h3 className={styles.aboutTitle}>Подойдет для вас, если:</h3>
                    <ul className={styles.aboutList}>
                        {course.fitting?.map((item, index) => {
                            return (
                                <li className={styles.aboutListItem} key={index}>
                                    <span className={styles.aboutListItemIndex}>
                                        {index + 1}
                                    </span>
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                </div>

               <div>
                    <h3 className={styles.aboutTitle}>Направления:</h3>
                    <ul className={styles.directionsList}>
                        {course.directions?.map((item, index) => {
                            return (
                                <li className={styles.directionsListItem} key={index}>
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <p>
                    {course.description}
                </p>

                <div className={styles.submitApplication}>
                    <p className={styles.submitApplicationText}>
                        Оставьте заявку на пробное занятие, мы свяжемся 
                        с вами, поможем с выбором направления и тренера, с которым тренировки принесут здоровье и радость!
                    </p>
                    <BaseButton action={() => handleLoginClick({auth})} theme='dark' text='Записаться на тренировку' />
                    <img className={styles.submitApplicationImg} src="/img/phone.svg" alt="phone" />
                </div>
                {show && <ProgressBlock text = 'Вы успешно записались!' setShow={setShow}/>} 
            </div>
        </MainLayout>
    );
};