"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { authContext } from "./authContext";

const InformesContext = createContext();

export function InformesProvider({ children }) {
    const [informes, setInformes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(authContext);
    const [informesId, setInformesId] = useState([]);

    // 🔹 Obtener todos los informes
    const cargarInformes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/informes");
            const informesFormateados = response.data.map((informe) => ({
                id: informe.id,
                remitenteName: informe.emisor?.nombre || "Desconocido",
                remitenteRole: informe.emisor?.rol || "No definido",
                motivo: informe.motivo,
                descripcion: informe.descripcion,
                estado: informe.estado,
                fechaRegistro: informe.createdAt ? new Date(informe.createdAt) : null,
            })).sort((a, b) => b.fechaRegistro - a.fechaRegistro);

            setInformes(informesFormateados);
        } catch (error) {
            setError("Error al cargar los informes.");
            console.error("Error al obtener informes:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Agregar un informe
    const agregarInforme = async (nuevoInforme) => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3000/api/informes", {
                cargo: nuevoInforme.cargo,
                motivo: nuevoInforme.motivo,
                descripcion: nuevoInforme.descripcion,
                estado: nuevoInforme.estado,
                emisorId: nuevoInforme.emisorId
            });

            await cargarInformes();
            await cargarInformesId(nuevoInforme.emisorId);
            return { success: true, data: response.data };
        } catch (error) {
            setError(error.response?.data?.error || "Error al agregar el informe");
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Eliminar un informe
    const eliminarInforme = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:3000/api/informes/${id}`);
            await cargarInformes();
        } catch (error) {
            setError("Error al eliminar el informe.");
            console.error("Error al eliminar informe:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Actualizar el estado de un informe
    const actualizarEstadoInforme = async (id) => {
        try {
            await axios.patch(`http://localhost:3000/api/informes/${id}`, {
                estado: "leido",
            });

            setInformes((prevDatos) =>
                prevDatos.map((informe) =>
                    informe.id === id ? { ...informe, estado: "leido" } : informe
                )
            );
        } catch (error) {
            console.error("Error al actualizar el estado del informe:", error);
            throw new Error("Error al actualizar el estado del informe");
        }
    };

    // 🔹 Obtener informes por `emisorId`
    const cargarInformesId = async (id) => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/emisor/${id}`);
            const informesFormateados = response.data.map((informe) => ({
                id: informe.id,
                remitenteName: informe.emisor?.nombre || "Desconocido",
                remitenteRole: informe.emisor?.rol || "No definido",
                motivo: informe.motivo,
                descripcion: informe.descripcion,
                estado: informe.estado,
                fechaRegistro: informe.createdAt ? new Date(informe.createdAt) : null,
            })).sort((a, b) => b.fechaRegistro - a.fechaRegistro);

            setInformesId(informesFormateados);
        } catch (error) {
            setError("Error al cargar los informes del usuario.");
            console.error("Error al obtener informes por ID:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            cargarInformesId(user.id);
        }
    }, [user]);

    useEffect(() => {
        cargarInformes();
    }, []);

    const value = {
        informes,
        informesId,
        loading,
        error,
        agregarInforme,
        eliminarInforme,
        actualizarEstadoInforme,
    };

    return (
        <InformesContext.Provider value={value}>
            {children}
        </InformesContext.Provider>
    );
}

// 🔹 Hook para usar el contexto de informes
export function useInformes() {
    const context = useContext(InformesContext);
    if (!context) {
        throw new Error("useInformes debe estar dentro de InformesProvider");
    }
    return context;
}
