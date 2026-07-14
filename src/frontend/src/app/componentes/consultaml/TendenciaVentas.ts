import { HistoricoVentas } from "./HistoricoVentas";

export class TendenciaVentas{
    historico: HistoricoVentas[];
    prediccionManana: number;
    promedioHistorico: number;
    variacionPorcentaje: number;
    tendencia: string;
    recomendacion: string;
}