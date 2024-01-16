import { useCallback, useState } from 'react'
import { registerService } from '../service/register'
import { useNavigate } from 'react-router-dom'
import { registerClinicSchema } from '../validation/register-clinic'
import Swal from 'sweetalert2'
import { ZodError, ZodIssueBase } from 'zod'

export interface IRegisterClinicFormValues {
  clinicName: string
  address: string
  cnpj: string
  email: string
  password: string
}

interface IRegisterClinicFormErrors {
  clinicName: string
  address: string
  cnpj: string
  email: string
  password: string
}


export const useRegisterClinic = () => {
  const { callRegisterClinicApi } = registerService()
  const navigate = useNavigate()

  const [registerFormErrors, setRegisterClinicFormErrors] =
    useState<IRegisterClinicFormErrors>({
      clinicName: '',
      address: '',
      email: '',
      cnpj: '',
      password: ''
    })
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
    try {
      setIsLoading(true)

      await registerClinicSchema.parse(registerFormValues)

      const response = await callRegisterClinicApi(registerFormValues)

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
    } catch(error) {

      if (error instanceof ZodError) {
        const errors = JSON.parse(error.message)
        const updatedErrors = { ...registerFormErrors }

        errors.forEach((error: ZodIssueBase) => {
          const key = error.path[0] as keyof typeof registerFormErrors
          updatedErrors[key] = error.message || ''
        })

        setRegisterClinicFormErrors(updatedErrors)
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
    handleRegisterClinicFormChange,
    handleRegisterClinicFormSubmit,
    showPassword,
    handleShowPasswordButtonClick,
    isLoading,
    registerFormErrors
  }
}
