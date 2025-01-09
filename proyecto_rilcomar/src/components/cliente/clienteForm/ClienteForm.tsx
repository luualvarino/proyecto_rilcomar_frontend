import React, { useRef, useState } from "react";
import Select from "../../base/form/Select.tsx";
import TextInput from "../../base/form/TextInput.tsx";
import "./ClienteForm.css";
import { Button } from "primereact/button";
import { z } from "zod";

export default function ClienteForm({ addCliente }) {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [mail, setMail] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const formValidator = z.object({
        nombre: z.string().min(1, "El nombre es obligatorio."),
        telefono: z.string().optional(), 
        mail: z.string().optional(),
    }).refine(
        (data) => data.telefono?.trim() || data.mail?.trim(), //Podriamos poner de que puede ser uno o otro
        {
          message: "Debe ingresar al menos un telefono o un correo.",
          path: ["telefono", "mail"],
        }
    );

    function handleAddPallet() {

        const obj = {
            nombre,
            telefono,
            mail
        }

        const validationResult = formValidator.safeParse(obj);

        if (!validationResult.success) {
            const fieldErrors = validationResult.error.format();
            setErrors({
                nombre: fieldErrors.nombre?._errors?.[0] || "",
                telefono: fieldErrors.telefono?._errors?.[0] || "",
                mail: fieldErrors.mail?._errors?.[0] || "",
            });
            return;
        }

        setErrors({});
          
        fetch("http://localhost:8080/rilcomar/cliente", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then(data => addCliente(data));
                } else {
                    addCliente(null);
                }
            })
            .catch(() => addCliente(null));
    }

    return (
        <div id="form_div" className="card flex flex-column align-items-center gap-3 ">
            <div id="form_row" className="flex">
                <TextInput
                    placeholder="Nombre"
                    isMultiline={true}
                    addedClass="md:w-24rem"
                    value={nombre}
                    setValue={(value) => setNombre(value as string)}
                    invalid={!!errors.nombre}
                    helperText={errors.nombre}
                />
                <TextInput
                    placeholder="telefono"
                    isMultiline={true}
                    addedClass="md:w-24rem"
                    value={telefono}
                    setValue={(value) => setTelefono(value as string)}
                    invalid={!!errors.telefono}
                    helperText={errors.telefono}
                />
                <TextInput
                    placeholder="mail"
                    isMultiline={true}
                    addedClass="md:w-24rem"
                    value={mail}
                    setValue={(value) => setMail(value as string)}
                    invalid={!!errors.mail}
                    helperText={errors.mail}
                />
            </div>
            
            <Button id="add_pallet_btn" label="Agregar" icon="pi pi-check" autoFocus onClick={handleAddPallet} />
        </div>
    )
}
