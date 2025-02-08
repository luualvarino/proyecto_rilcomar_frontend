import { Cliente, ClienteBasico  } from "./Cliente";

interface Usuario {
    username: string;
    password: string;
    esAdmin?: boolean;
    cliente: Cliente; //no me copa mucho que sea asi pero bueno, despues veo de cambiarlo
}

interface UsuarioData {
    username: string;
    password: string;
    esAdmin?: boolean;
    cliente?: ClienteBasico; 
}

export type { Usuario, UsuarioData };