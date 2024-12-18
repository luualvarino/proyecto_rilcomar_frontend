import { queryOptions, useQuery } from "@tanstack/react-query";

async function getPalletsQuery(queryParams: string) {
    const response = await fetch(`http://localhost:8080/rilcomar/pallets?${queryParams}`);

    if (!response.ok) {
        throw new Error("Error al obtener los pallets");
    }
    const data = await response.json();
    return data;
}

interface getPalletsFilters {
    // page?: number;
    // size?: number;
    estado: string;
    tipo: string;
    formato: string;
}

const buildApiFilters = (filters: getPalletsFilters) => {
    const queryParams = new URLSearchParams();

    queryParams.append("estado", filters.estado.replace(" ","_"));
    queryParams.append("tipo", filters.tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    queryParams.append("formato", filters.formato.replace(" ","_"));

    return queryParams.toString();
};

const getPallets = {
    key: () => ["pallets"],
    lists: () => [...getPallets.key(), "list"] as const,
    list: (filters: getPalletsFilters) =>
        queryOptions({
            queryKey: [...getPallets.lists(), { ...filters }],
            queryFn: () => getPalletsQuery(buildApiFilters(filters)),
        }),
}

export const useGetPallets = (filters: getPalletsFilters) => {
    return useQuery(getPallets.list(filters));
}