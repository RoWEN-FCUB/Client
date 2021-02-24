export interface CReceipt {
    id?: number;
    id_proveedor?: number;
    id_producto?: number;
    cantidad?: number;
    precio_total: number;
    comprador?: string;
    destinatario?: string;
    conciliado?: boolean;
}