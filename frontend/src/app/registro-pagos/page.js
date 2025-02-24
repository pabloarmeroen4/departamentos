// app/registro-pagos/page.js
"use client";

import { useState } from 'react';
import HeaderAutenticado from '../../components/HeaderAut';

export default function RegistroPagos() {
  // Estado para almacenar los pagos
  const [pagos, setPagos] = useState([]);

  // Estado para el formulario de registro
  const [nuevoPago, setNuevoPago] = useState({
    propietario: '',
    apartamento: '',
    monto: '',
    fecha: '',
    estado: 'Pendiente', // Estado predeterminado
  });

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular el registro de un nuevo pago
    setPagos([...pagos, nuevoPago]);

    // Limpiar el formulario
    setNuevoPago({
      propietario: '',
      apartamento: '',
      monto: '',
      fecha: '',
      estado: 'Pendiente',
    });

    alert('Pago registrado exitosamente (simulado).');
  };

  // Función para manejar la eliminación de un pago
  const handleEliminar = (index) => {
    const nuevosPagos = pagos.filter((_, i) => i !== index);
    setPagos(nuevosPagos);
    alert('Pago eliminado exitosamente (simulado).');
  };

  return (
    <div>
      <HeaderAutenticado />

      {/* Sección de registro */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Registrar Nuevo Pago
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propietario">
                Propietario
              </label>
              <input
                type="text"
                id="propietario"
                value={nuevoPago.propietario}
                onChange={(e) =>
                  setNuevoPago({ ...nuevoPago, propietario: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Nombre del propietario"
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
                value={nuevoPago.apartamento}
                onChange={(e) =>
                  setNuevoPago({ ...nuevoPago, apartamento: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Número de apartamento"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monto">
                Monto
              </label>
              <input
                type="number"
                id="monto"
                value={nuevoPago.monto}
                onChange={(e) =>
                  setNuevoPago({ ...nuevoPago, monto: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Monto del pago"
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
                value={nuevoPago.fecha}
                onChange={(e) =>
                  setNuevoPago({ ...nuevoPago, fecha: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                Estado
              </label>
              <select
                id="estado"
                value={nuevoPago.estado}
                onChange={(e) =>
                  setNuevoPago({ ...nuevoPago, estado: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Pagado">Pagado</option>
                <option value="Atrasado">Atrasado</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Registrar Pago
            </button>
          </form>
        </div>
      </section>

      {/* Sección de lista de pagos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Lista de Pagos
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
                  <th className="px-4 py-2 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pagos.map((pago, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{pago.propietario}</td>
                    <td className="px-4 py-2 border-b">{pago.apartamento}</td>
                    <td className="px-4 py-2 border-b">${pago.monto}</td>
                    <td className="px-4 py-2 border-b">{pago.fecha}</td>
                    <td className="px-4 py-2 border-b">{pago.estado}</td>
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