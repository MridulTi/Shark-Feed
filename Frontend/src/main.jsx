import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import { store } from './app/store.js'
import { ThemeProvider } from '@material-tailwind/react'
import { ModalProvider } from './Context/ModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider>
      <ModalProvider>
    <App/>
    </ModalProvider>
    </ThemeProvider>
  </Provider>
)
