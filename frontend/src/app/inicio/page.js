// app/inicio/page.js
"use client";

import HeaderAutenticado from '../../components/HeaderAut';
import Link from 'next/link';

export default function InicioAutenticado() {
  return (
    <div>
      <HeaderAutenticado />

      {/* Sección de acciones */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-blue-900 mb-8 text-center">
            Bienvenido al Panel de Control
          </h1>
          <p className="text-xl text-gray-700 mb-12 text-center">
            Selecciona una opción para comenzar.
          </p>

          {/* Tarjetas de acciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tarjeta 1: Registrar y gestionar propietarios y apartamentos */}
            <Link href="/gestion-propietarios">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  Gestionar Propietarios
                </h2>
                <p className="text-gray-700">
                  Registra y gestiona propietarios y apartamentos.
                </p>
              </div>
            </Link>

            {/* Tarjeta 2: Gestionar apartamentos */}
            <Link href="/gestion-apartamentos">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  Gestionar Apartamentos
                </h2>
                <p className="text-gray-700">
                  Registra y gestiona los apartamentos del complejo.
                </p>
              </div>
            </Link>

            {/* Tarjeta 3: Controlar el acceso de visitantes */}
            <Link href="/control-visitantes">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  Controlar Visitantes
                </h2>
                <p className="text-gray-700">
                  Gestiona el acceso de visitantes al complejo.
                </p>
              </div>
            </Link>

            {/* Tarjeta 4: Llevar un registro de pagos de cuotas de administración */}
            <Link href="/registro-pagos">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  Registro de Pagos
                </h2>
                <p className="text-gray-700">
                  Lleva un registro de las cuotas de administración.
                </p>
              </div>
            </Link>

            {/* Tarjeta 5: Generar reportes básicos */}
            <Link href="/reportes">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  Generar Reportes
                </h2>
                <p className="text-gray-700">
                  Genera reportes básicos sobre el funcionamiento del complejo.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}