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

  // carregar produtos do backend
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const data = await listarProdutos();
        setProdutos(data);
      } catch (erro) {
        console.error("Erro ao carregar produtos", erro);
      }
    }

    carregarProdutos();
  }, []);

  // criar produto
  async function adicionarProduto(produto: Omit<Produto, "id">) {
    const criado = await criarProduto(produto);

    setProdutos((listaAtual) => [...listaAtual, criado]);
  }

  // editar produto
  async function editarProduto(produtoAtualizado: Produto) {
    const atualizado = await atualizarProduto(produtoAtualizado);

    setProdutos((listaAtual) =>
      listaAtual.map((produto) =>
        produto.id === atualizado.id ? atualizado : produto,
      ),
    );
  }

  // deletar produto
  async function removerProduto(id: number) {
    await deletarProduto(id);

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
