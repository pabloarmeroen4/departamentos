"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// 🔹 Configuración de Axios con manejo de errores
const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true, // Para incluir cookies en las peticiones
});

// Interceptores de solicitud y respuesta para depuración
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("❌ Error en la respuesta:", {
            status: error.response?.status,
            data: error.response?.data,
        });
        return Promise.reject(error);
    }
);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe estar dentro de AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const clearAuthState = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    // 🔹 Verificar token JWT
    const verifyToken = async () => {
        try {
            const response = await api.get("/verify");
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (err) {
            clearAuthState();
            console.error("Fallo en la verificación del token:", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Iniciar sesión
    const login = async (credentials) => {
        try {
            const response = await api.post("/login", credentials);
            if (response.data.usuario) {
                setUser(response.data.usuario);
                setIsAuthenticated(true);
                return { success: true, data: response.data.usuario };
            }
            throw new Error("No se recibió un usuario válido en la respuesta.");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Error al iniciar sesión.";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    // 🔹 Registrar usuario
    const registro = async (userData) => {
        try {
            const response = await api.post("/register", userData);
            if (response.data.usuario) {
                return await login({
                    cedula: userData.cedula,
                    contraseña: userData.contraseña,
                });
            }
            throw new Error("Error en el registro: respuesta inválida del servidor");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Error al registrar usuario.";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    // 🔹 Cerrar sesión
    const logout = async () => {
        try {
            await api.post("/logout");
            clearAuthState();
        } catch (err) {
            console.error("Error al cerrar sesión:", err.response?.data || err.message);
            clearAuthState();
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, loading, error, login, logout, registro, verifyToken }}
        >
            {children}
        </AuthContext.Provider>
    );
}
