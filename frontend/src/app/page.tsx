// app/page.js
"use client";

import Header from '../components/BarraLateral';

export default function Home() {
  return (
    <div>
      <Header />
      <section className="bg-blue-50 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            Bienvenido a Villas del Sol
          </h1>
          <p className="text-xl text-gray-700">
            Un proyecto de apartamentos de lujo que revitaliza el corazón de Mérida.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Nuestros Apartamentos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Apartamento 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Villas del Sol
              </h3>
              <p className="text-gray-700">
                Apartamentos innovadores diseñados para adaptarse a diferentes etapas de la vida.
              </p>
              <a
                href="#"
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Ver más
              </a>
            </div>

            {/* Apartamento 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Villas del Visual
              </h3>
              <p className="text-gray-700">
                Diseños únicos que combinan privacidad, seguridad y exclusividad.
              </p>
              <a
                href="#"
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Ver más
              </a>
            </div>

            {/* Apartamento 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Visita el sitio oficial
              </h3>
              <p className="text-gray-700">
                Descubre más sobre nuestros apartamentos y servicios.
              </p>
              <a
                href="#"
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Visitar
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-blue-900 text-white py-8 text-center">
        <p>&copy; 2023 Villas del Sol. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}