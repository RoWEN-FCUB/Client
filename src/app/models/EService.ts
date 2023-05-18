export interface EService {
    id?: number;
    id_emp?: number;
    nombre_emp?: string;
    nombre?: string;
    provincia?: string;
    municipio?: string;
    reup?: string;
    codcli?: string;
    control?: string;
    ruta?: string;
    folio?: string;
    bitacora?: boolean;
    triple_registro?: boolean;
    aplica_acomodo?: boolean;
    pico_diurno?: boolean;
    pico_nocturno?: boolean;
    total_desconectivos?: number;
    desc_gen_dia?: number;
    desc_parc_dia?: number;
    desc_gen_noche?: number;
    desc_parc_noche?: number;
    latitud?: number;
    longitud?: number;
    horario_diurno?: string;
}
