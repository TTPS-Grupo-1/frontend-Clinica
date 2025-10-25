export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 overflow-x-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-30 blur-2xl" />
      </div>

      {/* Header/logo */}
  <header className="w-full pt-24 pb-4 flex flex-col items-center z-10 relative">
        <div className="mb-4 flex justify-center">
          <svg className="w-16 h-16 text-blue-600 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 2" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 mb-2 text-center tracking-tight drop-shadow-lg">Envy Fertilidad</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 text-center max-w-2xl mx-auto">
          Clínica especializada en fertilidad, acompañando a las familias en cada paso de su camino.
        </p>
        <a
          href="/login"
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700from-blue-500 to-blue-700 text-white rounded-xl shadow-lg hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all duration-200 font-semibold text-lg mt-2"
        >
          Ingresar
        </a>
      </header>

      {/* Servicios */}
      <section className="z-10 relative mt-8 mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-800 text-center mb-6">Nuestros servicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/80 rounded-lg shadow p-6 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition">
            <svg className="w-10 h-10 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <h3 className="font-semibold text-blue-700 mb-1">Tratamientos de fertilidad</h3>
            <p className="text-gray-600 text-sm text-center">FIV, ICSI, inseminación y más. Soluciones personalizadas para cada familia.</p>
          </div>
          <div className="bg-white/80 rounded-lg shadow p-6 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition">
            <svg className="w-10 h-10 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 20v-2a6 6 0 0112 0v2" />
            </svg>
            <h3 className="font-semibold text-blue-700 mb-1">Equipo médico experto</h3>
            <p className="text-gray-600 text-sm text-center">Profesionales con amplia experiencia y trato humano.</p>
          </div>
          <div className="bg-white/80 rounded-lg shadow p-6 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition">
            <svg className="w-10 h-10 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17l4 4 4-4m-4-5v9" />
            </svg>
            <h3 className="font-semibold text-blue-700 mb-1">Acompañamiento integral</h3>
            <p className="text-gray-600 text-sm text-center">Apoyo emocional y seguimiento en todo el proceso.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
