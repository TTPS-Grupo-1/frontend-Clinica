export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-blue-700 mb-4 text-center">
          Bienvenido a Envy Fertilidad
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-gray-700 mb-8 text-center">
          Somos una clínica especializada en fertilidad, acompañando a las familias en cada paso de su camino. Descubre nuestros servicios y conoce más sobre nuestro equipo.
        </p>
        <div className="flex justify-center">
          <a
            href="/login"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-center"
          >
            Ingresar
          </a>
        </div>
      </div>
    </div>
  );
}
