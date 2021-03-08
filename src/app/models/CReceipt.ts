import { CProduct } from './CProduct';
export interface CReceipt {
    id?: number;
    id_proveedor?: number;
    pedido?: string;
    precio_total?: number;
    comprador?: string;
    destinatario?: string;
    destinatario_direccion?: string;
    destinatario_telefono?: string;
    marcado_conciliar?: boolean;
    conciliado?: boolean;
    entregado?: boolean;
    fecha_emision?: Date;
    productos?: CProduct[];
    costo_envio?: number;
    provincia?: string;
    municipio?: string;
    cantidad_productos?: number;
}