import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Cliente } from "../models/Cliente";

async function getClientesQuery(queryParams: string) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}clientes?${queryParams}`);

    if (!response.ok) {
        throw new Error("Error al obtener los clientes");
    }
    const data = await response.json();
    return data;
}

interface getClientesFilters {
    // page?: number;
    // size?: number;
    nombre?: string;
}

const buildApiFilters = (filters: getClientesFilters) => {
    const queryParams = new URLSearchParams();

    if (filters.nombre) {
        queryParams.append("nombre", filters.nombre.replace(" ", "_"));
    }

    return queryParams.toString();
};

const getClientes = {
    key: () => ["clientes"],
    lists: () => [...getClientes.key(), "list"] as const,
    list: (filters: getClientesFilters) =>
        queryOptions({
            queryKey: [...getClientes.lists(), { ...filters }],
            queryFn: () => getClientesQuery(buildApiFilters(filters)),
        }),
}

export const useGetClientes = (filters: getClientesFilters) => {
    return useQuery(getClientes.list(filters));
}

async function addClienteQuery(cliente: Cliente) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}clientes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
    });

    if (!response.ok) {
        throw new Error("Error al agregar el cliente");
    }
    const data = await response.json();
    return data;
}

export const useAddCliente = ({
    onSuccessFn,
    onErrorFn
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cliente: Cliente) => addClienteQuery(cliente),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["clientes"] });
            onSuccessFn(data);
        },
        onError: (data) => {
            onErrorFn(data);
        }
    })
}

async function deleteClienteQuery(clienteId: number) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}clientes/${clienteId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el cliente");
    }

    if (response.status === 204) {
        return null;
    }

    const data = await response.json();
    return data;
}

export const useDeleteCliente = ({
    onSuccessFn,
    onErrorFn
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (clienteId: number) => deleteClienteQuery(clienteId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["clientes"] });
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        }
    })
}