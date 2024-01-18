import { IRegisterClinicFormValues } from '../hooks/use-register-clinic'
import { axiosInstance } from '../../../common/axios-instance'
import { AxiosResponse } from 'axios'

interface IRegisterClinicRequestDTO {
  Name: string
  Address: string
  Cnpj: string
  Email: string
  Password: string
}

export const registerService = () => {
  const callRegisterClinicApi = async (
    registerFormValues: IRegisterClinicFormValues
  ): Promise<AxiosResponse | undefined> => {
    try {
      const request = {
        Name: registerFormValues.clinicName,
        Email: registerFormValues.email,
        Cnpj: registerFormValues.cnpj,
        Password: registerFormValues.password,
        Address: registerFormValues.address
      } satisfies IRegisterClinicRequestDTO

      const response = await axiosInstance.post(
        'clinics/public/register',
        request
      )
      return response
    } catch (error) {
      console.error(error)
    }
  }

  return {
    callRegisterClinicApi
  }
}
