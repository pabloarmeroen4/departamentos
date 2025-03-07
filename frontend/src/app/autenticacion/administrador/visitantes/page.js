"use client";

import React, { useEffect, useState, useMemo } from "react";
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function Page() {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Función para obtener visitantes desde el backend
  const fetchVisitas = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/visitante");
      if (!response.ok) throw new Error("Error al obtener visitantes");
      const data = await response.json();
      setVisitas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Llamar a fetchVisitas cuando el componente se monta
  useEffect(() => {
    fetchVisitas();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filterVisitas = useMemo(() => {
    if (!searchQuery) return visitas;
    const lowercaseQuery = searchQuery.toLowerCase().trim();
    return visitas.filter(visita =>
      (visita.nombre || "").toLowerCase().includes(lowercaseQuery) ||
      (visita.cedula || "").toLowerCase().includes(lowercaseQuery) ||
      (visita.fechaHoraIngreso || "").toLowerCase().includes(lowercaseQuery) ||
      (visita.estado || "").toLowerCase().includes(lowercaseQuery)
    );
  }, [visitas, searchQuery]);

  const currentItems = filterVisitas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterVisitas.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full gap-3">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 78, color: '#d80909' }} spin />} />
        <p className="text-rojo">Cargando Visitantes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col justify-center items-center p-6 rounded-lg bg-red-600 text-white max-w-sm text-center">
          <CloseOutlined style={{ fontSize: 78, marginBottom: 16 }} />
          <div className="text-lg font-semibold">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-2 py-2 h-full">
      <div className="flex justify-end items-center h-[5%] w-full pt-2">
        <div className="relative w-full md:w-1/3 flex items-center">
          <input
            type="text"
            placeholder="Buscar visitantes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-3 pl-10 py-2 border border-zinc-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
      </div>
      <div className="overflow-x-auto w-full h-[95%] flex flex-col justify-between">
        <div className="mt-4 bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-zinc-800 text-white text-xs uppercase">
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Cedula</th>
                <th className="px-4 py-3 text-left">Ingreso</th>
                <th className="px-4 py-3 text-left">Salida</th>
                <th className="px-4 py-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{item.nombre}</td>
                  <td className="px-4 py-2">{item.cedula}</td>
                  <td className="px-4 py-2">{item.fechaHoraIngreso}</td>
                  <td className="px-4 py-2">{item.fechaHoraSalida || "Pendiente"}</td>
                  <td className="px-4 py-2 text-center">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.estado === "terminado" ? "bg-gray-200 text-gray-800" : "bg-red-200 text-red-800"}`}>
                      {item.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center space-x-1">
          {getPageNumbers().map((number) => (
            <button key={number} onClick={() => paginate(number)} className={`px-4 py-1 rounded-md ${number === currentPage ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-300'}`}>
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
