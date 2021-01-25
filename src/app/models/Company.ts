export interface Company {
    id?: number;
    siglas?: string;
    nombre?: string;
    provincia?: string;
    municipio?: string;
    oace?: string;
    osde?: string;
    codcli?: string;
    control?: string;
    ruta?: string;
    folio?: string;
    email?: string;
    reup?: string;
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
}
