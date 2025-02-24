// app/control-visitantes/page.js
"use client";

import { useState } from 'react';
import HeaderAutenticado from '../../components/HeaderAut';

export default function ControlVisitantes() {
  // Estado para almacenar los visitantes
  const [visitantes, setVisitantes] = useState([]);

  // Estado para el formulario de registro
  const [nuevoVisitante, setNuevoVisitante] = useState({
    nombre: '',
    documento: '',
    apartamento: '',
    fecha: '',
    hora: '',
  });

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular el registro de un nuevo visitante
    setVisitantes([...visitantes, nuevoVisitante]);

    // Limpiar el formulario
    setNuevoVisitante({
      nombre: '',
      documento: '',
      apartamento: '',
      fecha: '',
      hora: '',
    });

    alert('Visitante registrado exitosamente (simulado).');
  };

  // Función para manejar la eliminación de un visitante
  const handleEliminar = (index) => {
    const nuevosVisitantes = visitantes.filter((_, i) => i !== index);
    setVisitantes(nuevosVisitantes);
    alert('Visitante eliminado exitosamente (simulado).');
  };

  return (
    <div>
      <HeaderAutenticado />

      {/* Sección de registro */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Registrar Nuevo Visitante
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                value={nuevoVisitante.nombre}
                onChange={(e) =>
                  setNuevoVisitante({ ...nuevoVisitante, nombre: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Nombre del visitante"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="documento">
                Documento
              </label>
              <input
                type="text"
                id="documento"
                value={nuevoVisitante.documento}
                onChange={(e) =>
                  setNuevoVisitante({ ...nuevoVisitante, documento: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Número de documento"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apartamento">
                Apartamento
              </label>
              <input
                type="text"
                id="apartamento"
                value={nuevoVisitante.apartamento}
                onChange={(e) =>
                  setNuevoVisitante({ ...nuevoVisitante, apartamento: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Número de apartamento"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
                Fecha
              </label>
              <input
                type="date"
                id="fecha"
                value={nuevoVisitante.fecha}
                onChange={(e) =>
                  setNuevoVisitante({ ...nuevoVisitante, fecha: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hora">
                Hora
              </label>
              <input
                type="time"
                id="hora"
                value={nuevoVisitante.hora}
                onChange={(e) =>
                  setNuevoVisitante({ ...nuevoVisitante, hora: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Registrar Visitante
            </button>
          </form>
        </div>
      </section>

      {/* Sección de lista de visitantes */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Lista de Visitantes
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Nombre</th>
                  <th className="px-4 py-2 border-b">Documento</th>
                  <th className="px-4 py-2 border-b">Apartamento</th>
                  <th className="px-4 py-2 border-b">Fecha</th>
                  <th className="px-4 py-2 border-b">Hora</th>
                  <th className="px-4 py-2 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {visitantes.map((visitante, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{visitante.nombre}</td>
                    <td className="px-4 py-2 border-b">{visitante.documento}</td>
                    <td className="px-4 py-2 border-b">{visitante.apartamento}</td>
                    <td className="px-4 py-2 border-b">{visitante.fecha}</td>
                    <td className="px-4 py-2 border-b">{visitante.hora}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleEliminar(index)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}