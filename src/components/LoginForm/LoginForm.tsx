import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './LoginForm.module.scss'
import { useLogIn } from 'api/queries'
import { useAuth } from 'contexts/AuthContext'
import { UserCreds, UserSchema } from 'entities/types'
import { loginSchema } from 'helpers/validation'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserCreds>({
    resolver: yupResolver(loginSchema)
  })

  const { mutateAsync } = useLogIn()
  const { logIn } = useAuth()

  const onSubmit: SubmitHandler<UserCreds> = (data) => {
    mutateAsync(data).then((res) => {
      (logIn as (data: UserSchema) => void)(res)
    })
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <label htmlFor='username'>Username</label>
        <input id='username' {...register('username')} />
        {errors?.username && (
          <p className={styles.error}>{errors.username.message}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='password'>Password</label>
        <input id='password' type='password' {...register('password')} />
        {errors?.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>
      <button type='submit' className={styles.submitButton}>
        Submit
      </button>
    </form>
  )
}