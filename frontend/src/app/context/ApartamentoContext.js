"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ApartamentoContext = createContext();

export function ApartamentoProvider({ children }) {
    const [apartamentos, setApartamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 Función para obtener apartamentos del backend
    const cargarApartamentos = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/apartamentos');
            const apartamentosFormateados = response.data.map(apto => ({
                id: apto.id,
                numApt: apto.numApt,
                torre: apto.torre,
                estado: apto.estado,
                propietario: apto.propietario?.nombre || 'Sin asignar',
                propietarioId: apto.propietarioId
            }));
            setApartamentos(apartamentosFormateados);
        } catch (err) {
            setError('Error al cargar los apartamentos');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Función para actualizar un apartamento
    const actualizarApartamento = async (datos) => {
        try {
            setLoading(true);
            await axios.put(`http://localhost:3000/api/apartamentos/${datos.id}`, {
                numApt: datos.numApt,
                torre: datos.torre,
                estado: datos.estado,
                propietarioId: datos.propietarioId
            });
            await cargarApartamentos();
            return { success: true };
        } catch (error) {
            setError('Error al actualizar el apartamento');
            console.error('Error:', error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Función para eliminar un apartamento
    const eliminarApartamento = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:3000/api/apartamentos/${id}`);
            await cargarApartamentos();
            return { success: true };
        } catch (error) {
            setError('Error al eliminar el apartamento');
            console.error('Error:', error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarApartamentos();
    }, []);

    const value = {
        apartamentos,
        loading,
        error,
        actualizarApartamento,
        eliminarApartamento
    };

    return (
        <ApartamentoContext.Provider value={value}>{children}</ApartamentoContext.Provider>
    );
}

// 🔹 Hook para usar el contexto de apartamentos
export function useApartamentos() {
    const context = useContext(ApartamentoContext);
    if (!context) {
        throw new Error('useApartamentos debe ser usado dentro de ApartamentoProvider');
    }
    return context;
}
