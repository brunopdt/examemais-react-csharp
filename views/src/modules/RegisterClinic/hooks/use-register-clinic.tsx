import { useCallback, useState } from 'react'
import { registerService } from '../service/register'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export interface IRegisterClinicFormValues {
  clinicName: string
  address: string
  cnpj: string
  email: string
  password: string
}

export const useRegisterClinic = () => {
  const { callRegisterClinicApi } = registerService()
  const navigate = useNavigate()

  const [registerFormValues, setRegisterClinicFormValues] =
    useState<IRegisterClinicFormValues>({
      clinicName: '',
      address: '',
      email: '',
      cnpj: '',
      password: ''
    })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleRegisterClinicFormChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target
      setRegisterClinicFormValues({
        ...registerFormValues,
        [name]: value
      })
    },
    [registerFormValues]
  )

  const handleRegisterClinicFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    setIsLoading(true)
    const response = await callRegisterClinicApi(registerFormValues)
    setIsLoading(false)
    if (!response) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Não foi possível cadastrar sua conta',
        showConfirmButton: false,
        timer: 1500
      })
      return
    }

    Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: 'Conta criada com sucesso!',
      showConfirmButton: false,
      timer: 1500
    })
    navigate('/')
  }

  const handleShowPasswordButtonClick = useCallback(() => {
    setShowPassword(!showPassword)
  }, [showPassword])

  return {
    registerFormValues,
    handleRegisterClinicFormChange,
    handleRegisterClinicFormSubmit,
    showPassword,
    handleShowPasswordButtonClick,
    isLoading
  }
}
