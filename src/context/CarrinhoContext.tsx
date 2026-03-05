import { createContext, useState, ReactNode } from "react";
import { Produto } from "@/data/model/Produto";
import { ItemCarrinho } from "@/data/model/ItemCarrinho";

interface CarrinhoContextProps {
  itens: ItemCarrinho[];
  total: number;
  vendas: number[];

  aberto: boolean;
  abrirCarrinho: () => void;
  fecharCarrinho: () => void;

  adicionarProduto: (produto: Produto) => void;
  removerProduto: (id: number) => void;
  aumentarQuantidade: (id: number) => void;
  diminuirQuantidade: (id: number) => void;

  finalizarVenda: () => void;
}

const CarrinhoContext = createContext<CarrinhoContextProps>(
  {} as CarrinhoContextProps,
);

interface CarrinhoProviderProps {
  children: ReactNode;
}

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [aberto, setAberto] = useState(false);
  const [vendas, setVendas] = useState<number[]>([]);

  function abrirCarrinho() {
    setAberto(true);
  }

  function fecharCarrinho() {
    setAberto(false);
  }

  function adicionarProduto(produto: Produto) {
    setItens((listaAtual) => {
      const itemExistente = listaAtual.find(
        (item) => item.produto.id === produto.id,
      );

      if (itemExistente) {
        return listaAtual.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...listaAtual, { produto, quantidade: 1 }];
    });
  }

  function removerProduto(id: number) {
    setItens((listaAtual) =>
      listaAtual.filter((item) => item.produto.id !== id),
    );
  }

  function aumentarQuantidade(id: number) {
    setItens((listaAtual) =>
      listaAtual.map((item) =>
        item.produto.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item,
      ),
    );
  }

  function diminuirQuantidade(id: number) {
    setItens((listaAtual) =>
      listaAtual
        .map((item) =>
          item.produto.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  }

  const total = itens.reduce(
    (soma, item) => soma + item.produto.preco * item.quantidade,
    0,
  );

  function finalizarVenda() {
    if (itens.length === 0) return;

    setVendas((listaVendas) => [...listaVendas, total]);
    setItens([]);
    setAberto(false);
  }

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        total,
        vendas,
        aberto,
        abrirCarrinho,
        fecharCarrinho,
        adicionarProduto,
        removerProduto,
        aumentarQuantidade,
        diminuirQuantidade,
        finalizarVenda,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export default CarrinhoContext;
