import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Carrinho from "@/components/Carrinho";
import Catalogo from "@/components/Catalogo";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import TelaLogin from "@/components/TelaLogin";
import TelaProdutos from "@/components/TelasProdutos";

import { CarrinhoProvider } from "@/context/CarrinhoContext";
import { CatalogoProvider } from "@/context/CatalogoContext";

export default function Home() {
  const [logado, setLogado] = useState(false);

  if (!logado) {
    return <TelaLogin onLogin={() => setLogado(true)} />;
  }

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <CarrinhoProvider>
          <CatalogoProvider>
            <Sidebar />
            <main className=" flex-1 p-8 ml-64">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/produtos" element={<TelaProdutos />} />
                <Route path="/vendas" element={<Catalogo />} />
              </Routes>
            </main>

            <Carrinho />
          </CatalogoProvider>
        </CarrinhoProvider>
      </div>
    </BrowserRouter>
  );
}
