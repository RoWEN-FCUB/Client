export interface Task {
  id?: number;
  id_usuario?: number;
  resumen?: string;
  descripcion?: string;
  fecha_inicio?: Date;
  fecha_fin?: Date;
  estado?: string;
  id_creador?: number;
  duracion?: number;
  validada?: boolean;
  observaciones?: string;
  nombre_creador?: string;
}
