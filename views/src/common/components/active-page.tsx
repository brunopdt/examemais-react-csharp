import { useNavigate } from 'react-router-dom'

interface ActivePageProps {
  page: 'Paciente' | 'Clinica'
}

export const ActivePage = ({ page }: ActivePageProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-around gap-5 my-10">
      <a
        onClick={() => navigate('/register/patient')}
        className={`group text-dark transition duration-300 cursor-pointer font-bold py-2 mt-5 w-full`}
      >
        Paciente
        <span
          className={`block max-w-0 ${
            page === 'Paciente' ? 'max-w-full' : 'group-hover:max-w-full'
          } transition-all duration-500 h-0.5 bg-primary`}
        ></span>
      </a>
      <a
        onClick={() => navigate('/register/clinic')}
        className={`group text-dark transition duration-300 cursor-pointer font-bold py-2 mt-5 w-full`}
      >
        Clínica
        <span
          className={`block max-w-0 ${
            page === 'Clinica' ? 'max-w-full' : 'group-hover:max-w-full'
          } transition-all duration-500 h-0.5 bg-primary`}
        ></span>
      </a>
    </div>
  )
}
