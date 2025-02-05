import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pallet } from "../models/Pallet";

async function getPalletsQuery(queryParams: string) {
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}pallets?${queryParams}`);

    if (!response.ok) {
        throw new Error("Error al obtener los pallets");
    }
    const data = await response.json();
    return data;
}

interface getPalletsFilters {
    // page?: number;
    // size?: number;
    estado?: string;
    tipo?: string;
    formato?: string;
}

const buildApiFilters = (filters: getPalletsFilters) => {
    const queryParams = new URLSearchParams();

    if (filters.estado) {
        queryParams.append("estado", filters.estado);
    }

    if (filters.tipo) {
        queryParams.append("tipo", filters.tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    }

    if (filters.formato) {
        queryParams.append("formato", filters.formato.replace(" ", "_"));
    }

    return queryParams.toString();
};

const getPallets = {
    key: () => ["pallets"],
    lists: () => [...getPallets.key(), "list"] as const,
    list: (filters: getPalletsFilters) =>
        queryOptions({
            queryKey: [...getPallets.lists(), { ...filters }],
            queryFn: () => getPalletsQuery(buildApiFilters(filters)),
        })
}

export const useGetPallets = (filters: getPalletsFilters) => {
    return useQuery(getPallets.list(filters));
}

async function getPalletsPorPedidoQuery(pedidoId: number) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}pallets/pedido/${pedidoId}`);

    if (!response.ok) {
        throw new Error("Error al obtener los pallets");
    }
    const data = await response.json();
    return data;
}

const getPalletsPorPedido = {
    key: () => ["pallets"],
    lists: () => [...getPallets.key(), "list"] as const,
    list: (pedidoId: number) =>
        queryOptions({
            queryKey: [...getPalletsPorPedido.lists()],
            queryFn: () => getPalletsPorPedidoQuery(pedidoId),
        }),
}

export const useGetPalletsPorPedido = (pedidoId: number) => {
    return useQuery(getPalletsPorPedido.list(pedidoId));
}

async function addPalletQuery(pallet: Pallet, cantidad: number) {
    console.log("Enviando -> PALLET:", JSON.stringify(pallet), "CANTIDAD:", cantidad);

    if (!pallet || !cantidad) {
        throw new Error("Pallet o cantidad están undefined");
    }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}pallets?cantidad=${cantidad}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pallet),
    });

    if (!response.ok) {
        throw new Error("Error al agregar el pallet");
    }
    const data = await response.json();
    return data;
}

export const useAddPallet = ({
    onSuccessFn,
    onErrorFn
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ pallet, cantidad }: { pallet: Pallet, cantidad: number }) => addPalletQuery(pallet, cantidad),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["pallets"] });
            onSuccessFn(data);
        },
        onError: (error) => {
            console.error("Error al agregar pallet:", error);
            onErrorFn(error);
        }
    })
}

async function deletePalletQuery(palletId: number) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}pallets/${palletId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el pallet");
    }

    if (response.status === 204) {
        return null;
    }

    const data = await response.json();
    return data;
}

export const useDeletePallet = ({
    onSuccessFn,
    onErrorFn
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (palletId: number) => deletePalletQuery(palletId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["pallets"] });
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        }
    })
}

async function getPalletsCountQuery() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}pallets/countByEstado`);
    if (!response.ok) {
        throw new Error("Error al obtener el conteo de pallets");
    }
    return response.json();
}

export const useGetPalletsCount = () => {
    return useQuery({
        queryKey: ["pallets", "count"],
        queryFn: getPalletsCountQuery,
    });
};


async function getPalletQuery(palletId: number) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}pallets/${palletId}`);

    if (!response.ok) {
        throw new Error("Error al obtener el pallet");
    }
    const data = await response.json();

    console.log("QRCode Pallet", data.qrCode);

    if (data.qrCode) {
        data.qrCode = `data:image/png;base64,${data.qrCode}`;
    }

    return data;
}

const getPallet = {
    key: () => ["pallets"],
    details: () => [...getPallet.key(), "details"] as const,
    detail: (palletId: number) =>
        queryOptions({
            queryKey: [...getPallet.details(), palletId],
            queryFn: () => getPalletQuery(palletId),
        }),
}

export const useGetPallet = (palletId: number) => {
    return useQuery(getPallet.detail(palletId));
}