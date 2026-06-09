import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { applyTheme, useThemeStore } from '@/store/themeStore'

applyTheme(useThemeStore.getState().theme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
