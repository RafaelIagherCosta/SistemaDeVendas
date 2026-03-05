"use client";

import { createContext, useState, ReactNode } from "react";
import { Produto } from "@/data/model/Produto";
import { produtos as produtosIniciais } from "@/data/constants/produtos";

interface CatalogoContextProps {
  produtos: Produto[];
  adicionarProduto: () => void;
  editarProduto: (produto: Produto) => void;
  removerProduto: (id: number) => void;
}

const CatalogoContext = createContext<CatalogoContextProps>(
  {} as CatalogoContextProps,
);

interface CatalogoProviderProps {
  children: ReactNode;
}

export function CatalogoProvider({ children }: CatalogoProviderProps) {
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais);

  function adicionarProduto() {
    const novoProduto: Produto = {
      id: Date.now(),
      nome: "Novo Produto",
      preco: 0,
      estoque: 0,
      imagem: "/placeholder.jfif",
      descricao: "Descrição",
    };

    setProdutos((listaAtual) => [...listaAtual, novoProduto]);
  }

  function editarProduto(produtoAtualizado: Produto) {
    setProdutos((listaAtual) =>
      listaAtual.map((produto) =>
        produto.id === produtoAtualizado.id ? produtoAtualizado : produto,
      ),
    );
  }

  function removerProduto(id: number) {
    setProdutos((listaAtual) =>
      listaAtual.filter((produto) => produto.id !== id),
    );
  }

  return (
    <CatalogoContext.Provider
      value={{
        produtos,
        adicionarProduto,
        editarProduto,
        removerProduto,
      }}
    >
      {children}
    </CatalogoContext.Provider>
  );
}

export default CatalogoContext;
