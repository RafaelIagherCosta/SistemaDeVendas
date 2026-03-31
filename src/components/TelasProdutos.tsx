import { useState, useEffect, useContext } from "react";
import { Produto } from "@/data/model/Produto";
import CatalogoContext from "@/context/CatalogoContext";

export default function TelaProdutos() {
  const { produtos, adicionarProduto, editarProduto, removerProduto } =
    useContext(CatalogoContext);

  const [produtoEmEdicaoId, setProdutoEmEdicaoId] = useState<number | null>(
    null,
  );
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: 0,
    estoque: 0,
  });

  const [imagemBase64, setImagemBase64] = useState<string>("");

  // 🔥 manter só se quiser garantir sync inicial (não quebra nada)
  useEffect(() => {}, []);

  function handleImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImagemBase64(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function iniciarEdicao(produto: Produto) {
    setProdutoEmEdicaoId(produto.id);
    setProdutoEditando({ ...produto });
  }

  async function salvarEdicao() {
    if (!produtoEditando) return;

    try {
      await editarProduto(produtoEditando);

      setProdutoEmEdicaoId(null);
      setProdutoEditando(null);
    } catch (err) {
      alert("Erro ao atualizar produto");

      console.error(err)
    }
  }

  async function remover(id: number) {
    const confirmar = confirm("Tem certeza que deseja deletar este produto?");
    if (!confirmar) return;

    try {
      await removerProduto(id);
    } catch {
      alert("Erro ao deletar produto");
    }
  }

  async function adicionar() {
    if (!novoProduto.preco) {
      alert("Digite o nome do produto");
      return;
    }

    try {
      await adicionarProduto({
        ...novoProduto,
        imagem: imagemBase64,
      });

      setNovoProduto({
        nome: "",
        preco: 0,
        estoque: 0,
      });

      setImagemBase64("");
    } catch {
      alert("Erro ao criar produto");
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto text-slate-900 flex flex-col gap-2 ">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-blue-600">📦</span> Produtos
        </h1>

        <p className="text-sm text-gray-500">
          Gerencie seu catálogo de produtos
        </p>
      </div>

      <section className="flex relative mt-2 border border-slate-300 rounded-lg p-5 pb-8">
        <span className="absolute text-label -top-2 left-3 bg-[#F3F4F6] text-sm  px-2">
          Cadastro
        </span>

        <div className="flex gap-2 mt-1 ">
          <div className="flex flex-col gap-1">
            <span className="text-label">Nome</span>
            <input
              placeholder="Nome"
              value={novoProduto.nome}
              onChange={(e) =>
                setNovoProduto({
                  ...novoProduto,
                  nome: e.target.value,
                })
              }
              className="border border-gray-300 w-full  rounded-md px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-label">Preço</span>
            <input
              type="number"
              placeholder="Preço"
              value={novoProduto.preco}
              onChange={(e) =>
                setNovoProduto({
                  ...novoProduto,
                  preco: Number(e.target.value),
                })
              }
              className="border border-gray-300 w-full rounded-md px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-label">Estoque</span>
            <input
              type="number"
              placeholder="Estoque"
              value={novoProduto.estoque}
              onChange={(e) =>
                setNovoProduto({
                  ...novoProduto,
                  estoque: Number(e.target.value),
                })
              }
              className="border border-gray-300 w-full rounded-md px-3 py-2"
            />
          </div>

          {/* 🔥 ADICIONADO SEM ALTERAR DESIGN */}

          <div className="flex flex-col gap-1">
            <span className="text-label">Imagem</span>

            <label
              htmlFor="asdhkajdkajsh"
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 cursor-pointer bg-gray-100 hover:bg-gray-200"
            >
              Escolha uma imagem
            </label>

            <input
              id="asdhkajdkajsh"
              type="file"
              onChange={handleImagem}
              className="hidden"
            />

          </div>

          <div className=" flex flex-col justify-end">
                    <button
                      onClick={adicionar}
                      className="bg-green-600 hover:bg-green-700 py-2.5 text-white px-5 rounded-md "
                    >
                      Criar
                    </button>

          </div>
        </div>
      </section>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-gray-700 font-medium">Nome</th>
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
                  className="border-t hover:bg-gray-50 text-gray-700"
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
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                      />
                    ) : (
                      produto.nome
                    )}
                  </td>

                  <td className="px-6 py-4">
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
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                      />
                    ) : (
                      `R$ ${produto.preco?.toFixed(2)}`
                    )}
                  </td>

                  <td className="px-6 py-4">
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
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                      />
                    ) : (
                      `${produto.estoque} unidades`
                    )}
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    {estaEditando ? (
                      <button
                        onClick={salvarEdicao}
                        className="bg-green-100 hover:bg-green-200 text-green-600 rounded-md px-3 py-1"
                      >
                        💾
                      </button>
                    ) : (
                      <button
                        onClick={() => iniciarEdicao(produto)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md px-3 py-1"
                      >
                        ✏️
                      </button>
                    )}

                    <button
                      onClick={() => remover(produto.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-600 rounded-md px-3 py-1"
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
