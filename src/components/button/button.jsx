
import styles from "./button.module.css"

export const BaseButton = ({theme, text, action}) => {
    return <button className={styles.button}  onClick={action} >{text}</button>
}