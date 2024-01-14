import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './src/modules/Login'
import { RegisterPatient } from './src/modules/RegisterPatient'
import { RegisterClinic } from './src/modules/RegisterClinic'
import { WelcomeScreen } from './src/common/components/welcome-screen'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />}>
          <Route path="/" element={<Login />} />
          <Route path="/register/patient" element={<RegisterPatient />} />
          <Route path="/register/clinic" element={<RegisterClinic />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
