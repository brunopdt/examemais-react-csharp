import { useNavigate } from 'react-router-dom'

interface ActivePageProps {
  page: 'Paciente' | 'Clinica'
}

export const ActivePage = ({ page }: ActivePageProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-around gap-3 my-10">
      <button
        className={`bg-dark font-bold py-2 px-4 rounded mt-5 w-full text-background drop-shadow-2xl hover:bg-primary transition-all ${
          page === 'Paciente' ? 'scale-105' : 'scale-90'
        }`}
        onClick={() => navigate('/register/patient')}
      >
        Paciente
      </button>
      <button
        className={`bg-dark font-bold py-2 px-4 rounded mt-5 w-full text-background drop-shadow-2xl hover:bg-primary transition-all ${
          page === 'Clinica' ? 'scale-105' : 'scale-90'
        }`}
        onClick={() => navigate('/register/clinic')}
      >
        Clínica
      </button>
    </div>
  )
}
