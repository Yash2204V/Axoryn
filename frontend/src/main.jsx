import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './app/store.js'
import { Home, Channel, Player, PrivacyPolicy, TermAndCondition, Login, Register, MyChannel, EditProfile, Playlist, LikedVideos, Admin, HistoryVideos, Support } from "./pages/index.js"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='channel/:username' element={<Channel />} />
      <Route path='mychannel/:username' element={<MyChannel />} />
      <Route path='mychannel/:username/edit' element={<EditProfile />} />
      <Route path='mychannel/liked-videos' element={<LikedVideos />} />
      <Route path='mychannel/history-videos' element={<HistoryVideos />} />
      <Route path='mychannel/admin' element={<Admin />} />
      <Route path='playlist/:playlistId' element={<Playlist />} />
      <Route path='player/:videoId' element={<Player />} />
      <Route path='support' element={<Support />} />
      <Route path='privacy-policy' element={<PrivacyPolicy />} />
      <Route path='term-and-condition' element={<TermAndCondition />} />
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
