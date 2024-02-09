import { useCallback, useState } from 'react'
import { loginService } from '../service/login'
import { ZodError, ZodIssueBase } from 'zod'
import Swal from 'sweetalert2'
import { loginSchema } from '../validation/login'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { setProfile } from '../../../redux/reducers/loginSlice'

export interface ILoginFormValues {
  email: string
  password: string
  stayConnected: boolean
}

export interface ILoginFormErrors {
  email: string
  password: string
}

export const useLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { callLoginApi } = loginService()
  const [loginFormErrors, setLoginFormErrors] = useState<ILoginFormErrors>({
    email: '',
    password: ''
  })
  const [loginFormValues, setLoginFormValues] = useState<ILoginFormValues>({
    email: '',
    password: '',
    stayConnected: false
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLoginFormChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value, checked } = event.target
      setLoginFormValues({
        ...loginFormValues,
        [name]: name === 'stayConnected' ? checked : value
      })

      setLoginFormErrors({
        ...loginFormErrors,
        [name]: ''
      })
    },
    [loginFormErrors, loginFormValues]
  )

  const handleLoginFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      setIsLoading(true)

      loginSchema.parse(loginFormValues)
      const response = await callLoginApi(loginFormValues)

      if (response) {
        dispatch(setProfile(response.profile))
        Cookies.set('accessToken', response.accessToken)

        if (loginFormValues.stayConnected)
          saveResponseDataInCookies(response.id, response.refreshToken)

        navigateAfterLogin(response.profile)
      } else {
        throw new Error()
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = JSON.parse(error.message)
        const updatedErrors = { ...loginFormErrors }

        errors.forEach((error: ZodIssueBase) => {
          const key = error.path[0] as keyof typeof loginFormErrors
          updatedErrors[key] = error.message ?? ''
        })

        setLoginFormErrors(updatedErrors)
      }

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Não foi possível logar na sua conta',
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

  const navigateAfterLogin = (profileType: string) => {
    profileType === 'Clinic'
      ? navigate('/clinic/my-appointments')
      : navigate('/patient/dashboard')
  }

  const saveResponseDataInCookies = (
    id: string,
    refreshToken: string
  ): void => {
    Cookies.set('id', id)
    Cookies.set('refreshToken', refreshToken)
  }

  return {
    loginFormValues,
    handleLoginFormChange,
    handleLoginFormSubmit,
    showPassword,
    handleShowPasswordButtonClick,
    isLoading,
    loginFormErrors
  }
}
