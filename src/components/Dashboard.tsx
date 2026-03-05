import { useContext } from "react";
import Card from "./Card";
import CatalogoContext from "@/context/CatalogoContext";
import CarrinhoContext from "@/context/CarrinhoContext";
import TelasProdutos from "./TelasProdutos";

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
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-black text-xl mb-8">Vendas</h2>
        </div>

        <button className="text-red-500 border border-red-500 px-4 py-2 rounded mt-6 hover:bg-red-50">
          Sair
        </button>
      </aside>

      <main className="flex-1 p-8">
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

        <section className="bg-white p-6 rounded shadow-md flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
            📦 Gerenciar Produtos
          </button>

          <button className="bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200 flex items-center gap-2">
            🏬 Ir para Loja
          </button>
        </section>

        <TelasProdutos produtosIniciais={produtos} />
      </main>
    </div>
  );
}
