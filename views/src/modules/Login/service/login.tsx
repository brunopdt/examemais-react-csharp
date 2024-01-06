import { ILoginFormValues } from '../hooks/useLogin'
import { axiosInstance } from '../../../common/axios-instance'

export const loginService = () => {
  const callLoginApi = async (loginFormValues: ILoginFormValues) => {
    try {
      const response = await axiosInstance.post('auth/login', loginFormValues)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  return {
    callLoginApi
  }
}
