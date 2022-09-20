import { Time } from '@angular/common';

export interface GEecord {
    id?: number;
    id_gee?: number;
    D?: string;
    M?: string;
    A?: string;
    tipo?: string;
    hora_inicial?: Time;
    hora_final?: Time;
    horametro_inicial?: number;
    horametro_final?: number;
    tiempo_trabajado?: number;
    energia_generada?: number;
    combustible_consumido?: number;
    combustible_existencia?: number;
    observaciones?: string;
}
