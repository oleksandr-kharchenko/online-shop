import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { AppRoutes } from 'entities/constants'

export function PrivateRoute() {
  const { token } = useAuth()
  return token ? <Outlet /> : <Navigate to={AppRoutes.Login} />
}