import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import App from './App.jsx'
import { StoreProvider } from './Context/storeContext.jsx'



const Root = createRoot(document.getElementById('root'))
Root.render(
  <StoreProvider>
    <StrictMode>
      <Router>
        <App />
      </Router>
    </StrictMode>
  </StoreProvider>
)
