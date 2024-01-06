import { useCallback, useState } from 'react'
import { loginService } from '../service/login'

export interface ILoginFormValues {
  email: string
  password: string
  stayConnected: boolean
}

export const useLogin = () => {
  const { callLoginApi } = loginService()

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
    },
    [loginFormValues]
  )

  const handleLoginFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    setIsLoading(true)
    await callLoginApi(loginFormValues)
    setIsLoading(false)

    //colocar o navigate, e salvar informações no redux/local storage/cookies
  }

  const handleShowPasswordButtonClick = useCallback(() => {
    setShowPassword(!showPassword)
  }, [showPassword])

  return {
    loginFormValues,
    handleLoginFormChange,
    handleLoginFormSubmit,
    showPassword,
    handleShowPasswordButtonClick,
    isLoading
  }
}
