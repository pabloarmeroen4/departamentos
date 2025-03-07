"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const PropietariosContext = createContext();

export function PropietariosProvider({ children }) {
    const [propietarios, setPropietarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 Obtener todos los propietarios
    const cargarPropietarios = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/api/propietarios");
            const propietariosFormateados = response.data.map((propietario) => ({
                id: propietario.propietarioId,
                nombre: propietario.nombre,
                bloque: propietario.apartamentoBloque,
                apartamento: propietario.apartamentoNumero,
                apartamentoId: propietario.apartamentoId,
                cedula: propietario.cedula,
                telefono: propietario.telefono,
                estadoPago: propietario.estadoPago,
                fechaRegistro: propietario.propietarioCreado ? new Date(propietario.propietarioCreado).toLocaleDateString("es-CO") : "Sin fecha",
            }));

            setPropietarios(propietariosFormateados);
        } catch (error) {
            setError("Error al cargar los propietarios.");
            console.error("Error al obtener propietarios:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Agregar un propietario
    const agregarPropietario = async (nuevoPropietario) => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3000/api/propietarios", {
                nombre: nuevoPropietario.nombre,
                cedula: nuevoPropietario.cedula,
                telefono: nuevoPropietario.telefono,
                apartamentoId: nuevoPropietario.apartamentoId,
            });

            await cargarPropietarios();
            return { success: true, data: response.data };
        } catch (error) {
            setError("Error al agregar el propietario.");
            console.error("Error:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Actualizar un propietario
    const actualizarPropietario = async (id, datosActualizados) => {
        try {
            setLoading(true);
            await axios.put(`http://localhost:3000/api/propietarios/${id}`, {
                nombre: datosActualizados.nombre,
                cedula: datosActualizados.cedula,
                telefono: datosActualizados.telefono,
                apartamentoId: datosActualizados.apartamentoId,
            });

            await cargarPropietarios();
            return { success: true };
        } catch (error) {
            setError("Error al actualizar el propietario.");
            console.error("Error:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Eliminar un propietario
    const eliminarPropietario = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:3000/api/propietarios/${id}`);
            await cargarPropietarios();
            return { success: true };
        } catch (error) {
            setError("Error al eliminar el propietario.");
            console.error("Error:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarPropietarios();
    }, []);

    const value = {
        propietarios,
        loading,
        error,
        agregarPropietario,
        actualizarPropietario,
        eliminarPropietario,
    };

    return <PropietariosContext.Provider value={value}>{children}</PropietariosContext.Provider>;
}

// 🔹 Hook para usar el contexto de propietarios
export function usePropietarios() {
    const context = useContext(PropietariosContext);
    if (!context) {
        throw new Error("usePropietarios debe estar dentro de PropietariosProvider");
    }
    return context;
}
