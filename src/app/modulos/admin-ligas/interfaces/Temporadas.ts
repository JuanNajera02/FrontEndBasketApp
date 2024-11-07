export interface Temporadas {
  nombreTemporada: string;
  fechaInicio: Date | null;
  fechaTermino: Date | null;
  cantidadEquipos: number;
  categoria: Categoria;
  rama: Rama;
}

export enum Categoria {
  PREBENJAMIN,
  BENJAMIN,
  ALEVIN,
  INFANTIL,
  CADETE,
  JUNIOR,
  SUB22,
  SENIOR
}

export enum Rama {
  MASCULINO,
  FEMENINO
}

// "nombreTemporada": "Temporada 2023-2024",
// "fechaInicio": "2023-09-01",
// "fechaTermino": "2024-06-30",
// "cantidadEquipos": 10,
// "categoria": "SENIOR",
// "rama": "MASCULINO"
