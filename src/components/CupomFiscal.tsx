import { ItemCarrinho } from "@/data/model/ItemCarrinho";

interface CupomFiscalProps {
  itens: ItemCarrinho[];
  total: number;
}

export default function CupomFiscal({ itens, total }: CupomFiscalProps) {
  const dataAtual = new Date().toLocaleString("pt-BR");

  return (
    <div
      id="cupom"
      className="mx-auto mt-10 max-w-md border bg-white p-6 shadow"
    >
      <h1 className="text-center text-lg font-bold text-black">Rafa Tech</h1>

      <p className="mb-4 text-center text-sm text-gray-500">{dataAtual}</p>

      <hr className="mb-4" />

      {itens.map((item) => (
        <div
          key={item.produto.id}
          className="flex justify-between text-sm text-black"
        >
          <span>
            {item.produto.nome} x{item.quantidade}
          </span>

          <span>
            {(item.produto.preco * item.quantidade).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      ))}

      <hr className="my-4" />

      <div className="flex justify-between font-bold">
        <span className="text-black">Total</span>

        <span className="text-black">
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>

      <button
        onClick={() => window.print()}
        className="mt-6 w-full rounded bg-blue-600 py-2 text-white print:hidden"
      >
        Imprimir
      </button>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }

          #cupom,
          #cupom * {
            visibility: visible;
          }

          #cupom {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
