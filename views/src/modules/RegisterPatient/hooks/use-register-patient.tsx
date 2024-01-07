import { useCallback, useState } from 'react'
import { registerService } from '../service/register'
import { useNavigate } from 'react-router-dom'

export interface IRegisterPatientFormValues {
  fullName: string 
  email: string
  cpf: string 
  password: string
}

export const useRegisterPatient = () => {
  const { callRegisterPatientApi } = registerService()
  const navigate = useNavigate();

  const [registerFormValues, setRegisterPatientFormValues] = useState<IRegisterPatientFormValues>({
    fullName: '',
    email: '',
    cpf: '',
    password: '',
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
    await callRegisterPatientApi(registerFormValues) ? navigate('/') : alert('deu ruim camaradas')
    setIsLoading(false)

    //colocar o navigate, e salvar informações no redux/local storage/cookies
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
