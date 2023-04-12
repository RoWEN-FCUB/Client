export interface CRecord {
    id?: number;
    id_tarjeta?: number;
    id_gee?: number;
    id_usuario?: number;
    fecha?: Date;
    sinicial_pesos?: number;
    sinicial_litros?: number;
    recarga_pesos?: number;
    recarga_litros?: number;
    saldo_pesos?: number;
    saldo_litros?: number;
    consumo_pesos?: number;
    consumo_litros?: number;
    sfinal_pesos?: number;
    sfinal_litros?: number;
    observacion?: string;
}