import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import TextInput from "../base/form/textInput/TextInput.tsx";
import { Button } from "primereact/button";
import { UsuarioData } from "../../models/Usuario.ts";
import { useAddUsuario } from "../../querys/UsuarioQuerys.ts";



export default function UserForm({ clienteSeleccionado, onAddSuccess }) {

    const { mutate: addUsuario } = useAddUsuario({
        onSuccessFn: (data) => {
            onAddSuccess(data);
        },
        onErrorFn: () => {
            onAddSuccess(null);
        },
    })

    const formValidator = z.object({
        username: z.string().min(1, "El nombre es obligatorio."), 
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
    });

    type FormValidationSchema = z.infer<typeof formValidator>;

    const { handleSubmit, control, formState: { errors } } = useForm<FormValidationSchema>({
        resolver: zodResolver(formValidator),
    })

    const handleAddUsuario: SubmitHandler<FormValidationSchema> = (data) => {
        const obj: UsuarioData = {
            username: data.username,
            password: data.password,
            cliente: { id: clienteSeleccionado?.id } 
        };
        addUsuario(obj);
    }

    return (
        
        <div>
        <form id="form_div" className="card flex flex-column gap-3 align-items-center" onSubmit={handleSubmit(handleAddUsuario)}>
            <Controller
                name="username"
                control={control}
                render={({ field }) => (
                    <TextInput
                        id="username_input"
                        placeholder="Username"
                        value={field.value}
                        setValue={field.onChange}
                        invalid={!!errors.username}
                        helperText={errors.username?.message}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <TextInput
                        id="password_input"
                        placeholder="Contraseña"
                        value={field.value}
                        setValue={field.onChange}
                        invalid={!!errors.password}
                        helperText={errors.password?.message}
                    />
                )}
            />
            <Button id="add_pallet_btn" label="Agregar" icon="pi pi-check" autoFocus type="submit" />
        </form>
        </div>
    )
}