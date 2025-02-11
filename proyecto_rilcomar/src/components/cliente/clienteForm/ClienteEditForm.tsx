import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import TextInput from "../../base/form/textInput/TextInput.tsx";
import { Button } from "primereact/button";
import { Cliente } from "../../../models/Cliente.ts";
import { useEditCliente } from "../../../querys/ClienteQuerys.ts";

export default function ClienteEditForm({ clienteToEdit, onEditSuccess }) {
    const formValidator = z.object({
        nombre: z.string().min(1, "El nombre es obligatorio."),
        mail: z.string().email("El correo electrónico ingresado no es válido."),
        telefono: z.string().min(1, "El teléfono es obligatorio."),
    });

    type FormValidationSchema = z.infer<typeof formValidator>;

    const { handleSubmit, control, formState: { errors }, reset } = useForm<FormValidationSchema>({
        resolver: zodResolver(formValidator),
        defaultValues: {
            nombre: "",
            mail: "",
            telefono: "",
        }
    });

    useEffect(() => {
        if (clienteToEdit) {
            reset({
                nombre: clienteToEdit.nombre || "",
                mail: clienteToEdit.mail || "",
                telefono: clienteToEdit.telefono || "",
            });
        }
    }, [clienteToEdit, reset]);

    const { mutate: editCliente, isPending } = useEditCliente({
        onSuccessFn: (data: Cliente) => {
            onEditSuccess(data);
        },
        onErrorFn: () => {
            onEditSuccess(null);
        }
    });

    const handleEditCliente: SubmitHandler<FormValidationSchema> = (data) => {
        const obj: Cliente = {
            id: clienteToEdit?.id,
            nombre: data.nombre,
            mail: data.mail,
            telefono: data.telefono
        };

        editCliente(obj);
    };

    return (
        <div>
            <form id="form_div" className="card flex flex-column gap-3 align-items-center" onSubmit={handleSubmit(handleEditCliente)}>
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
                <div style={{ marginRight: '4rem' }}>
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
                </div>
                <Button id="add_pallet_btn" label="Guardar Cambios" icon="pi pi-check" autoFocus type="submit" loading={isPending} />
            </form>
        </div>
    );
}