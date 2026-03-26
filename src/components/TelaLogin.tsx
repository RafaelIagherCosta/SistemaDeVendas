import { useState } from "react";

interface TelaLoginProps {
    onLogin: () => void;
}

export default function TelaLogin({ onLogin }: TelaLoginProps) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/user/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: senha,
                }),
            });

            if (!response.ok) {
                throw new Error();
            }

            const token = await response.json();

            localStorage.setItem("token", token);

            onLogin();
        } catch {
            alert("Email ou senha incorreta");
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-lg shadow-md w-96"
            >
                <h1 className="text-2xl font-bold text-center text-black mb-6">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mb-4 text-black"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mb-6 text-black"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
