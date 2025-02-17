import React from "react";
import { FormatoEnum, MaterialEnum, Pallet } from "../../../models/Pallet.ts";
import Select from "../../base/form/Select.tsx";
import "./PalletForm.css";
import { Button } from "primereact/button";
import { z } from "zod";
import { useAddPallet } from "../../../querys/PalletQuerys.ts";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../base/form/textInput/TextInput.tsx";


export default function PalletForm({ addedPallet }) {
    const { mutate: addPallet, isPending } = useAddPallet({
        onSuccessFn: (data: Pallet) => { addedPallet(data) },
        onErrorFn: () => { addedPallet(null) }
    })

    const formValidator = z.object({
        tipo: z.string().min(1, "El tipo es obligatorio."),
        peso: z.number().min(1, "El peso debe ser mayor a 0."),
        formato: z.string().min(1, "El formato es obligatorio."),
        observaciones: z.string().max(255, "Las observaciones no pueden exceder los 255 caracteres."),
        cantidad: z.number().min(1, "La cantidad debe ser mayor a 0."),
        ubicacion: z.string().max(255, "La ubicacion no pueden exceder los 255 caracteres."),
    });

    type FormValidationSchema = z.infer<typeof formValidator>;

    const { handleSubmit, control, formState: { errors } } = useForm<FormValidationSchema>({
        defaultValues: {
            tipo: "",
            peso: 0,
            formato: "",
            observaciones: "",
            cantidad: 1,
            ubicacion: "Depósito",
        },
        resolver: zodResolver(formValidator),
    });

    const materialOptions = Object.keys(MaterialEnum)
        .filter((key) => isNaN(Number(key)))
        .map((key) => key);

    const formatoOptions = Object.values(FormatoEnum);

    const handleAddPallet: SubmitHandler<FormValidationSchema> = (data) => {
        const obj: Pallet = {
            tipo: data.tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            peso: data.peso,
            formato: data.formato,
            ubicacion: data.ubicacion,
            observaciones: data.observaciones,
        }
        const cantidad = data.cantidad;

        addPallet({ pallet: obj, cantidad });
    }

    return (
        <form id="form_div" className="card flex flex-column align-items-center gap-3" onSubmit={handleSubmit(handleAddPallet)}>
            <div id="form_row" className="flex">
                <div className="input-group">
                    <Controller
                        name="tipo"
                        control={control}
                        render={({ field }) => (
                            <Select
                                id="tipo_input_palletForm"
                                placeholder="Tipo"
                                options={materialOptions}
                                addedClass="md:w-11rem"
                                selectedValue={field.value}
                                setSelectedValue={field.onChange}
                                invalid={!!errors.tipo}
                                helperText={errors.tipo?.message}
                            />
                        )}
                    />
                </div>
                <div className="input-group">
                    <Controller
                        name="peso"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                id="peso_input_palletForm"
                                placeholder="Peso"
                                suffix="Kg"
                                isNumber={true}
                                addedClass="md:w-11rem"
                                value={field.value}
                                setValue={field.onChange}
                                invalid={!!errors.peso}
                                helperText={errors.peso?.message}
                            />
                        )}
                    />
                </div>
            </div>
            <div id="form_row" className="flex">
                <div className="input-group">
                    <Controller
                        name="formato"
                        control={control}
                        render={({ field }) => (
                            <Select
                                id="formato_input_palletForm"
                                placeholder="Formato"
                                options={formatoOptions}
                                addedClass="md:w-24rem"
                                selectedValue={field.value}
                                setSelectedValue={field.onChange}
                                invalid={!!errors.formato}
                                helperText={errors.formato?.message}
                            />
                        )}
                    />
                </div>
            </div>
            <div id="form_row" className="flex">
                <div className="input-group">
                    <Controller
                        name="cantidad"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                id="cantidad_input_palletForm"
                                placeholder="Cantidad"
                                isNumber={true}
                                addedClass="md:w-11rem"
                                value={field.value}
                                setValue={field.onChange}
                                invalid={!!errors.cantidad}
                                helperText={errors.cantidad?.message}
                            />
                        )}
                    />
                </div>
                <div className="input-group">
                    <Controller
                        name="ubicacion"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                id="ubicacion_input_palletForm"
                                placeholder="Ubicación"
                                addedClass="md:w-11rem"
                                value={field.value}
                                setValue={field.onChange}
                                invalid={!!errors.ubicacion}
                                helperText={errors.ubicacion?.message}
                            />
                        )}
                    />
                </div>
            </div>
            <div id="form_row" className="flex">
                <Controller
                    name="observaciones"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            id="observaciones_input_palletForm"
                            placeholder="Observaciones"
                            isMultiline={true}
                            addedClass="md:w-24rem"
                            value={field.value}
                            setValue={field.onChange}
                            invalid={!!errors.observaciones}
                            helperText={errors.observaciones?.message}
                        />
                    )}
                />
            </div>
            <Button id="add_pallet_btn" label="Agregar" icon="pi pi-check" autoFocus type="submit" loading={isPending} />
        </form>
    )
}