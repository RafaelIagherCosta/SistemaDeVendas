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
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-blue-600">📦</span> Produtos
          </h1>
          <p className="text-sm text-gray-500">
            Gerencie seu catálogo de produtos
          </p>
        </div>

        <button
          onClick={adicionarProduto}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          + Novo Produto
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-black font-medium">Nome</th>
              <th className="px-6 py-3 text-gray-700 font-medium">Preço</th>
              <th className="px-6 py-3 text-gray-700 font-medium">
                Quantidade
              </th>
              <th className="px-6 py-3 text-gray-700 font-medium">Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((produto) => {
              const estaEditando = produtoEmEdicaoId === produto.id;

              return (
                <tr
                  key={produto.id}
                  className="border-t hover:bg-gray-50 transition text-gray-700 min-h-screen p-8 "
                >
                  <td className="px-6 py-4">
                    {estaEditando ? (
                      <input
                        value={produtoEditando?.nome || ""}
                        onChange={(e) =>
                          setProdutoEditando({
                            ...produtoEditando!,
                            nome: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                      />
                    ) : (
                      produto.nome
                    )}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
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
                        className="border border-gray-300 rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    ) : (
                      `R$ ${produto.preco.toFixed(2)}`
                    )}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
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
                        className="border border-gray-300 rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    ) : (
                      `${produto.estoque} unidades`
                    )}
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    {estaEditando ? (
                      <button
                        onClick={salvarEdicao}
                        className="bg-green-100 hover:bg-green-200 text-green-600 rounded-md px-3 py-1 transition"
                      >
                        💾
                      </button>
                    ) : (
                      <button
                        onClick={() => iniciarEdicao(produto)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md px-3 py-1 transition"
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      onClick={() => removerProduto(produto.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-600 rounded-md px-3 py-1 transition"
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
    </div>
  );
}
