import ClienteTable from "../../../components/cliente/clienteTable/ClienteTable.tsx";
import BaseDialog from "../../../components/base/dialog/BaseDialog.tsx";
import ClienteForm from "../../../components/cliente/clienteForm/ClienteForm.tsx";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { DataTableValueArray } from "primereact/datatable";
import "./ClientesView.css";


export default function CleintesView() {
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<DataTableValueArray>([]);

    const toast = useRef<Toast>(null);

    function showNotification(data) {
        setVisible(false);
        if (data) {
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Cliente agregado exitosamente', life: 3000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'El Cliente no pudo ser agregado', life: 3000 });
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <div id="table_header_div" className="card flex" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h1 id="cliente_title">Cliente</h1>
                <Button id="add_cliente_btn" label="Agregar Cliente" icon="pi pi-plus" onClick={() => setVisible(true)} />
            </div>
            <ClienteTable selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
            <BaseDialog header="Nuevo Cliente" content={<ClienteForm addCliente={showNotification} />} visible={visible} setVisible={setVisible} />
        </div>
    )
}