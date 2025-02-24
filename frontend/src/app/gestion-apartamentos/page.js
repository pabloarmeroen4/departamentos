// app/gestion-apartamentos/page.js
"use client";

import { useState } from 'react';
import HeaderAutenticado from '../../components/HeaderAut';

export default function GestionApartamentos() {
  // Estado para almacenar los apartamentos
  const [apartamentos, setApartamentos] = useState([]);

  // Estado para el formulario de registro
  const [nuevoApartamento, setNuevoApartamento] = useState({
    numero: '',
    torre: '',
    propietario: '',
    estado: 'Disponible', // Estado predeterminado
  });

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular el registro de un nuevo apartamento
    setApartamentos([...apartamentos, nuevoApartamento]);

    // Limpiar el formulario
    setNuevoApartamento({
      numero: '',
      torre: '',
      propietario: '',
      estado: 'Disponible',
    });

    alert('Apartamento registrado exitosamente (simulado).');
  };

  // Función para manejar la eliminación de un apartamento
  const handleEliminar = (index) => {
    const nuevosApartamentos = apartamentos.filter((_, i) => i !== index);
    setApartamentos(nuevosApartamentos);
    alert('Apartamento eliminado exitosamente (simulado).');
  };

  return (
    <div>
      <HeaderAutenticado />

      {/* Sección de registro */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Registrar Nuevo Apartamento
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numero">
                Número de Apartamento
              </label>
              <input
                type="text"
                id="numero"
                value={nuevoApartamento.numero}
                onChange={(e) =>
                  setNuevoApartamento({ ...nuevoApartamento, numero: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Número de apartamento"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="torre">
                Torre
              </label>
              <input
                type="text"
                id="torre"
                value={nuevoApartamento.torre}
                onChange={(e) =>
                  setNuevoApartamento({ ...nuevoApartamento, torre: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Torre"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propietario">
                Propietario
              </label>
              <input
                type="text"
                id="propietario"
                value={nuevoApartamento.propietario}
                onChange={(e) =>
                  setNuevoApartamento({ ...nuevoApartamento, propietario: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Nombre del propietario"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                Estado
              </label>
              <select
                id="estado"
                value={nuevoApartamento.estado}
                onChange={(e) =>
                  setNuevoApartamento({ ...nuevoApartamento, estado: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Disponible">Disponible</option>
                <option value="Ocupado">Ocupado</option>
                <option value="En Mantenimiento">En Mantenimiento</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Registrar Apartamento
            </button>
          </form>
        </div>
      </section>

      {/* Sección de lista de apartamentos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Lista de Apartamentos
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Número</th>
                  <th className="px-4 py-2 border-b">Torre</th>
                  <th className="px-4 py-2 border-b">Propietario</th>
                  <th className="px-4 py-2 border-b">Estado</th>
                  <th className="px-4 py-2 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {apartamentos.map((apartamento, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{apartamento.numero}</td>
                    <td className="px-4 py-2 border-b">{apartamento.torre}</td>
                    <td className="px-4 py-2 border-b">{apartamento.propietario}</td>
                    <td className="px-4 py-2 border-b">{apartamento.estado}</td>
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