import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/routes'
import { PageLoader } from '@/components/common/PageLoader'

export default function App() {
  return (
    <BrowserRouter>
      <PageLoader />
      <AppRoutes />
    </BrowserRouter>
  )
}
