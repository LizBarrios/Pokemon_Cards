export default function Home() {
  return (
    <>
      <div className="p-5 text-xl text-white font-bold font-mono text-center">
        <h1>Bienvenido a la Pokédex</h1>
        <div className="pt-5">
          <img
            src="Designer.jpeg" 
            alt="Pikachu"
            className="mx-auto mt-5 shadow-[0_0_30px_#ff56d2] rounded-2lg w-64 h-64"
          />
        </div>
      </div>
      <div className="text-2xl text-white font-mono text-center">
        <h2>Created by Lizeth Barrios Retana 🌷</h2>
      </div>
    </>
  );
}
