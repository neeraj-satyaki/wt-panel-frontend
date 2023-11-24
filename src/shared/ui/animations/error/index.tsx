import styles from './style.module.css'

export default function AnimateError() {
  return (
    <svg
      className={styles.crossmark}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle className={styles.crossmark__circle} cx="26" cy="26" r="25" fill="none" />
      <path
        className={styles.crossmark__line}
        fill="none"
        d="M16 16l20 20" // Диагональная линия от левого верхнего угла к правому нижнему
      />
      <path
        className={styles.crossmark__line}
        fill="none"
        d="M16 36l20 -20" // Диагональная линия от левого нижнего угла к правому верхнему
      />
    </svg>
  )
}
