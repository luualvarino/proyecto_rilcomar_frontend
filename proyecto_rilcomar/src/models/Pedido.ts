import { Cliente } from "./Cliente";

interface Pedido {
    id: number;
    estado: string;
    cliente: Cliente;
    fechaCreacion: Date;
    fechaEntrega: Date;
    ultimaActualizacion: Date;
    ubicacion: string;
}

export type { Pedido }