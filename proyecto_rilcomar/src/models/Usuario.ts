import { Cliente } from "./Cliente";

interface Usuario {
    username: string;
    password: string;
    esAdmin: boolean;
    cliente: Cliente;
}

export type { Usuario };