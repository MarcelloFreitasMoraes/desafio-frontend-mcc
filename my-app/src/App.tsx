import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes } from './routes/app-routes'
import { ToastProvider } from './constants/toast'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </QueryClientProvider>
  )
}

export default App
