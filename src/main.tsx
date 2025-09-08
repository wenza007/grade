import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import GradeApp from './components/GradeApp'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GradeApp />
  </StrictMode>,
)
