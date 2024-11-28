import { Pedido } from "./Pedido";

interface Pallet {
    id: number;
    estado: string;
    tipo: string;
    estaDisponible: boolean;
    historial: Pedido[];
}

export type { Pallet }