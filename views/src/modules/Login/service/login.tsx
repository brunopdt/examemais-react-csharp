import { ILoginFormValues } from '../hooks/useLogin'
import { axiosInstance } from '../../../common/axios-instance'
import { AxiosResponse } from 'axios'

interface ILoginRequestDTO {
  Email: string
  Password: string
}

export const loginService = () => {
  const callLoginApi = async (
    loginFormValues: ILoginFormValues
  ): Promise<AxiosResponse | undefined> => {
    try {
      const request = {
        Email: loginFormValues.email,
        Password: loginFormValues.password
      } satisfies ILoginRequestDTO

      const response = await axiosInstance.post('auth/login', request)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  return {
    callLoginApi
  }
}
