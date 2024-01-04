import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Register } from './src/modules/Register'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />    
      </Routes>
    </BrowserRouter>
  )
}

export default Router