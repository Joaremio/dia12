import { categorias, Programa } from "../data/programas";

export const todosOsProgramas: Programa[] = categorias.flatMap((c) =>
  c.programas.map((p) => ({
    ...p,
    categoria: c.label,
    cor: c.cor,
    corBg: c.corBg,
    icone: c.icone,
  })),
);
