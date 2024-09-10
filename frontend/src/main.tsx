import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import { MainLayout } from './layouts/MainLayout.tsx';
import { Home , Join , Room } from './pages'

import { connect } from 'socket.io-client';

const socket = connect('http://localhost:8080'); 

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/join' element={<Join socket={socket}/>} /> 
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home socket={socket} />} />
      <Route path="/room" element={<Room socket={socket} />} />
      <Route path="/about" element={<>About page</>} />
    </Route>
    </>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
