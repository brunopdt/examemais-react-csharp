import { Header } from './header'
import planossaude from '../../../assets/planossaude.png'
import { useLogin } from '../hooks/use-login'
import { LoadingScreen } from '../../../common/components/loading-screen'
import { Textfield } from '../../../common/components/textfield'
import { useNavigate } from 'react-router-dom'

export const Form = () => {
  const navigate = useNavigate()
  const {
    loginFormValues,
    handleLoginFormChange,
    handleLoginFormSubmit,
    showPassword,
    handleShowPasswordButtonClick,
    isLoading,
    loginFormErrors
  } = useLogin()

  return (
    <div className="p-10">
      <LoadingScreen isOpen={isLoading} />
      <Header />
      <form className="mt-5" onSubmit={handleLoginFormSubmit}>
        <Textfield
          label="E-mail"
          name="email"
          value={loginFormValues.email}
          onChange={handleLoginFormChange}
          error={loginFormErrors.email}
        />
        <div className="relative">
          <Textfield
            label="Senha"
            name="password"
            value={loginFormValues.password}
            onChange={handleLoginFormChange}
            type={`${showPassword ? 'text' : 'password'}`}
            error={loginFormErrors.password}
          />
          <div className="absolute right-3 top-10 transform -translate-y-1/4 flex items-center text-sm">
            <svg
              className={`h-6 text-gray-700 ${
                showPassword ? 'hidden' : 'block'
              } fill-current text-dark`}
              fill="none"
              onClick={handleShowPasswordButtonClick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
              />
            </svg>

            <svg
              className={`h-6 text-gray-700 ${
                showPassword ? 'block' : 'hidden'
              } fill-current text-dark`}
              fill="none"
              onClick={handleShowPasswordButtonClick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07a32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <input
            id="inline-2-checkbox"
            type="checkbox"
            name="stayConnected"
            checked={loginFormValues.stayConnected}
            onChange={handleLoginFormChange}
            className="w-4 h-4 text-red-500 border-primary rounded focus:ring-blue-500"
          />
          <label htmlFor="inline-2-checkbox" className="text-dark ml-3">
            Continuar conectado
          </label>
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-blue-700 font-bold py-2 px-4 rounded mt-5 w-full text-background drop-shadow-2xl"
        >
          ENTRAR
        </button>
        <h6 className="font-bold mt-2">
          Ainda não possui conta?{' '}
          <button
            onClick={() => navigate('/register/patient')}
            className="underline text-primary"
          >
            Cadastre-se
          </button>{' '}
        </h6>{' '}
        <div className="flex justify-center mt-7">
          <img src={planossaude} alt="" width={400} />
        </div>
      </form>
    </div>
  )
}
