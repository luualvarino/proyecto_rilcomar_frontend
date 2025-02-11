import { Button } from "primereact/button";
import React, { useRef } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast } from "primereact/toast";
import TextInput from "../../components/base/form/textInput/TextInput.tsx";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../querys/UsuarioQuerys.ts";

export default function Login() {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    const formValidator = z.object({
        username: z.string().nonempty("Ingrese un usuario válido"),
        password: z.string().nonempty("Ingrese una contraseña válida"),
    });

    type FormValidationSchema = z.infer<typeof formValidator>;

    const { handleSubmit, control, formState: { errors } } = useForm<FormValidationSchema>({
        resolver: zodResolver(formValidator),
    });

    const { mutate: login, isPending } = useLogin({ 
        onSuccessFn: (user) => {
            
            localStorage.setItem("usuario", JSON.stringify(user));
            
            if (user.esAdmin) {
                toast.current?.show({ severity: "success", summary: "Éxito", detail: "Bienvenido de nuevo Administrador! ", life: 3000 });
                navigate("/admin/home");
            } else {
                toast.current?.show({ severity: "success", summary: "Éxito", detail: "Bienvenido! Ya puedes gestionar tus pallets y pedidos", life: 3000 });
                navigate("/client/home");
            }
            
        },
        onErrorFn: (error) => {
            console.error("Error en el login:", error);
            toast.current?.show({ severity: "error", summary: "Error", detail: "Usuario o contraseña incorrecta", life: 3000 });
        },
    });

    const handleLogin = (data: FormValidationSchema) => {
        login(data);
    };

    return (
        <div className="login-container">
            <Toast ref={toast} />
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
                                type="password"
                            />
                        )}
                    />
                </div>

                <Button
                    label="Iniciar sesión"
                    icon="pi pi-sign-in"
                    type="submit"
                    loading={isPending}
                />
            </form>
        </div>
    );
}

