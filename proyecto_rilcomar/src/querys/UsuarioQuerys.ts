import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { Usuario } from "../models/Usuario";

interface LoginData {
    username: string;
    password: string;
}


async function loginQuery(data: LoginData): Promise<Usuario> {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error durante el inicio de sesión. Verifica tus credenciales.");
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