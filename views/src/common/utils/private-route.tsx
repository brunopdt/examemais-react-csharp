import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'

interface IPrivateRouteProps {
  profile?: 'Patient' | 'Clinic'
}

export const PrivateRoute = ({ profile }: IPrivateRouteProps) => {
  const token = Cookies.get('accessToken')
  const reduxProfile = useSelector((state: RootState) => state.login.profile)

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

  const isProfileValid = (): boolean => {
    if (profile) return profile === reduxProfile
    else return true
  }

  const validate = (): boolean => {
    return isProfileValid() && isTokenValid()
  }

  return validate() ? <Outlet /> : <Navigate to="/" />
}
