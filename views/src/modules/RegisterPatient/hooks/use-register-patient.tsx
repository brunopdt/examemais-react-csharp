import { useCallback, useState } from 'react'
import { registerService } from '../service/register'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export interface IRegisterPatientFormValues {
  fullName: string
  email: string
  cpf: string
  password: string
}

export const useRegisterPatient = () => {
  const { callRegisterPatientApi } = registerService()
  const navigate = useNavigate()

  const [registerFormValues, setRegisterPatientFormValues] =
    useState<IRegisterPatientFormValues>({
      fullName: '',
      email: '',
      cpf: '',
      password: ''
    })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleRegisterPatientFormChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target
      setRegisterPatientFormValues({
        ...registerFormValues,
        [name]: value
      })
    },
    [registerFormValues]
  )

  const handleRegisterPatientFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    setIsLoading(true)
    const response = await callRegisterPatientApi(registerFormValues)
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
    handleRegisterPatientFormChange,
    handleRegisterPatientFormSubmit,
    showPassword,
    handleShowPasswordButtonClick,
    isLoading
  }
}
