import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Pallet } from "../../../models/Pallet.ts";
import Select from "../../base/form/Select.tsx";
import { useGetClientes } from "../../../querys/ClienteQuerys.ts";
import { Cliente } from "../../../models/Cliente";
import Datepicker from "../../base/form/Datepicker.tsx";
import TransferList from "../../base/form/TransferlLst.tsx";
import { useGetPallets } from "../../../querys/PalletQuerys.ts";
import "./PedidoForm.css";
import { Pedido } from "../../../models/Pedido.ts";
//import { EstadoEnum } from "../../../models/Pedido.ts";
import { useCreatePedido } from "../../../querys/PedidoQuerys.ts";
import { formatDate } from "../../../utils/Utils.ts";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export default function PedidoForm({ createdPedido }) {
    const { data: clientes } = useGetClientes({});
    const { data } = useGetPallets({ estado: "Libre" });
    const [pallets, setPallets] = useState<Pallet[]>([]);

    const { mutate: createPedido } = useCreatePedido({
        onSuccessFn: (data: Pedido) => { createdPedido(data) },
        onErrorFn: () => { createdPedido(null) }
    })

    useEffect(() => {
        if (data) {
            setPallets(data);
        }
    }, [data]);

    function getTomorrowDate() {
        var tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 1);

        return tomorrow;
    }

    const formValidator = z.object({
        cliente: z.unknown().refine(c => c != null, { message: "El cliente no puede ser nulo." }),
        fechaEntrega: z.date().min(new Date(), { message: "La fecha de entrega debe ser posterior a hoy." }),
        palletsPedido: z.array(z.unknown()).min(1, "Debe haber al menos un pallet en el pedido.")
    });

    type FormValidationSchema = z.infer<typeof formValidator>;

    const { handleSubmit, control, formState: { errors } } = useForm<FormValidationSchema>({
        defaultValues: {
            cliente: undefined,
            fechaEntrega: getTomorrowDate(),
            palletsPedido: []
        },
        resolver: zodResolver(formValidator),
    });

    const handleCreatePedido: SubmitHandler<FormValidationSchema> = (data) => {        
        const obj: Pedido = {
            cliente: data.cliente as Cliente,
            fechaEntrega: formatDate(data.fechaEntrega ?? new Date()),
            pallets: data.palletsPedido as Pallet[],
            estado: "Creado"
        }        

        createPedido(obj);
    }

    return (
        <form id="form_div" className="card flex flex-column align-items-center gap-3" onSubmit={handleSubmit(handleCreatePedido)}>
            <div className="flex form_row">
                <Controller
                    name="cliente"
                    control={control}
                    render={({ field }) => (
                        <Select
                            id="tipo_input"
                            placeholder="Cliente"
                            options={clientes}
                            addedClass="md:w-16rem"
                            selectedValue={field.value}
                            setSelectedValue={field.onChange}
                            invalid={!!errors.cliente}
                            helperText={errors.cliente?.message}
                        />
                    )}
                />
                <Controller
                    name="fechaEntrega"
                    control={control}
                    render={({ field }) => (
                        <Datepicker
                            label="Fecha Entrega"
                            value={field.value as Date}
                            setValue={(date) => field.onChange(date)}
                            minDate={getTomorrowDate()}
                            dateFormat="dd/mm/yy"
                            helperText={errors.fechaEntrega?.message}
                        />
                    )}
                />
            </div>
            <div id="list_div" className="flex form_row">
                <Controller
                    name="palletsPedido"
                    control={control}
                    render={({ field }) => (
                        <TransferList
                            left={pallets}
                            setLeft={setPallets}
                            right={field.value as Pallet[]}
                            setRight={field.onChange}
                            invalid={!!errors.palletsPedido}
                            helperText={errors.palletsPedido?.message}
                        />
                    )}
                />
            </div>
            <Button id="add_pallet_btn" label="Agregar" icon="pi pi-check" autoFocus type="submit" />
        </form>
    )
}