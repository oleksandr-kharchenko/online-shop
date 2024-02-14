import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { AuthProvider } from 'contexts/AuthContext'
import { CheckoutProvider } from 'contexts/CheckoutContext'
import Router from 'components/Router/Router'

const queryClient = new QueryClient()

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <AuthProvider>
      <CheckoutProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </CheckoutProvider>
    </AuthProvider>
  </StrictMode>,
)
