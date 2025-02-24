// app/gestion-propietarios/page.js
"use client";

import { useState } from 'react';
import HeaderAutenticado from '../../components/HeaderAut';

export default function GestionPropietarios() {
  // Estado para almacenar los propietarios y apartamentos
  const [propietarios, setPropietarios] = useState([]);

  // Estado para el formulario de registro
  const [nuevoPropietario, setNuevoPropietario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    apartamento: '',
  });

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular el registro de un nuevo propietario
    setPropietarios([...propietarios, nuevoPropietario]);

    // Limpiar el formulario
    setNuevoPropietario({
      nombre: '',
      email: '',
      telefono: '',
      apartamento: '',
    });

    alert('Propietario registrado exitosamente (simulado).');
  };

  // Función para manejar la eliminación de un propietario
  const handleEliminar = (index) => {
    const nuevosPropietarios = propietarios.filter((_, i) => i !== index);
    setPropietarios(nuevosPropietarios);
    alert('Propietario eliminado exitosamente (simulado).');
  };

  return (
    <div>
      <HeaderAutenticado />

      {/* Sección de registro */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Registrar Nuevo Propietario
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                value={nuevoPropietario.nombre}
                onChange={(e) =>
                  setNuevoPropietario({ ...nuevoPropietario, nombre: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Nombre del propietario"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={nuevoPropietario.email}
                onChange={(e) =>
                  setNuevoPropietario({ ...nuevoPropietario, email: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Correo electrónico"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                value={nuevoPropietario.telefono}
                onChange={(e) =>
                  setNuevoPropietario({ ...nuevoPropietario, telefono: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Teléfono"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apartamento">
                Apartamento
              </label>
              <input
                type="text"
                id="apartamento"
                value={nuevoPropietario.apartamento}
                onChange={(e) =>
                  setNuevoPropietario({ ...nuevoPropietario, apartamento: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Número de apartamento"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Registrar Propietario
            </button>
          </form>
        </div>
      </section>

      {/* Sección de lista de propietarios */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Lista de Propietarios y Apartamentos
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Nombre</th>
                  <th className="px-4 py-2 border-b">Correo Electrónico</th>
                  <th className="px-4 py-2 border-b">Teléfono</th>
                  <th className="px-4 py-2 border-b">Apartamento</th>
                  <th className="px-4 py-2 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {propietarios.map((propietario, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{propietario.nombre}</td>
                    <td className="px-4 py-2 border-b">{propietario.email}</td>
                    <td className="px-4 py-2 border-b">{propietario.telefono}</td>
                    <td className="px-4 py-2 border-b">{propietario.apartamento}</td>
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