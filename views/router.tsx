import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './src/modules/Login';
import { RegisterPatient } from './src/modules/RegisterPatient';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />    
        <Route path='/register/patient' element={<RegisterPatient />} />    
      </Routes>
    </BrowserRouter>
  )
}

export default Router