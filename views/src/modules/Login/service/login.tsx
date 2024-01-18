import { ILoginFormValues } from '../hooks/useLogin'
import { axiosInstance } from '../../../common/axios-instance'

interface ILoginRequestDTO {
  Email: string
  Password: string
}

interface ILoginResponseDTO {
  id: string
  accessToken: string
  refreshToken: string
}

export const loginService = () => {
  const callLoginApi = async (
    loginFormValues: ILoginFormValues
  ): Promise<ILoginResponseDTO | undefined> => {
    try {
      const request = {
        Email: loginFormValues.email,
        Password: loginFormValues.password
      } satisfies ILoginRequestDTO

      const response = await axiosInstance.post<ILoginResponseDTO>(
        'auth/public/login',
        request
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    callLoginApi
  }
}
