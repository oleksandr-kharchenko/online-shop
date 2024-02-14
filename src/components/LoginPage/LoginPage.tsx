import styles from './LoginPage.module.scss'
import LoginForm from 'components/LoginForm/LoginForm'

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <LoginForm />
      <p className={styles.hint}>
        Username: kminchelle, password: 0lelplR
      </p>
    </div>
  )
}