export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-x-hidden bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4">
      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-200 opacity-30 blur-2xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-300 opacity-30 blur-2xl" />
      </div>

      {/* Header/logo */}
      <header className="relative z-10 flex w-full flex-col items-center pt-24 pb-4">
        <div className="mb-4 flex justify-center">
          <img
            src="/logo.png"
            alt="Logo Envy Fertilidad"
            className="h-48 w-48 drop-shadow-lg sm:h-72 sm:w-72 md:h-96 md:w-96"
            width={384}
            height={384}
          />
        </div>

        <p className="mx-auto mb-4 max-w-2xl text-center text-base text-gray-700 sm:text-lg md:text-xl">
          Clínica especializada en fertilidad, acompañando a las familias en cada paso de su camino.
        </p>
        <a
          href="/login"
          className="to-blue-700from-blue-500 mt-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-blue-800"
        >
          Ingresar
        </a>
      </header>

      {/* Servicios */}
      <section className="relative z-10 mt-8 mb-12">
        <h2 className="mb-6 text-center text-xl font-bold text-blue-800 sm:text-2xl">
          Nuestros servicios
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex cursor-pointer flex-col items-center rounded-lg bg-white/80 p-6 shadow transition hover:bg-blue-50">
            <svg
              className="mb-2 h-10 w-10 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <h3 className="mb-1 font-semibold text-blue-700">Tratamientos de fertilidad</h3>
            <p className="text-center text-sm text-gray-600">
              FIV, ICSI, inseminación y más. Soluciones personalizadas para cada familia.
            </p>
          </div>
          <div className="flex cursor-pointer flex-col items-center rounded-lg bg-white/80 p-6 shadow transition hover:bg-blue-50">
            <svg
              className="mb-2 h-10 w-10 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 20v-2a6 6 0 0112 0v2"
              />
            </svg>
            <h3 className="mb-1 font-semibold text-blue-700">Equipo médico experto</h3>
            <p className="text-center text-sm text-gray-600">
              Profesionales con amplia experiencia y trato humano.
            </p>
          </div>
          <div className="flex cursor-pointer flex-col items-center rounded-lg bg-white/80 p-6 shadow transition hover:bg-blue-50">
            <svg
              className="mb-2 h-10 w-10 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 17l4 4 4-4m-4-5v9"
              />
            </svg>
            <h3 className="mb-1 font-semibold text-blue-700">Acompañamiento integral</h3>
            <p className="text-center text-sm text-gray-600">
              Apoyo emocional y seguimiento en todo el proceso.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
