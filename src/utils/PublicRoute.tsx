import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { AppRoutes } from 'entities/constants'

export function PublicRoute() {
  const { token } = useAuth()
  return token ? <Navigate to={AppRoutes.Products} /> : <Outlet />
}