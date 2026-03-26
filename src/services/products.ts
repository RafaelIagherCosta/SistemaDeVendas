import { Produto } from "@/data/model/Produto";

const API = "http://localhost:8000";

interface ProdutoFrontEnd {
    nome: string;
    preco: number;
    estoque: number;
}

interface ProdutoBackend {
    name: string;
    price: number;
    stock: number;
    image: null | string;
}

function getAuthHeaders(): HeadersInit {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
}

async function tratarResposta<T>(response: Response): Promise<T> {
    if (!response.ok) {
        try {
            const erro = await response.json();
            console.warn("Erro da API:", erro.detail);
        } catch {
            console.warn("Erro na requisição");
        }

        throw new Error("Erro na requisição");
    }

    return await response.json();
}

export async function listarProdutos(): Promise<Produto[]> {
    try {
        const response = await fetch(`${API}/products`, {
            headers: getAuthHeaders(),
        });

        return await tratarResposta<Produto[]>(response);
    } catch {
        return []; // 🔧 sempre retorna array
    }
}

function formatarProdutoBackend(produto: ProdutoFrontEnd): ProdutoBackend {
    return {
        name: produto.nome,
        price: produto.preco,
        stock: produto.estoque,
        image: null,
    };
}

export async function criarProduto(
    produto: ProdutoFrontEnd,
): Promise<Produto | null> {
    try {
        const response = await fetch(`${API}/products`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(formatarProdutoBackend(produto)),
        });

        return await tratarResposta<Produto>(response);
    } catch {
        return null;
    }
}

export async function atualizarProduto(
    produto: Produto,
): Promise<Produto | null> {
    try {
        const response = await fetch(`${API}/products/${produto.id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(produto),
        });

        return await tratarResposta<Produto>(response);
    } catch {
        return null;
    }
}

export async function deletarProduto(id: number): Promise<boolean> {
    try {
        const response = await fetch(`${API}/products/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        if (!response.ok) return false;

        return true;
    } catch {
        return false;
    }
}
