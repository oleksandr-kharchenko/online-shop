import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { UserSchema } from 'entities/types'

type AuthContextSchema = Partial<UserSchema & {
  logIn: (data: UserSchema) => void,
  logOut: () => void
}>

const AuthContext = createContext<AuthContextSchema>({})
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const currentUser = localStorage.getItem('user')
  const [user, setUser] = useState<UserSchema | null>(
    currentUser ? JSON.parse(currentUser) : null
  )

  const logIn = (data: UserSchema) => {
    setUser(data)
  }

  const logOut = () => {
    setUser(null)
    localStorage.clear()
  }

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const value = {
    id: user?.id || undefined,
    username: user?.username || undefined,
    email: user?.email || undefined,
    firstName: user?.firstName || undefined,
    lastName: user?.lastName || undefined,
    gender: user?.gender || undefined,
    image: user?.image || undefined,
    token: user?.token || undefined,
    logIn,
    logOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}