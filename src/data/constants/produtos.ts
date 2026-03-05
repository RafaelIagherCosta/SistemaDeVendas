import { Produto } from "@/data/model/Produto";

export const produtos: Produto[] = [
  {
    id: 1,
    nome: "Notebook Dell",
    preco: 3500,
    estoque: 10,
    imagem: "/notebook.jfif",
    descricao: "Notebook potente para trabalho e estudos.",
  },
  {
    id: 2,
    nome: "Mouse Logitech",
    preco: 150,
    estoque: 25,
    imagem: "/mouse.jfif",
    descricao: "Mouse ergonômico com alta precisão.",
  },
  {
    id: 3,
    nome: "Teclado Mecânico",
    preco: 450,
    estoque: 18,
    imagem: "/teclado2.jfif",
    descricao: "Teclado mecânico ideal para gamers.",
  },
  {
    id: 4,
    nome: 'Monitor 24"',
    preco: 1200,
    estoque: 8,
    imagem: "/monitor.jfif",
    descricao: "Monitor Full HD com cores vibrantes.",
  },
  {
    id: 5,
    nome: "Headset Gamer",
    preco: 300,
    estoque: 15,
    imagem: "/headset.jfif",
    descricao: "Headset com som imersivo e microfone.",
  },
  {
    id: 6,
    nome: "Webcam Full HD",
    preco: 280,
    estoque: 12,
    imagem: "/webcam.jfif",
    descricao: "Webcam 1080p para chamadas e streaming.",
  },
];
