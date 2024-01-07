import { ILoginFormValues } from '../hooks/useLogin'
import { axiosInstance } from '../../../common/axios-instance'
import { AxiosResponse } from 'axios'

export const loginService = () => {
  const callLoginApi = async (
    loginFormValues: ILoginFormValues
  ): Promise<AxiosResponse | undefined> => {
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
