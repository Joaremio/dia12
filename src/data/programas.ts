export type ProgramaBase = {
  titulo: string;
  descricao: string;
};

export type Programa = ProgramaBase & {
  categoria: string;
  cor: string;
  corBg: string;
  icone: string;
};

export type Categoria = {
  label: string;
  cor: string;
  corBg: string;
  icone: string;
  programas: ProgramaBase[];
};

export const categorias: Categoria[] = [
  {
    label: "Em casa",
    cor: "#c084fc",
    corBg: "rgba(192,132,252,0.12)",
    icone: "🏠",
    programas: [
      {
        titulo: "Noite de cinema",
        descricao:
          "Escolham um filme que nenhum dos dois assistiu, apaguem as luzes e preparem pipoca com cobertura especial.",
      },
      {
        titulo: "Jantar surpresa",
        descricao:
          "Sorteiem uma culinária do mundo e cozinhem juntos sem receita — vale usar o que tiver na geladeira!",
      },
      {
        titulo: "Maratona de séries",
        descricao:
          "Criem uma votação dos melhores episódios favoritos e reassistam em modo pijama com snacks à vontade.",
      },
      {
        titulo: "Noite de jogos",
        descricao:
          "Montem uma competição de jogos de tabuleiro ou cartas com regras criativas para quem perder.",
      },
      {
        titulo: "Spa em casa",
        descricao:
          "Máscaras faciais, música relaxante e massagem nos pés — quem cuida do outro primeiro vai sortear!",
      },
      {
        titulo: "Karaokê secreto",
        descricao:
          "Cada um escolhe 3 músicas para o outro cantar. Sem julgamentos, só risadas.",
      },
      {
        titulo: "Aula de dança na sala",
        descricao:
          "Escolham um estilo que nunca tentaram antes e aprendam juntos pelo YouTube.",
      },
      {
        titulo: "Noite de fotos",
        descricao:
          "Separem fotos antigas de vocês e montem um álbum digital ou físico relembrando os momentos.",
      },
    ],
  },
  {
    label: "Ao ar livre",
    cor: "#f472b6",
    corBg: "rgba(244,114,182,0.12)",
    icone: "🌙",
    programas: [
      {
        titulo: "Piquenique noturno",
        descricao:
          "Levem uma manta, lanterna e comidas favoritas para um parque. Contem estrelas e conversem até tarde.",
      },
      {
        titulo: "Explorar um bairro novo",
        descricao:
          "Escolham um bairro que nunca visitaram e saiam sem roteiro — entrem no primeiro café que parecer curioso.",
      },
      {
        titulo: "Fotografia de rua",
        descricao:
          "Cada um usa o celular para fotografar algo que represente o outro. Ao final comparem os resultados.",
      },
      {
        titulo: "Trilha ao nascer do sol",
        descricao:
          "Acordem cedinho e subam algum mirante ou trilha leve para ver o sol nascer juntos.",
      },
      {
        titulo: "Mercado de pulgas",
        descricao:
          "Combinem um valor pequeno e cada um deve encontrar um presente simbólico para o outro no mercado.",
      },
    ],
  },
  {
    label: "Sair juntos",
    cor: "#818cf8",
    corBg: "rgba(129,140,248,0.12)",
    icone: "✨",
    programas: [
      {
        titulo: "Restaurante no escuro",
        descricao:
          "Escolham um restaurante que nenhum dos dois conhece e vão sem ver o cardápio antes — surpresa total!",
      },
      {
        titulo: "Cinema + jantar temático",
        descricao:
          "Assistam a um filme e depois jantem em um restaurante com a culinária do país onde o filme se passa.",
      },
      {
        titulo: "Museu ou exposição",
        descricao:
          "Procurem uma exposição que esteja em cartaz e depois conversem sobre as obras tomando um café.",
      },
      {
        titulo: "Aula de algo novo",
        descricao:
          "Cerâmica, sushi, coquetéis... escolham uma aula de algo diferente e aprendam juntos.",
      },
      {
        titulo: "Escape room",
        descricao:
          "Testem o trabalho em equipe num escape room temático. Spoiler: a culpa é sempre do outro 😄",
      },
      {
        titulo: "Bar de jogos",
        descricao:
          "Bares com fliperama, sinuca ou jogos de mesa — vença com estilo e ganhe o drink escolhido pelo outro.",
      },
    ],
  },
];
