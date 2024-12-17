import React, { useRef, useState } from "react";
import { FormatoEnum, MaterialEnum } from "../../../models/Pallet/Pallet.ts";
import Select from "../../base/form/Select.tsx";
import TextInput from "../../base/form/TextInput.tsx";
import "./PalletForm.css";
import { Button } from "primereact/button";
import { z } from "zod";


export default function PalletForm({ addPallet }) {
    const [tipo, setTipo] = useState("");
    const [peso, setPeso] = useState<number>();
    const [formato, setFormato] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const formValidator = z.object({
        tipo: z.string().min(1, "El tipo es obligatorio."),
        peso: z.number().min(1, "El peso debe ser mayor a 0."),
        formato: z.string().min(1, "El formato es obligatorio."),
        observaciones: z.string().max(255, "Las observaciones no pueden exceder los 255 caracteres."),
    });

    const materialOptions = Object.keys(MaterialEnum)
        .filter((key) => isNaN(Number(key)))
        .map((key) => key);

    const formatoOptions = Object.keys(FormatoEnum)
        .filter((key) => isNaN(Number(key)))
        .map((key) => key.replace("_", " "));

    function handleAddPallet() {

        const obj = {
            estado: "Libre",
            tipo: tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            peso,
            formato,
            observaciones
        }

        const validationResult = formValidator.safeParse(obj);

        if (!validationResult.success) {
            const fieldErrors = validationResult.error.format();
            setErrors({
                tipo: fieldErrors.tipo?._errors?.[0] || "",
                peso: fieldErrors.peso?._errors?.[0] || "",
                formato: fieldErrors.formato?._errors?.[0] || "",
                observaciones: fieldErrors.observaciones?._errors?.[0] || "",
            });
            return;
        }

        setErrors({});

        fetch("http://localhost:8080/rilcomar/pallets", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        })
            .then((response) => {
                if (response.ok) {
                    addPallet(response);
                } else {
                    addPallet(null);
                }
            })
            .catch(() => addPallet(null));
    }

    return (
        <div id="form_div" className="card flex flex-column align-items-center gap-3 ">
            <div id="form_row" className="flex">
                <Select
                    id="tipo_input"
                    placeholder="Tipo"
                    options={materialOptions}
                    addedClass="md:w-10rem"
                    selectedValue={tipo}
                    setSelectedValue={(value) => setTipo(value)}
                    invalid={!!errors.tipo}
                    helperText={errors.tipo}
                />
                <TextInput
                    id="peso_input"
                    placeholder="Peso"
                    suffix="Kg"
                    isNumber={true}
                    addedClass="md:w-10rem"
                    value={peso as number}
                    setValue={(value) => setPeso(value as number)}
                    invalid={!!errors.peso}
                    helperText={errors.peso}
                />
            </div>
            <Select
                id="formato_input"
                placeholder="Formato"
                options={formatoOptions}
                addedClass="md:w-24rem"
                selectedValue={formato}
                setSelectedValue={(value) => setFormato(value)}
                invalid={!!errors.formato}
                helperText={errors.formato}
            />
            <TextInput
                placeholder="Observaciones"
                isMultiline={true}
                addedClass="md:w-24rem"
                value={observaciones}
                setValue={(value) => setObservaciones(value as string)}
                invalid={!!errors.observaciones}
                helperText={errors.observaciones}
            />
            <Button id="add_pallet_btn" label="Agregar" icon="pi pi-check" autoFocus onClick={handleAddPallet} />
        </div>
    )
}