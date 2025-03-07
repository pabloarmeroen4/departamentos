"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UsuariosContext = createContext();

export function UsuariosProvider({ children }) {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 Obtener todos los usuarios
    const cargarUsuarios = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/api/users");
            setUsuarios(response.data);
        } catch (error) {
            setError("Error al cargar los usuarios.");
            console.error("Error al obtener usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Agregar un usuario
    const agregarUsuario = async (nuevoUsuario) => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3000/api/users", {
                nombre: nuevoUsuario.nombre,
                cedula: nuevoUsuario.cedula,
                telefono: nuevoUsuario.telefono,
                username: nuevoUsuario.username,
                contraseña: nuevoUsuario.contraseña,
                rol: nuevoUsuario.rol,
            });

            await cargarUsuarios();
            return { success: true, data: response.data };
        } catch (error) {
            setError("Error al agregar el usuario.");
            console.error("Error:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Actualizar un usuario
    const actualizarUsuario = async (id, datosActualizados) => {
        try {
            setLoading(true);
            await axios.put(`http://localhost:3000/api/users/${id}`, {
                nombre: datosActualizados.nombre,
                cedula: datosActualizados.cedula,
                telefono: datosActualizados.telefono,
                username: datosActualizados.username,
                contraseña: datosActualizados.contraseña,
                rol: datosActualizados.rol,
            });

            await cargarUsuarios();
            return { success: true };
        } catch (error) {
            setError("Error al actualizar el usuario.");
            console.error("Error:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Eliminar un usuario
    const eliminarUsuario = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:3000/api/users/${id}`);
            await cargarUsuarios();
            return { success: true };
        } catch (error) {
            setError("Error al eliminar el usuario.");
            console.error("Error:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const value = {
        usuarios,
        loading,
        error,
        agregarUsuario,
        actualizarUsuario,
        eliminarUsuario,
    };

    return <UsuariosContext.Provider value={value}>{children}</UsuariosContext.Provider>;
}

// 🔹 Hook para usar el contexto de usuarios
export function useUsuarios() {
    const context = useContext(UsuariosContext);
    if (!context) {
        throw new Error("useUsuarios debe estar dentro de UsuariosProvider");
    }
    return context;
}
