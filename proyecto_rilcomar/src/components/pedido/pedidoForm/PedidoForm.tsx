import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { EstadoEnum, Pallet } from "../../../models/Pallet.ts";
import Select from "../../base/form/Select.tsx";
import { useGetClientes } from "../../../querys/ClientesQuerys.ts";
import { Cliente } from "../../../models/Cliente";
import Datepicker from "../../base/form/Datepicker.tsx";
import TransferList from "../../base/form/TransferlLst.tsx";
import { useGetPallets } from "../../../querys/PalletQuerys.ts";
import "./PedidoForm.css";
import { Pedido } from "../../../models/Pedido.ts";
import { useCreatePedido } from "../../../querys/PedidoQuerys.ts";
import { formatDate } from "../../../utils/Utils.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export default function PedidoForm({ createdPedido }) {
    const [cliente, setCliente] = useState<Cliente>();
    const [fechaEntrega, setFechaEntrega] = useState<Date>(new Date());
    const [palletsPedido, setPalletsPedido] = useState<Pallet[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const { data: clientes } = useGetClientes({});
    const { data } = useGetPallets({ estado: "Libre" });
    const [pallets, setPallets] = useState<Pallet[]>([]);

    const { mutate: createPedido } = useCreatePedido({
        onSuccessFn: (data: Pedido) => { createdPedido(data) },
        onErrorFn: () => { createdPedido(null) }
    })

    useEffect(() => {
        if (data) {
            setPallets(data.filter((pallet: Pallet) => pallet.estado === EstadoEnum.Libre));
        }
    }, [data]);

    useEffect(() => {
        console.log(errors);

    }, [errors]);

    useEffect(() => {
        console.log(palletsPedido);

    }, [palletsPedido]);

    const formValidator = z.object({
        cliente: z.unknown().refine(c => c != null, { message: "El cliente no puede ser nulo." }),
        fechaEntrega: z.date().min(new Date(), "La fecha de entrega debe ser posterior a hoy."),
        // palletsPedido: z.array(z.unknown()).min(1, "Debe haber al menos un pallet en el pedido."), Corregir esta validacion
    });

    type FormValidationSchema = z.infer<typeof formValidator>;

    const { handleSubmit } = useForm<FormValidationSchema>({
        defaultValues: {
            cliente: undefined,
            fechaEntrega: new Date()
        },
        resolver: zodResolver(formValidator),
    });

    function handleCreatePedido() {
        const obj: Pedido = {
            cliente: cliente as Cliente,
            fechaEntrega: formatDate(fechaEntrega),
            pallets: palletsPedido
        }
        
        createPedido(obj);
    }

    return (
        <form id="form_div" className="card flex flex-column align-items-center gap-3 " onSubmit={() => handleSubmit(handleCreatePedido)}>
            <div id="form_row" className="flex">
                <Select
                    id="tipo_input"
                    placeholder="Cliente"
                    options={clientes}
                    addedClass="md:w-16rem"
                    selectedValue={cliente as Cliente}
                    setSelectedValue={(value) => setCliente(value as Cliente)}
                    invalid={!!errors.tipo}
                    helperText={errors.tipo}
                    style={{ height: '3.8rem', borderColor: '#1f425d' }}
                />
                <Datepicker
                    label="Fecha Entrega"
                    value={fechaEntrega as Date}
                    setValue={setFechaEntrega}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                />
            </div>
            <TransferList left={pallets} setLeft={setPallets} right={palletsPedido} setRight={setPalletsPedido} />
            <Button id="add_pallet_btn" label="Agregar" icon="pi pi-check" autoFocus onClick={handleCreatePedido} />
        </form>
    )
}