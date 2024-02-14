import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { PublicRoute } from 'utils/PublicRoute'
import { PrivateRoute } from 'utils/PrivateRoute'
import LoginPage from 'components/LoginPage/LoginPage'
import ProductsPage from 'components/ProductsPage/ProductsPage'
import ProductPage from 'components/ProductPage/ProductPage'
import CheckoutPage from 'components/CheckoutPage/CheckoutPage'
import { AppRoutes } from 'entities/constants'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Root} element={<Navigate to={AppRoutes.Products} />} />
        <Route element={<PublicRoute />}>
          <Route path={AppRoutes.Login} element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={AppRoutes.Products} element={<ProductsPage />} />
          <Route path={AppRoutes.Product} element={<ProductPage />} />
          <Route path={AppRoutes.Checkout} element={<CheckoutPage />} />
        </Route>
        <Route path='*' element={<Navigate to={AppRoutes.Root} />} />
      </Routes>
    </BrowserRouter>
  )
}