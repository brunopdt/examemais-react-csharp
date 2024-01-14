import { useCallback, useState } from 'react'
import { registerService } from '../service/register'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { registerPatientSchema } from '../validation/register-patient'
import { ZodError, ZodIssueBase } from 'zod'

export interface IRegisterPatientFormValues {
  fullName: string
  email: string
  cpf: string
  password: string
}

interface IRegisterPatientFormErrors {
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
  const [registerFormErrors, setRegisterPatientFormErrors] =
    useState<IRegisterPatientFormErrors>({
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
      setRegisterPatientFormErrors({
        ...registerFormErrors,
        [name]: ''
      })
    },
    [registerFormErrors, registerFormValues]
  )

  const handleRegisterPatientFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      setIsLoading(true)

      await registerPatientSchema.parse(registerFormValues)

      const response = await callRegisterPatientApi(registerFormValues)

      if (!response) {
        throw new Error('Não foi possível cadastrar sua conta')
      }

      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Conta criada com sucesso!',
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/')
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = JSON.parse(error.message)
        const updatedErrors = { ...registerFormErrors }

        errors.forEach((error: ZodIssueBase) => {
          const key = error.path[0] as keyof typeof registerFormErrors
          updatedErrors[key] = error.message || ''
        })

        setRegisterPatientFormErrors(updatedErrors)
      }

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Não foi possível cadastrar sua conta',
        showConfirmButton: false,
        timer: 1500
      })
    } finally {
      setIsLoading(false)
    }
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
    isLoading,
    registerFormErrors
  }
}
