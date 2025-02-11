import { Pedido } from "./Pedido";

export enum MaterialEnum {
    Madera,
    Plástico,
    Cartón,
    Prensado
}

export enum FormatoEnum {
    Mercosur = "Mercosur 100x120cm",
    Euro = "Euro 80x129cm",
    Medida1 = "1016x1219mm",
    Medida2 = "1165x1165mm",
    Medida3 = "1067x1067mm",
    Medida4 = "1100x1100mm"
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
    qrCodeUrl?: string;
    qrCodeBase64?: string;
    historial?: Pedido[];
}

export type { Pallet }