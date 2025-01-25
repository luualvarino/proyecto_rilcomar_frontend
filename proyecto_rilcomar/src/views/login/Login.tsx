import { Button } from "primereact/button";
import React from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../components/base/form/TextInput.tsx";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../querys/UsuarioQuerys.ts";

export default function Login() {
    const navigate = useNavigate();

    const formValidator = z.object({
        username: z.string().nonempty("Ingrese un usuario válido"),
        password: z.string().nonempty("Ingrese una contraseña válida"),
    });

    type FormValidationSchema = z.infer<typeof formValidator>;

    const { handleSubmit, control, formState: { errors } } = useForm<FormValidationSchema>({
        resolver: zodResolver(formValidator),
    });

    const { mutate: login } = useLogin({ //No pude hacer que funcione el isLoading da error de compilacion
        onSuccessFn: (user) => {
            if (user.esAdmin) {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        },
        onErrorFn: (error) => {
            console.error("Error en el login:", error);
            alert("Usuario o contraseña incorrectos");
        },
    });

    const handleLogin = (data: FormValidationSchema) => {
        login(data);
    };

    return (
        <div className="login-container">
            <form
                className="login-form card flex flex-column align-items-center gap-3"
                onSubmit={handleSubmit(handleLogin)}
            >
                <div className="field">

                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                id="username"
                                placeholder="Usuario"
                                value={field.value || ""}
                                setValue={field.onChange}
                                invalid={!!errors.username}
                                helperText={errors.username?.message}
                            />
                        )}
                    />
                </div>

                <div className="field">
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                id="password"
                                placeholder="Contraseña"
                                value={field.value || ""}
                                setValue={field.onChange}
                                invalid={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />
                </div>

                <Button
                    label="Iniciar sesión"
                    icon="pi pi-sign-in"
                    type="submit"
                />
            </form>
        </div>
    );
}

