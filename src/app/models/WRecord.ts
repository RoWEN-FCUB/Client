export interface WRecord {
  id?: number;
  cod?: number;
  cliente?: string;
  equipo?: string;
  marca?: string;
  modelo?: string;
  inventario?: string;
  serie?: string;
  fecha_entrada?: Date;
  entregado?: string;
  ot?: string;
  estado?: string;
  especialista?: string;
  fecha_salida?: Date;
  recogido?: string;
  cliente_nombre?: string;
  id_superior?: number;
  id_serv?: number;
  fallo?: string;
  observaciones?: string;
  externo?: boolean;
  entrega_ci?: string;
  recoge_ci?: string;
}
