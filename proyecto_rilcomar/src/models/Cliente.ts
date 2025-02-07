interface Cliente {
    id?: number; 
    nombre: string;
    telefono: string;
    mail: string;
}

interface ClienteBasico {
    id: number;
  }

export type { Cliente, ClienteBasico };