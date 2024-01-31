
import * as S from './fitness-card.styles'
import styles from'./fitness-card.module.css'
export const FitnessCard = ({title, img, path}) => {
    return (
        <S.FitnessCard to={`/course/${path}`}> 
            <h className={styles.fitnessCardTitle}>
                {title}
            </h>
            <img src={`/img/${img}.svg`} alt={title} />
        </S.FitnessCard>
    )
}