import { ItemCarrinho } from "@/data/model/ItemCarrinho";

interface Props {
  itens: ItemCarrinho[];
  total: number;
}

export default function CupomFiscal({ itens, total }: Props) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-80">
      <h2 className="text-xl font-bold mb-4">Cupom Fiscal</h2>

      {itens.map((item) => (
        <div key={item.produto.id} className="flex justify-between">
          <span>
            {item.produto.nome} x{item.quantidade}
          </span>

          <span>
            {(item.quantidade * item.produto.preco).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      ))}

      <div className="border-t mt-4 pt-2 font-bold flex justify-between">
        <span>Total</span>
        <span>
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </div>
  );
}
