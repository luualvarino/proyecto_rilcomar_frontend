interface Pedido {
    id: number;
    estado: string;
    clienteId: number;
    fechaCreacion: Date;
    fechaEntrega: Date;
    ultimaActualizacion: Date;
}

export type { Pedido }