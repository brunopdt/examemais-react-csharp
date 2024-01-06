import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './src/modules/Login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />    
      </Routes>
    </BrowserRouter>
  )
}

export default Router