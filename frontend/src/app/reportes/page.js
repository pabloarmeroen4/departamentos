// app/generar-reportes/page.js
"use client";

import { useState } from 'react';
import HeaderAutenticado from '../../components/HeaderAut';

export default function GenerarReportes() {
  // Estado para almacenar los filtros del reporte
  const [filtros, setFiltros] = useState({
    tipoReporte: 'pagos', // Tipo de reporte predeterminado
    fechaInicio: '',
    fechaFin: '',
    estado: '',
  });

  // Estado para almacenar los resultados del reporte (simulado)
  const [resultados, setResultados] = useState([]);

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular la generación de un reporte
    const datosSimulados = [
      { id: 1, propietario: 'Juan Pérez', apartamento: '101', monto: 100, fecha: '2023-10-01', estado: 'Pagado' },
      { id: 2, propietario: 'Ana Gómez', apartamento: '202', monto: 150, fecha: '2023-10-05', estado: 'Pendiente' },
      { id: 3, propietario: 'Carlos López', apartamento: '303', monto: 200, fecha: '2023-10-10', estado: 'Atrasado' },
    ];

    setResultados(datosSimulados);
    alert('Reporte generado exitosamente (simulado).');
  };

  // Función para manejar la exportación del reporte
  const handleExportar = () => {
    alert('Reporte exportado exitosamente (simulado).');
  };

  return (
    <div>
      <HeaderAutenticado />

      {/* Sección de generación de reportes */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Generar Reportes
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipoReporte">
                Tipo de Reporte
              </label>
              <select
                id="tipoReporte"
                value={filtros.tipoReporte}
                onChange={(e) =>
                  setFiltros({ ...filtros, tipoReporte: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="pagos">Pagos</option>
                <option value="visitantes">Visitantes</option>
                <option value="propietarios">Propietarios</option>
                <option value="apartamentos">Apartamentos</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaInicio">
                Fecha de Inicio
              </label>
              <input
                type="date"
                id="fechaInicio"
                value={filtros.fechaInicio}
                onChange={(e) =>
                  setFiltros({ ...filtros, fechaInicio: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaFin">
                Fecha de Fin
              </label>
              <input
                type="date"
                id="fechaFin"
                value={filtros.fechaFin}
                onChange={(e) =>
                  setFiltros({ ...filtros, fechaFin: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                Estado
              </label>
              <select
                id="estado"
                value={filtros.estado}
                onChange={(e) =>
                  setFiltros({ ...filtros, estado: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Todos</option>
                <option value="Pagado">Pagado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Atrasado">Atrasado</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Generar Reporte
            </button>
          </form>
        </div>
      </section>

      {/* Sección de resultados del reporte */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Resultados del Reporte
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Propietario</th>
                  <th className="px-4 py-2 border-b">Apartamento</th>
                  <th className="px-4 py-2 border-b">Monto</th>
                  <th className="px-4 py-2 border-b">Fecha</th>
                  <th className="px-4 py-2 border-b">Estado</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((resultado) => (
                  <tr key={resultado.id}>
                    <td className="px-4 py-2 border-b">{resultado.propietario}</td>
                    <td className="px-4 py-2 border-b">{resultado.apartamento}</td>
                    <td className="px-4 py-2 border-b">${resultado.monto}</td>
                    <td className="px-4 py-2 border-b">{resultado.fecha}</td>
                    <td className="px-4 py-2 border-b">{resultado.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Botón para exportar el reporte */}
          <div className="mt-6 text-center">
            <button
              onClick={handleExportar}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Exportar Reporte
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}