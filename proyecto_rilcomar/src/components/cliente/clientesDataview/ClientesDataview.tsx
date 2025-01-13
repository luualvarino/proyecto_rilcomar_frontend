import React, { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { useGetClientes } from "../../../querys/ClienteQuerys.ts";
import { classNames } from "primereact/utils";
import { Cliente } from "../../../models/Cliente.ts";
import Dataview from "../../base/dataview/Dataview.tsx";
import "./ClientesDataview.css";
import BaseDialog from "../../base/dialog/BaseDialog.tsx";
import DeleteCliente from "../deleteClient/DeleteCliente.tsx";
import { Toast } from "primereact/toast";

export default function ClientesDataview() {
    const [nombre, setNombre] = useState("");
    const { data } = useGetClientes({ nombre });
    const [selectedCliente, setSelectedCliente] = useState<Cliente>();
    const [showModal, setShowModal] = useState(false);
    const toast = useRef<Toast>(null);

    function showNotification(data) {
        console.log(data);

        if (data) {
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Pedido eliminado exitosamente', life: 3000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'El Pedido no pudo ser eliminado', life: 3000 });
        }
    };

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
                                    <i className="pi pi-envelope"></i>
                                    <span className="font-semibold">{cliente.mail}</span>
                                </span>
                            </div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-phone"></i>
                                    <span className="font-semibold">{cliente.telefono}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button id="deleteClient_btn" icon="pi pi-trash" className="p-button-rounded" onClick={() => {setSelectedCliente(cliente); setShowModal(true);  }}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Toast ref={toast} />
            <Dataview data={data} itemTemplate={itemTemplate} />
            <BaseDialog
                header={`Desea eliminar a ${selectedCliente?.nombre} de la lista de clientes?`}
                content={
                    <DeleteCliente
                        cliente={selectedCliente}
                        closeModal={() => { setShowModal(false); setSelectedCliente(undefined); }}
                        showNotification={showNotification}
                    />}
                visible={showModal}
                setVisible={(value) => setShowModal(value)}
                width="30vw"
            />
        </div>
    )
}