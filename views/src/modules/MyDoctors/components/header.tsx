import examemais from "../../../assets/examemais.png";

export const Header = () => {
  return (
    <header className="flex items-center w-full px-8 py-4 border-b-2 border-dark">
      <img className="w-14 mr-5" src={examemais} />
      <h1 className="text-dark font-bold text-2xl">Exame+</h1>
      <nav className="flex items-center w-50 space-x-5">
        <button className="text-light font-bold bg-dark h-8 w-40 rounded-md ml-20">
          Home
        </button>
        <button className="text-light font-bold bg-dark h-8 w-40 rounded-md">
          Médicos
        </button>
      </nav>
      <span className="ml-auto text-primary font-bold">Conectado como: bruninho odontologias</span>
    </header>
  );
};
