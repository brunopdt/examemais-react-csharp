import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookies'

export const PrivateRoute = () => {
  const token = Cookies.get('accessToken')

  const isTokenValid = (): boolean => {
    try {
      if (!token) throw new Error('Token not found')

      const decodedToken = jwtDecode(token)
      const currentDate = new Date()

      if (decodedToken.exp && decodedToken.exp * 1000 < currentDate.getTime())
        throw new Error('Token expired')

      return true
    } catch {
      return false
    }
  }

  return isTokenValid() ? <Outlet /> : <Navigate to="/" />
}
