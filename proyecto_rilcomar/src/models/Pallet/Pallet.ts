import { Pedido } from "../Pedido";

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

interface Pallet {
    id?: number;
    estado: string;
    tipo: MaterialEnum;
    estaDisponible?: boolean;
    formato?: FormatoEnum;
    peso?: number;
    dimensiones?: string;
    observaciones?: string;
    ubicacion?: string;
    historial?: Pedido[];
}

export type { Pallet }