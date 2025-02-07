import { useMutation, UseMutationResult, useQueryClient, useQuery, UseQueryOptions} from "@tanstack/react-query";
import { Usuario, UsuarioData } from "../models/Usuario";
import { ClienteBasico } from "../models/Cliente";


interface LoginData {
    username: string;
    password: string;
}


async function loginQuery(data: LoginData): Promise<Usuario> {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}usuarios/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error. Verifica tus credenciales.");
    }

    const user: Usuario = await response.json();
    return user;
}



export const useLogin = ({
    onSuccessFn,
    onErrorFn,
}: {
    onSuccessFn: (user: Usuario) => void;
    onErrorFn: (error: any) => void;
}): UseMutationResult<Usuario, Error, LoginData> => {
    const queryClient = useQueryClient();

    return useMutation<Usuario, Error, LoginData>({
        mutationFn: loginQuery,
        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: ["usuario"] });
            onSuccessFn(user);
        },
        onError: (error) => {
            onErrorFn(error);
        },
    });
};

async function addUsuarioQuery(data: UsuarioData): Promise<Usuario> {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Error al agregar el usuario.");
    }
  
    const usuario: Usuario = await response.json();
    return usuario;
  }
  
  export const useAddUsuario = ({
    onSuccessFn,
    onErrorFn,
  }: {
    onSuccessFn: (usuario: Usuario) => void;
    onErrorFn: (error: any) => void;
  }): UseMutationResult<Usuario, Error, UsuarioData> => {
    const queryClient = useQueryClient();
  
    return useMutation<Usuario, Error, UsuarioData>({
      mutationFn: addUsuarioQuery,
      onSuccess: (usuario) => {
        queryClient.invalidateQueries({ queryKey: ["usuario"] });
        onSuccessFn(usuario);
      },
      onError: (error) => {
        onErrorFn(error);
      },
    });
  };


  async function getUsuariosPorClienteQuery(idCliente: number): Promise<Usuario[]> {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}usuarios/${idCliente}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios del cliente.");
    }
  
    return await response.json();
  }
  
  export const useGetUsuariosPorCliente = (
    idCliente: number,
    options?: UseQueryOptions<Usuario[], Error>
  ) => {
    return useQuery<Usuario[], Error>({
      queryKey: ["usuarios", idCliente],
      queryFn: () => getUsuariosPorClienteQuery(idCliente),
      enabled: !!idCliente, 
      ...options, 
    });
  };
  

  async function deleteUsuarioQuery(username: string): Promise<void> {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}usuarios/${username}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el usuario.");
    }
}

export const useDeleteUsuario = ({
    onSuccessFn,
    onErrorFn,
}: {
    onSuccessFn: () => void;
    onErrorFn: (error: any) => void;
}) => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: deleteUsuarioQuery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["usuarios"] }); 
            onSuccessFn();
        },
        onError: (error) => {
            onErrorFn(error);
        },
    });
};