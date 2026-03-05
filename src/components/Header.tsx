import { useContext } from "react";
import CarrinhoContext from "@/context/CarrinhoContext";

export default function Header() {
  const { abrirCarrinho, itens } = useContext(CarrinhoContext);

  const totalItensCarrinho = itens.reduce((total, item) => {
    return total + item.quantidade;
  }, 0);

  return (
    <header className="w-full flex justify-between items-center p-6 border-b bg-white">
      <h1 className="text-2xl font-bold">Minha Loja</h1>

      <button onClick={abrirCarrinho} className="relative text-3xl">
        🛒
        {totalItensCarrinho > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {totalItensCarrinho}
          </span>
        )}
      </button>
    </header>
  );
}
