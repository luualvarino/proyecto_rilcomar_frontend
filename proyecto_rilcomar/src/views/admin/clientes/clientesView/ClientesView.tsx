import React, { useRef, useState } from "react";
import ClientesDataview from "../../../../components/cliente/clientesDataview/ClientesDataview.tsx";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import ClienteForm from "../../../../components/cliente/clienteForm/ClienteForm.tsx";
import BaseDialog from "../../../../components/base/dialog/BaseDialog.tsx";

export default function ClientesView() {
    const [visible, setVisible] = useState<boolean>(false);

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
                <h1 id="pallets_title">Clientes</h1>
                <Button id="add_pallet_btn" className="button_filled" label="Agregar Cliente" icon="pi pi-plus" onClick={() => setVisible(true)} />
            </div>
            <ClientesDataview />
            <BaseDialog header="Nuevo Cliente" content={<ClienteForm addedCliente={showNotification} />} visible={visible} setVisible={setVisible}  width="30vw"/>
        </div>
    )
}