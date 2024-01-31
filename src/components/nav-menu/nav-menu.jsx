import { NavLink } from 'react-router-dom';
import * as S from '../nav-menu/nav-menu.styles';
import styles from './nav-menu.module.css'
export const NavMenu = ({page}) => {
  const handleLogout = () => {
    localStorage.removeItem('auth');
  }

  return (
    <div className={styles.navMenu}>
      <ul className={styles.menuList}>
        <li className= {styles.menuItem}>
          <NavLink to="/" page={page} >На главную</NavLink>
        </li>
        <li className= {styles.menuItem}>
          <NavLink to="/profile" page={page} >Профиль</NavLink>
          </li>
        <li className= {styles.menuItem}  onClick={() => handleLogout()}> 
          <NavLink to="/auth" page={page} >Выйти</NavLink>
        </li>
      </ul>
    </div>
  )
}    