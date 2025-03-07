"use client";
import Header from "@/app/components/Header";
import BarraLateral from "@/app/components/BarraLateral";
import { useState } from "react";
import { PropietariosProvider } from '@/app/context/PropietarioContext';
import { PagoProvider } from '@/app/context/PagoContext';
import { UserProvider } from "@/app/context/UserContext";
import { ApartamentoProvider } from "@/app/context/ApartamentosContext";
import { VisitaProvider } from "@/app/context/VisitaContext";
import { InformesProvider } from "@/app/context/InformesContext";

export default function AdminLayout({ children }) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    return (
        <div className="h-screen w-full">
            {/* Header */}
            <Header onToggle={toggleVisible} />

            {/* Contenido principal */}
            <main className="relative flex h-[88%]">
                {/* Barra lateral */}
                <div
                    className={`absolute md:w-1/5 top-0 left-0 h-full transform transition-transform md:relative md:translate-x-0 ${isVisible ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <BarraLateral />
                </div>

                {/* Contenedor principal */}
                <div className="flex-1 h-full">
                    <ApartamentoProvider>
                        <PropietariosProvider>
                            <PagoProvider>
                                <VisitaProvider>
                                    <InformesProvider>
                                        <UserProvider>
                                            {children}
                                        </UserProvider>
                                    </InformesProvider>
                                </VisitaProvider>
                            </PagoProvider>
                        </PropietariosProvider>
                    </ApartamentoProvider>
                </div>
            </main>
        </div>
    );
}