import { Header } from './header'
import planossaude from '../../../assets/planossaude.png'

export const Form = () => {
  return (
    <div className="p-10">
      <Header />
      <form className="mt-5">
        <label htmlFor="email" className="text-dark mb-2">
          E-mail
        </label>
        <input
          id="email"
          type="text"
          className="w-full bg-background border border-dark px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-3"
        />
        <label htmlFor="password" className="text-dark mb-2">
          Senha
        </label>
        <input
          id="password"
          type="password"
          className="w-full bg-background border border-dark px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-3"
        />
        <div className="flex items-center mt-2">
          <input
            id="inline-2-checkbox"
            type="checkbox"
            value=""
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
          <button className="underline text-primary">Cadastre-se</button>{' '}
        </h6>{' '}
        <div className="flex justify-center mt-7">
          <img src={planossaude} alt="" width={400} />
        </div>
      </form>
    </div>
  )
}
