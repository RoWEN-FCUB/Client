import { Time } from "@angular/common";

export interface Visitor {
    id?: number;
    id_servicio?: number;
    numero?: number;
    nombre?: string;
    organismo?: string;
    ci?: string;
    departamento?: string;
    autoriza?: number;
    nombre_autoriza?: string;
    fecha?: Date;
    hora_entrada?: Time;
    hora_salida?: Time;
  }