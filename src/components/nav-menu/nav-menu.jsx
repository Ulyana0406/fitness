import * as S from '../nav-menu/nav-menu.styles';
import styles from './nav-menu.css'
export const NavMenu = ({page}) => {
  const handleLogout = () => {
    localStorage.removeItem('auth');
  }

  return (
    <div className={styles.navMenu}>
      <ul className={styles.menuList}>
        <li class= {styles.menuItem}>
          <S.MenuLink to="/" page={page} >На главную</S.MenuLink>
        </li>
        <li class= {styles.menuItem}>
          <S.MenuLink to="/profile" page={page} >Профиль</S.MenuLink>
          </li>
        <li class= {styles.menuItem}  onClick={() => handleLogout()}> 
          <S.MenuLink to="/auth" page={page} >Выйти</S.MenuLink>
        </li>
      </ul>
    </div>
  )
}    