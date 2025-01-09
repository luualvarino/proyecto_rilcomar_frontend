import { queryOptions, useQuery } from "@tanstack/react-query";

async function getClientesQuery(queryParams: string) {
    const response = await fetch(`http://localhost:8080/rilcomar/cliente?${queryParams}`);

    if (!response.ok) {
        throw new Error("Error al obtener los cliente");
    }
    const data = await response.json();
    return data;
}

interface getClientesFilters {
    nombre: string; //?
    mail: string;
}

const buildApiFilters = (filters: getClientesFilters) => {
    const queryParams = new URLSearchParams();

    if (filters.nombre) {
        queryParams.append(
            "nombre",
            filters.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        );
    }
    if (filters.mail) {
        queryParams.append("mail", filters.mail.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
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
};

export const useGetClientes = (filters: getClientesFilters) => {
    return useQuery(getClientes.list(filters));
};