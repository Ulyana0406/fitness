import { Logo } from "../logo/logo.jsx";
import * as S from './header.styles.js';
import { useState } from 'react';
import { NavMenu } from '../../components/nav-menu/nav-menu.jsx';
import { useSelector } from 'react-redux'
import { currentPageSelector } from '../../store/selectors/courses'
import styles from './header.module.css'
export const Header = ({theme, isShowButton = true}) => {
    const [showMore, setShowMore] = useState(false)
    const handleMoreClick = () => {setShowMore(!showMore)}
    const user = useSelector((state) => state.auth);
    const page = useSelector(currentPageSelector);

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Logo theme={theme}/>
                {isShowButton && (
                    <>{!user.userName ? <S.HeaderButton to='/auth'>Войти</S.HeaderButton> : 
                    <div className={styles.profileBlock} onClick={() => handleMoreClick()}>
                        <div className={styles.profileIcon} ></div >
                        <span className={styles.profileMail}>
                            {user.userName}
                            {showMore && <NavMenu page={page}/> }
                        </span>
                        <div >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none"><path d="M12.3552 1.03308L6.67761 6.7107L0.999999 1.03308" stroke={ "white"} strokeWidth="2"/></svg>
                        </div>
                </div>}</>
                )}
            </div>
        </header>
    );
};