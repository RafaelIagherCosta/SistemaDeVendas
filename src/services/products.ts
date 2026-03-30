import { Produto } from "@/data/model/Produto";

const API = "http://localhost:8000";

/* =========================
   TIPOS BACKEND
========================= */

interface ProdutoBackend {
  id?: number;
  name?: string | null;
  price?: number | null;
  stock?: number | null;
  image?: string | null;
}

/* =========================
   TIPOS FRONT (INPUT)
========================= */

interface ProdutoFrontEnd {
  nome: string;
  preco: number;
  estoque: number;
}

/* =========================
   HEADERS
========================= */

function getAuthHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/* =========================
   TRATAMENTO
========================= */

async function tratarResposta<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let erroMsg = "Erro na requisição";

    try {
      const erro = await response.json();
      erroMsg = erro?.detail || erroMsg;
    } catch {}

    throw new Error(erroMsg);
  }

  return response.json();
}

/* =========================
   NORMALIZAÇÃO SEGURA
========================= */

function formatarProdutoFront(produto: ProdutoBackend): Produto {
  return {
    id: produto.id ?? 0,
    nome: produto.name ?? "",
    preco: produto.price ?? 0,
    estoque: produto.stock ?? 0,
    imagem: produto.image ?? "",
    descricao: "",
  };
}

function formatarProdutoBackend(produto: ProdutoFrontEnd): ProdutoBackend {
  return {
    name: produto.nome,
    price: produto.preco,
    stock: produto.estoque,
    image: null,
  };
}

/* =========================
   GET (ROBUSTO)
========================= */

export async function listarProdutos(): Promise<Produto[]> {
  try {
    const response = await fetch(`${API}/products`, {
      headers: getAuthHeaders(),
    });

    const data = await tratarResposta<ProdutoBackend[]>(response);

    if (!Array.isArray(data)) return [];

    return data.map(formatarProdutoFront);
  } catch (error) {
    console.error("Erro GET produtos:", error);
    return [];
  }
}

/* =========================
   POST
========================= */

export async function criarProduto(
  produto: ProdutoFrontEnd,
): Promise<Produto | null> {
  try {
    const response = await fetch(`${API}/products`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(formatarProdutoBackend(produto)),
    });

    const data = await tratarResposta<ProdutoBackend>(response);

    return formatarProdutoFront(data);
  } catch (error) {
    console.error("Erro POST:", error);
    return null;
  }
}

/* =========================
   PUT
========================= */

export async function atualizarProduto(
  produto: Produto,
): Promise<Produto | null> {
  try {
    const response = await fetch(`${API}/products/${produto.id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: produto.nome,
        price: produto.preco,
        stock: produto.estoque,
        image: produto.imagem ?? null,
      }),
    });

    const data = await tratarResposta<ProdutoBackend>(response);

    return formatarProdutoFront(data);
  } catch (error) {
    console.error("Erro PUT:", error);
    return null;
  }
}

/* =========================
   DELETE
========================= */

export async function deletarProduto(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    return response.ok;
  } catch (error) {
    console.error("Erro DELETE:", error);
    return false;
  }
}
