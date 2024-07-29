import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { NotificationProvider } from './context/NotificationContext'
import { LoginProvider } from './context/LoginContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
    </NotificationProvider>
  </QueryClientProvider>
)
