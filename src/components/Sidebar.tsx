import { useState } from "react";
import { BarChart3, Package, ShoppingCart, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface ItemProps {
  icone: React.ReactNode;
  texto: string;
  rota: string;
  hover: boolean;
}

function Item({ icone, texto, rota, hover }: ItemProps) {
  const location = useLocation();
  const ativo = location.pathname === rota;

  return (
    <Link
      to={rota}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
        ativo
          ? "bg-blue-100 text-blue-700 font-semibold"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <div
        className={`transition-all duration-300 flex items-center justify-center ${
          hover ? "scale-100" : "scale-150"
        }`}
      >
        {icone}
      </div>

      {hover && <span>{texto}</span>}
    </Link>
  );
}

export default function Sidebar() {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }

  return (
    <div
      className="flex fixed h-screen w-64 flex-col border-r bg-white p-4 transition-all"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="mb-10">
        <h1 className="text-xl font-bold text-gray-800">Vendas</h1>
        <p className="text-sm text-gray-500">Sistema de Gestão</p>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <Item
          icone={<BarChart3 size={22} />}
          texto="Dashboard"
          rota="/"
          hover={hover}
        />

        <Item
          icone={<Package size={22} />}
          texto="Produtos"
          rota="/produtos"
          hover={hover}
        />

        <Item
          icone={<ShoppingCart size={22} />}
          texto="Vendas"
          rota="/vendas"
          hover={hover}
        />
      </div>

      <button
        className="flex items-center gap-3 border border-red-200 text-red-500 px-4 py-3 rounded-lg hover:bg-red-50 transition"
        onClick={handleLogout}
      >
        <div
          className={`transition-all duration-300 ${
            hover ? "scale-150" : "scale-100"
          }`}
        >
          <LogOut />
        </div>

        {hover && <span>Sair</span>}
      </button>
    </div>
  );
}