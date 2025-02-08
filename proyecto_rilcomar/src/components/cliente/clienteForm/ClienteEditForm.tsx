import { zodResolver } from "@hookform/resolvers/zod";
import React , {useEffect, useRef} from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import TextInput from "../../base/form/textInput/TextInput.tsx";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Cliente } from "../../../models/Cliente.ts";
import { useEditCliente } from "../../../querys/ClienteQuerys.ts";

export default function ClienteEditForm({ clienteToEdit, onEditSuccess }) {

    const toast = useRef<Toast>(null);

    const formValidator = z.object({
        nombre: z.string().min(1, "El nombre es obligatorio."),
        mail: z.string().email("El correo electrónico ingresado no es válido."),
        telefono: z.string().min(1, "El teléfono es obligatorio."),
    });

    type FormValidationSchema = z.infer<typeof formValidator>;

    const { handleSubmit, control, setValue, formState: { errors }, reset } = useForm<FormValidationSchema>({
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

    const { mutate: editCliente } = useEditCliente({
        onSuccessFn: (data: Cliente) => { 
            toast.current?.show({ severity: "success", summary: "Éxito", detail: "Cliente editado correctamente", life: 3000 });
            onEditSuccess();
        },
        onErrorFn: () => { 
            toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo editar el cliente", life: 3000 });
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
            
        <Toast ref={toast} /> 

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
            <Button id="edit_cliente_btn" label="Guardar Cambios" icon="pi pi-check" autoFocus type="submit" />
        </form>
        </div>
    );
}