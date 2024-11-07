export interface JugadoresParaPartido {
    equipo: string;
    jugador: {
        usuario: string;
    };
    partido: {
        clavePartido: number;
    };
}

export interface JugadoresPart {
  jugador: string;
  enBanca: boolean;
}

