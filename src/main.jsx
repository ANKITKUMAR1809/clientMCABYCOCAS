import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FacultyContextProvider from './context/facultyContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FacultyContextProvider>
      <App />
    </FacultyContextProvider>
  </StrictMode>,
)
