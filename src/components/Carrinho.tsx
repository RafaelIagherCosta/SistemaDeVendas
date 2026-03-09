"use client";

import { useContext } from "react";
import CarrinhoContext from "@/context/CarrinhoContext";
import { IconTrash } from "@tabler/icons-react";

export default function Carrinho() {
  const {
    itens,
    total,
    aberto,
    fecharCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    excluirItem,
    finalizarVenda,
  } = useContext(CarrinhoContext);

  return (
    <>
      {aberto && (
        <div
          onClick={fecharCarrinho}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-96 bg-white shadow-2xl
        transform transition-transform duration-300
        ${aberto ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold text-black">🛒 Carrinho</h2>

          <button
            onClick={fecharCarrinho}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </header>

        <div className="h-[calc(100%-200px)] space-y-5 overflow-y-auto p-6">
          {itens.length === 0 && (
            <p className="text-center text-gray-600">Seu carrinho está vazio</p>
          )}

          {itens.map((item) => (
            <div
              key={item.produto.id}
              className="flex gap-4 rounded-xl bg-gray-100 p-4"
            >
              <img
                src={item.produto.imagem}
                alt={item.produto.nome}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-black">
                  {item.produto.nome}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.produto.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() => diminuirQuantidade(item.produto.id)}
                    className="rounded bg-red-500 px-3 text-white"
                  >
                    -
                  </button>

                  <span className="text-black">{item.quantidade}</span>

                  <button
                    onClick={() => aumentarQuantidade(item.produto.id)}
                    className="rounded bg-green-600 px-3 text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className=" flex flex-col justify-between items-start font-bold text-gray-400">
                <button
                  onClick={() => excluirItem(item.produto.id)}
                  className=" rounded bg-red-500 px-3 text-white"
                >
                  <IconTrash />
                </button>
                {(item.quantidade * item.produto.preco).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  },
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 w-full border-t bg-gray-50 p-6">
          <div className="mb-4 flex justify-between text-lg font-bold">
            <span className="text-black">Total</span>

            <span className="text-black">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <button
            onClick={finalizarVenda}
            className="w-full rounded-xl bg-black py-3 text-white hover:opacity-90"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </>
  );
}
