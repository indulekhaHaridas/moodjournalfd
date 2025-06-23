import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId='435552023849-oq01rjjm81obe4djnq16ofnq1fcqs3ku.apps.googleusercontent.com'>
      <App /> 
    </GoogleOAuthProvider>
    </BrowserRouter>
  
  </StrictMode>,
)
