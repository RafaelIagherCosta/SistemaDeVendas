import { useContext } from "react";
import Card from "./Card";

import CatalogoContext from "@/context/CatalogoContext";
import CarrinhoContext from "@/context/CarrinhoContext";

export default function Dashboard() {
  const { produtos } = useContext(CatalogoContext);
  const { vendas } = useContext(CarrinhoContext);

  const totalProdutos = produtos.length;
  const totalVendas = vendas.length;

  const totalReceita = vendas.reduce((total, valorVenda) => {
    return total + valorVenda;
  }, 0);

  const receitaFormatada = totalReceita.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-500">Visão geral do seu sistema de vendas</p>
      </header>

      <section className="grid grid-cols-3 gap-6 mb-8">
        <Card
          title="Total de Produtos"
          value={totalProdutos}
          subtitle="Produtos cadastrados"
          color="blue"
          icon="📦"
        />

        <Card
          title="Total de Vendas"
          value={totalVendas}
          subtitle="Vendas realizadas"
          color="green"
          icon="🛒"
        />

        <Card
          title="Valor Total Vendido"
          value={receitaFormatada}
          subtitle="Receita total"
          color="yellow"
          icon="💰"
        />
      </section>
    </>
  );
}
