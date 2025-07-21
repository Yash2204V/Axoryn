import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './app/store.js'
import { Landing, Home, Channel, Admin, Player, PrivacyPolicy, TermAndCondition, Login, Register, Demo, Demo1 } from "./pages/index.js"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Landing />} />
      <Route path='home' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route path='channel/:channelID' element={<Channel />} />
      <Route path='player/:playerID' element={<Player />} />

      <Route path='privacy-policy' element={<PrivacyPolicy />} />
      <Route path='term-and-condition' element={<TermAndCondition />} />

      <Route path='demo' element={<Demo />} />
      <Route path='demo1' element={<Demo1 />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
