import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pedido } from "../models/Pedido";

async function getPedidosQuery(queryParams: string) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}pedidos?${queryParams}`);

    if (!response.ok) {
        throw new Error("Error al obtener los pedidos");
    }
    const data = await response.json();
    return data;
}

interface getPedidosFilters {
    // page?: number;
    // size?: number;
    estado?: string;
}

const buildApiFilters = (filters: getPedidosFilters) => {
    const queryParams = new URLSearchParams();

    if (filters.estado) {
        queryParams.append("estado", filters.estado.replace(" ", "_"));
    }

    return queryParams.toString();
};

const getPedidos = {
    key: () => ["pedidos"],
    lists: () => [...getPedidos.key(), "list"] as const,
    list: (filters: getPedidosFilters) =>
        queryOptions({
            queryKey: [...getPedidos.lists(), { ...filters }],
            queryFn: () => getPedidosQuery(buildApiFilters(filters)),
        }),
}

export const useGetPedidos = (filters: getPedidosFilters) => {
    return useQuery(getPedidos.list(filters));
}

async function getPedidoQuery(pedidoId: number) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}pedidos/${pedidoId}`);

    if (!response.ok) {
        throw new Error("Error al obtener el pedido");
    }
    const data = await response.json();
    return data;
}

const getPedido = {
    key: () => ["pedidos"],
    lists: () => [...getPedido.key(), "list"] as const,
    list: (pedidoId: number) =>
        queryOptions({
            queryKey: [...getPedidos.lists(), pedidoId],
            queryFn: () => getPedidoQuery(pedidoId),
        }),
}

export const useGetPedido = (pedidoId: number) => {
    return useQuery(getPedido.list(pedidoId));
}

async function createPedidoQuery(pedido: Pedido) {
    console.log("create");

    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}pedidos`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
    });

    if (!response.ok) {
        throw new Error("Error al agregar el pedido");
    }
    const data = await response.json();
    return data;
}

export const useCreatePedido = ({
    onSuccessFn,
    onErrorFn
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (pedido: Pedido) => createPedidoQuery(pedido),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["pedidos"] });
            onSuccessFn(data);
        },
        onError: (data) => {
            onErrorFn(data);
        }
    })
}

async function deletePedidoQuery(pedidoId: number) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}pedidos/${pedidoId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el pedido");
    }

    if (response.status === 204) {
        return null;
    }

    const data = await response.json();
    return data;
}

export const useDeletePedido = ({
    onSuccessFn,
    onErrorFn
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (pedidoId: number) => deletePedidoQuery(pedidoId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["pedidos"] });
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        }
    })
}