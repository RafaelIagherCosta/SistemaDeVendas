"use client";

import { useState } from "react";

import Carrinho from "@/components/Carrinho";
import Catalogo from "@/components/Catalogo";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";

import { CarrinhoProvider } from "@/context/CarrinhoContext";
import { CatalogoProvider } from "@/context/CatalogoContext";
import TelaLogin from "@/components/TelaLogin";

export default function Home() {
  const [logado, setLogado] = useState(false);

  if (!logado) {
    return <TelaLogin onLogin={() => setLogado(true)} />;
  }

  return (
    <div className="bg-white">
      <CarrinhoProvider>
        <CatalogoProvider>
          <Dashboard />
          <Carrinho />
          <Catalogo />
          <Footer />
        </CatalogoProvider>
      </CarrinhoProvider>
    </div>
  );
}
