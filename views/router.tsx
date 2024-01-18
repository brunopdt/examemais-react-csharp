import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './src/modules/Login'
import { RegisterPatient } from './src/modules/RegisterPatient'
import { RegisterClinic } from './src/modules/RegisterClinic'
import { WelcomeScreen } from './src/common/components/welcome-screen'
import { PrivateRoute } from './src/common/utils/private-route'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />}>
          <Route path="/" element={<Login />} />
          <Route path="/register/patient" element={<RegisterPatient />} />
          <Route path="/register/clinic" element={<RegisterClinic />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/teste"
            element={<div>Aqui vai ficar um componente</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
