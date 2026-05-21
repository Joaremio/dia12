import { Memory } from "../types/memory";

export const memories: Memory[] = [
  {
    id: 1,
    title: "Nosso Primeiro Encontro",
    date: "14 Fev 2024",
    location: "Café do Centro",
    description: "O dia que tudo começou, com muito nervosismo e sorrisos",
    music: { name: "Perfect", artist: "Ed Sheeran" },
  },
  {
    id: 2,
    title: "Viagem à Praia",
    date: "10 Mar 2024",
    location: "Florianópolis, SC",
    description: "Fim de semana inesquecível vendo o pôr do sol juntos",
    music: { name: "Ocean Eyes", artist: "Billie Eilish" },
  },
  {
    id: 3,
    title: "Jantar Especial",
    date: "22 Abr 2024",
    location: "Restaurante Italiano",
    description: "Comemorando nossos 6 meses com a melhor massa da cidade",
    music: { name: "La Vie en Rose", artist: "Édith Piaf" },
  },
];
