import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import TextInput from "../../base/form/textInput/TextInput.tsx";
import { Button } from "primereact/button";
import { Cliente } from "../../../models/Cliente.ts";
import { useAddCliente } from "../../../querys/ClienteQuerys.ts";

export default function ClienteForm({ addedCliente }) {
    const { mutate: addCliente } = useAddCliente({
        onSuccessFn: (data: Cliente) => { addedCliente(data) },
        onErrorFn: () => { addedCliente(null) }
    })

    const formValidator = z.object({
        nombre: z.string().min(1, "El nombre es obligatorio."),
        mail: z.string().email("El correo electrónico ingresado no es válido."),
        telefono: z.string().min(1, "El teléfono es obligatorio.")
    });

    type FormValidationSchema = z.infer<typeof formValidator>;

    const { handleSubmit, control, formState: { errors } } = useForm<FormValidationSchema>({
        resolver: zodResolver(formValidator),
    });

    const handleAddCliente: SubmitHandler<FormValidationSchema> = (data) => {
        const obj: Cliente = {
            nombre: data.nombre,
            mail: data.mail,
            telefono: data.telefono
        }

        addCliente(obj);
    }

    return (
        <form id="form_div" className="card flex flex-column gap-3 align-items-center" onSubmit={handleSubmit(handleAddCliente)}>
            <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                    <TextInput
                        id="nombre_input"
                        placeholder="Nombre"
                        value={field.value}
                        setValue={field.onChange}
                        invalid={!!errors.nombre}
                        helperText={errors.nombre?.message}
                    />
                )}
            />
            <Controller
                name="mail"
                control={control}
                render={({ field }) => (
                    <TextInput
                        id="mail_input"
                        placeholder="Correo Electrónico"
                        value={field.value}
                        setValue={field.onChange}
                        invalid={!!errors.mail}
                        helperText={errors.mail?.message}
                    />
                )}
            />
            <Controller
                name="telefono"
                control={control}
                render={({ field }) => (
                    <TextInput
                        id="telefono_input"
                        placeholder="Teléfono"
                        prefix="+598"
                        addedClass="md:w-17rem"
                        value={field.value}
                        setValue={field.onChange}
                        invalid={!!errors.telefono}
                        helperText={errors.telefono?.message}
                    />
                )}
            />
            <Button id="add_pallet_btn" label="Agregar" icon="pi pi-check" autoFocus type="submit" />
        </form>
    )
}