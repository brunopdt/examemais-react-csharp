import examemais from '../../../assets/examemais.png';

export const Header = () => {
  return (
    <div className='flex items-center w-full'>
      <img src={examemais} alt="Logo" width={70} />
      <h1 className="text-dark font-extrabold text-4xl font-sans text-center w-full">Faça login</h1>
    </div>
  )
}