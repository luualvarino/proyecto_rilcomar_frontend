import { Pedido } from "./Pedido";

export enum MaterialEnum {
    Madera,
    Plástico,
    Cartón,
    Prensado
}

export enum FormatoEnum {
    Mercosur_100x120cm,
    Euro_80x129cm,
    Pallet_1016x1219mm,
    Pallet_1165x1165mm,
    Pallet_1067x1067mm,
    Pallet_1100x1100mm
}

export enum EstadoEnum {
    Libre,
    Ocupado,
    Deshabilitado
}

interface Pallet {
    id?: number;
    estado?: EstadoEnum;
    tipo: string;
    formato?: string;
    peso?: number;
    dimensiones?: string;
    observaciones?: string;
    ubicacion?: string;
    pedidoActual?: Pedido;
    historial?: Pedido[];
}

export type { Pallet }