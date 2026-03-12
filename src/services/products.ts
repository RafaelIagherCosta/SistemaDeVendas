import { Produto } from "@/data/model/Produto";

const API = "http://localhost:8000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function tratarResposta<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const erro = await response.text();
    throw new Error(erro || "Erro na requisição");
  }

  return response.json();
}

export async function listarProdutos(): Promise<Produto[]> {
  const response = await fetch(`${API}/products`, {
    headers: getAuthHeaders(),
  });

  return tratarResposta<Produto[]>(response);
}

export async function criarProduto(produto: {
  nome: string;
  preco: number;
  estoque: number;
}): Promise<Produto> {
  const response = await fetch(`${API}/products`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(produto),
  });

  return tratarResposta<Produto>(response);
}

export async function atualizarProduto(produto: Produto): Promise<Produto> {
  const response = await fetch(`${API}/products/${produto.id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(produto),
  });

  return tratarResposta<Produto>(response);
}

export async function deletarProduto(id: number): Promise<void> {
  const response = await fetch(`${API}/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const erro = await response.text();
    throw new Error(erro || "Erro ao deletar produto");
  }
}
