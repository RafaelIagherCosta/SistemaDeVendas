import { createContext, useState, ReactNode, useEffect } from "react";
import { Produto } from "@/data/model/Produto";

import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from "@/services/products";

interface CatalogoContextProps {
  produtos: Produto[];
  adicionarProduto: (produto: Omit<Produto, "id">) => Promise<void>;
  editarProduto: (produto: Produto) => Promise<void>;
  removerProduto: (id: number) => Promise<void>;
}

const CatalogoContext = createContext<CatalogoContextProps>(
  {} as CatalogoContextProps,
);

interface CatalogoProviderProps {
  children: ReactNode;
}

export function CatalogoProvider({ children }: CatalogoProviderProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // =========================
  // CARREGAR PRODUTOS
  // =========================
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const data = await listarProdutos();

        if (!Array.isArray(data)) {
          setProdutos([]);
          return;
        }

        setProdutos(data);
      } catch (erro) {
        console.error("Erro ao carregar produtos", erro);
        setProdutos([]);
      }
    }

    carregarProdutos();
  }, []);

  // =========================
  // CRIAR PRODUTO
  // =========================
  async function adicionarProduto(produto: Omit<Produto, "id">) {
    try {
      const criado = await criarProduto(produto);

      if (!criado) return;

      // 🔥 garante sync com backend
      const data = await listarProdutos();
      setProdutos(Array.isArray(data) ? data : []);
    } catch (erro) {
      console.error("Erro ao criar produto", erro);
    }
  }

  // =========================
  // EDITAR PRODUTO
  // =========================
  async function editarProduto(produtoAtualizado: Produto) {
    try {
      const atualizado = await atualizarProduto(produtoAtualizado);

      if (!atualizado) return;

      // 🔥 garante sync real com backend
      const data = await listarProdutos();
      setProdutos(Array.isArray(data) ? data : []);
    } catch (erro) {
      console.error("Erro ao editar produto", erro);
    }
  }

  // =========================
  // REMOVER PRODUTO
  // =========================
  async function removerProduto(id: number) {
    try {
      const ok = await deletarProduto(id);

      if (!ok) return;

      // 🔥 garante sync real com backend
      const data = await listarProdutos();
      setProdutos(Array.isArray(data) ? data : []);
    } catch (erro) {
      console.error("Erro ao remover produto", erro);
    }
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
