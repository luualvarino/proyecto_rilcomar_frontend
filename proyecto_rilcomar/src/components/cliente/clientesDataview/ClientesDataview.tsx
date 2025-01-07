import React, { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { useGetClientes } from "../../../querys/ClientesQuerys.ts";
import { classNames } from "primereact/utils";
import { Cliente } from "../../../models/Cliente.ts";
import Dataview from "../../base/dataview/Dataview.tsx";

export default function ClientesTable() {
    const [nombre, setNombre] = useState("");
    const { data } = useGetClientes({ nombre })

    const itemTemplate = (item: Object, index: number) => {
        const cliente = item as Cliente;
        return (
            <div className="col-12" key={cliente.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{cliente.nombre}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{cliente.mail}</span>
                                </span>
                            </div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{cliente.telefono}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded"></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Dataview data={data} itemTemplate={itemTemplate} />
        </div>
    )
}