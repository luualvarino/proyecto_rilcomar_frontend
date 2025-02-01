import { Cliente } from "./Cliente";
import { Pallet } from "./Pallet";

export enum EstadoEnum {
    Creado,
    Procesando,
    En_Viaje,
    Entregado,
    Completado
}

interface Pedido {
    id?: number;
    estado?: EstadoEnum;
    cliente: Cliente;
    fechaCreacion?: string;
    fechaEntrega: string;
    ultimaActualizacion?: string;
    ubicacion?: string;
    pallets: Pallet[];
}

export type { Pedido }