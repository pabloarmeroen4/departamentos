"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const PagoContext = createContext();

export function PagoProvider({ children }) {
    const [pagos, setPagos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 Obtener todos los pagos
    const cargarPagos = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/api/pago");
            const pagosFormateados = response.data.map((pago) => ({
                id: pago.id,
                nombrePropietario: pago.propietario?.nombre ?? "Nombre desconocido",
                numeroApto: pago.apartamento?.numApt,
                torre: pago.apartamento?.torre,
                monto: pago.monto,
                fechaVencimiento: pago.fechaVencimiento ? new Date(pago.fechaVencimiento).toLocaleDateString("es-CO") : "Sin fecha",
                estado: pago.estado,
            }));

            setPagos(pagosFormateados);
        } catch (error) {
            setError("Error al cargar los pagos.");
            console.error("Error al obtener pagos:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Agregar un pago
    const agregarPago = async (nuevoPago) => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3000/api/pago", {
                monto: nuevoPago.monto,
                fechaVencimiento: nuevoPago.fechaVencimiento,
                estado: nuevoPago.estado,
                propietarioId: nuevoPago.propietarioId,
                apartamentoId: nuevoPago.apartamentoId,
            });

            await cargarPagos();
            return { success: true, data: response.data };
        } catch (error) {
            setError("Error al agregar el pago.");
            console.error("Error:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Actualizar un pago
    const actualizarPago = async (id, datosActualizados) => {
        try {
            setLoading(true);
            await axios.put(`http://localhost:3000/api/pago/${id}`, {
                monto: datosActualizados.monto,
                fechaVencimiento: datosActualizados.fechaVencimiento,
                estado: datosActualizados.estado,
                propietarioId: datosActualizados.propietarioId,
                apartamentoId: datosActualizados.apartamentoId,
            });

            await cargarPagos();
            return { success: true };
        } catch (error) {
            setError("Error al actualizar el pago.");
            console.error("Error:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Eliminar un pago
    const eliminarPago = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:3000/api/pago/${id}`);
            await cargarPagos();
            return { success: true };
        } catch (error) {
            setError("Error al eliminar el pago.");
            console.error("Error:", error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarPagos();
    }, []);

    const value = {
        pagos,
        loading,
        error,
        agregarPago,
        actualizarPago,
        eliminarPago,
    };

    return <PagoContext.Provider value={value}>{children}</PagoContext.Provider>;
}

// 🔹 Hook para usar el contexto de pagos
export function usePagos() {
    const context = useContext(PagoContext);
    if (!context) {
        throw new Error("usePagos debe estar dentro de PagoProvider");
    }
    return context;
}
