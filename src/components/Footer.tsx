export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        <div className="font-semibold text-black">Rafa Tech</div>

        <div className="flex gap-6 my-3 md:my-0">
          <a href="#" className="hover:text-black transition">
            Produtos
          </a>

          <a href="#" className="hover:text-black transition">
            Suporte
          </a>

          <a href="#" className="hover:text-black transition">
            Contato
          </a>
        </div>

        <div>© {ano} Rafa Tech</div>
      </div>
    </footer>
  );
}
