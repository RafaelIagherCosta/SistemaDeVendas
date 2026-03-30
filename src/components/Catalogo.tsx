import { useContext } from "react";
import CarrinhoContext from "@/context/CarrinhoContext";
import CatalogoContext from "@/context/CatalogoContext";

export default function Catalogo() {
  const { produtos } = useContext(CatalogoContext);
  const { adicionarProduto, abrirCarrinho, itens } =
    useContext(CarrinhoContext);

  const quantidadeItens =
    itens?.reduce((total, item) => total + item.quantidade, 0) ?? 0;

  return (
    <>
      <div className="mx-auto flex max-w-300 justify-end p-6">
        <button onClick={abrirCarrinho} className="relative text-3xl">
          🛒
          {quantidadeItens > 0 && (
            <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
              {quantidadeItens}
            </span>
          )}
        </button>
      </div>

      <div className="mx-auto grid max-w-300 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {produtos?.map((produto) => (
          <div
            key={produto.id}
            className="rounded-xl bg-white px-7 py-10 shadow-2xl"
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="mx-auto mb-10 h-56 w-56 object-contain"
            />

            <h2 className="text-xl font-semibold text-black">{produto.nome}</h2>

            <p className="text-sm text-gray-600">Preço</p>

            <p className="mb-3 text-2xl font-semibold text-blue-600">
              {produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>

            <button
              onClick={() => adicionarProduto(produto)}
              className="w-full rounded-md bg-blue-700 p-2 font-medium text-white hover:bg-sky-600"
            >
              Adicionar
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
