import { useContext, useState } from "react";
import CatalogoContext from "@/context/CatalogoContext";
import { Produto } from "@/data/model/Produto";

export default function TelaProdutos() {
  const { produtos, adicionarProduto, editarProduto, removerProduto } =
    useContext(CatalogoContext);

  const [produtoEmEdicaoId, setProdutoEmEdicaoId] = useState<number | null>(
    null,
  );
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  function iniciarEdicao(produto: Produto) {
    setProdutoEmEdicaoId(produto.id);
    setProdutoEditando(produto);
  }

  function salvarEdicao() {
    if (!produtoEditando) return;

    editarProduto(produtoEditando);
    setProdutoEmEdicaoId(null);
    setProdutoEditando(null);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">📦 Produtos</h1>

        <button
          onClick={adicionarProduto}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Novo Produto
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left text-black">Nome</th>
            <th className="p-3 text-left text-black">Preço</th>
            <th className="p-3 text-left text-black">Estoque</th>
            <th className="p-3 text-left text-black">Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((produto) => {
            const estaEditando = produtoEmEdicaoId === produto.id;

            return (
              <tr key={produto.id} className="border-t text-black">
                <td className="p-3">
                  {estaEditando ? (
                    <input
                      value={produtoEditando?.nome || ""}
                      onChange={(e) =>
                        setProdutoEditando({
                          ...produtoEditando!,
                          nome: e.target.value,
                        })
                      }
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    produto.nome
                  )}
                </td>

                <td className="p-3">
                  {estaEditando ? (
                    <input
                      type="number"
                      value={produtoEditando?.preco || 0}
                      onChange={(e) =>
                        setProdutoEditando({
                          ...produtoEditando!,
                          preco: Number(e.target.value),
                        })
                      }
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    `R$ ${produto.preco.toFixed(2)}`
                  )}
                </td>

                <td className="p-3">
                  {estaEditando ? (
                    <input
                      type="number"
                      value={produtoEditando?.estoque || 0}
                      onChange={(e) =>
                        setProdutoEditando({
                          ...produtoEditando!,
                          estoque: Number(e.target.value),
                        })
                      }
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    produto.estoque
                  )}
                </td>

                <td className="p-3 flex gap-2">
                  {estaEditando ? (
                    <button
                      onClick={salvarEdicao}
                      className="text-green-600 font-semibold"
                    >
                      💾
                    </button>
                  ) : (
                    <button
                      onClick={() => iniciarEdicao(produto)}
                      className="text-blue-600"
                    >
                      ✏️
                    </button>
                  )}

                  <button
                    onClick={() => removerProduto(produto.id)}
                    className="text-red-600"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
