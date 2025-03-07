"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const VisitaContext = createContext();

export function VisitaProvider({ children }) {
    const [visitas, setVisitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 Obtener todas las visitas
    const cargarVisitantes = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/api/visitante");

            const visitasFormateadas = response.data
                .map(visita => ({
                    id: visita.id,
                    nombre: visita.nombre,
                    apartamento: visita.apartamento?.numApt,
                    torre: visita.apartamento?.torre,
                    cedula: visita.cedula,
                    fechaIngreso: visita.fechaHoraIngreso ? new Date(visita.fechaHoraIngreso).toLocaleString("es-CO") : "Sin registro",
                    fechaSalida: visita.fechaHoraSalida ? new Date(visita.fechaHoraSalida).toLocaleString("es-CO") : "Sin registro",
                    estado: visita.estado
                }))
                .sort((a, b) => (a.fechaIngreso && b.fechaIngreso) ? b.fechaIngreso - a.fechaIngreso : a.fechaIngreso ? -1 : 1);

            setVisitas(visitasFormateadas);
        } catch (error) {
            setError("Error al cargar los visitantes.");
            console.error("Error al obtener visitantes:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Agregar una visita
    const agregarVisita = async (nuevaVisita) => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3000/api/visitante", {
                nombre: nuevaVisita.nombre,
                cedula: nuevaVisita.cedula,
                fechaHoraIngreso: nuevaVisita.fechaHoraIngreso,
                fechaHoraSalida: nuevaVisita.fechaHoraSalida,
                apartamentoId: nuevaVisita.apartamentoId
            });

            await cargarVisitantes();
            return { success: true, data: response.data };
        } catch (error) {
            setError("Error al agregar el visitante.");
            console.error("Error:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Actualizar una visita
    const actualizarVisita = async (id, datosActualizados) => {
        try {
            setLoading(true);
            await axios.put(`http://localhost:3000/api/visitante/${id}`, {
                nombre: datosActualizados.nombre,
                cedula: datosActualizados.cedula,
                fechaHoraIngreso: datosActualizados.fechaHoraIngreso,
                fechaHoraSalida: datosActualizados.fechaHoraSalida,
                estado: datosActualizados.estado,
                apartamentoId: datosActualizados.apartamentoId,
            });

            await cargarVisitantes();
            return { success: true };
        } catch (error) {
            setError("Error al actualizar la visita.");
            console.error("Error:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Eliminar una visita
    const eliminarVisita = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:3000/api/visitante/${id}`);
            await cargarVisitantes();
            return { success: true };
        } catch (error) {
            setError("Error al eliminar la visita.");
            console.error("Error:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarVisitantes();
    }, []);

    const value = {
        visitas,
        loading,
        error,
        agregarVisita,
        actualizarVisita,
        eliminarVisita,
    };

    return <VisitaContext.Provider value={value}>{children}</VisitaContext.Provider>;
}

// 🔹 Hook para usar el contexto de visitas
export function useVisita() {
    const context = useContext(VisitaContext);
    if (!context) {
        throw new Error("useVisita debe estar dentro de VisitaProvider");
    }
    return context;
}
