// components/HeaderAutenticado.js
"use client";

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function HeaderAutenticado() {
  const { logout } = useContext(AuthContext);

  return (
    <header className="bg-amber-300 text-white pl-14 flex justify-between items-center w-full">
      <div className="flex items-center space-x-8">
        <img
          src="/logo.png"
          alt="Logo Villa del Sol"
          className="h-20 w-20"
        />
        <span className="text-3xl font-bold">Villa del Sol</span>
      </div>

      <div className="flex items-center space-x-6 pr-14">
        <button
          onClick={logout}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 text-lg"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}