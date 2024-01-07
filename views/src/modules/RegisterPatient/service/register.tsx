import { IRegisterPatientFormValues } from '../hooks/use-register-patient'
import { axiosInstance } from '../../../common/axios-instance'
import { AxiosResponse } from 'axios'

interface IRegisterPatientRequestDTO {
  FullName: string
  Email: string
  Cpf: string
  Password: string
}

export const registerService = () => {
  const callRegisterPatientApi = async (
    registerFormValues: IRegisterPatientFormValues
  ): Promise<AxiosResponse | undefined> => {
    try {
      const request = {
        FullName: registerFormValues.fullName,
        Email: registerFormValues.email,
        Cpf: registerFormValues.cpf,
        Password: registerFormValues.password
      } satisfies IRegisterPatientRequestDTO

      const response = await axiosInstance.post('users/register', request)
      return response

    } catch (error) {
      console.error(error)
    }
  }

  return {
    callRegisterPatientApi
  }
}
