export interface ERecord {
    id?: number;
    fecha?: Date;
    plan?: number;
    consumo?: number;
    lectura?: number;
    lectura_hpicd1?: number;
    lectura_hpicd2?: number;
    lectura_hpicn1?: number;
    lectura_hpicn2?: number;
    planacumulado?: number;
    realacumulado?: number;
    plan_hpicd?: number;
    plan_hpicn?: number;
    id_serv?: number;
    bloqueado?: boolean;
  }