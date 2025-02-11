import React, { useRef, useState } from "react";
import "../../pallets/palletsView/PalletsView.css";
import PedidosTable from "../../../../components/pedido/pedidosTable/PedidosTable.tsx";
import { Button } from "primereact/button";
import PedidoForm from "../../../../components/pedido/pedidoForm/PedidoForm.tsx";
import BaseDialog from "../../../../components/base/dialog/BaseDialog.tsx";
import { Toast } from "primereact/toast";

export default function PedidosView() {
    const [visible, setVisible] = useState<boolean>(false);

    const toast = useRef<Toast>(null);

    function showNotification(data) {
        setVisible(false);
        if (data) {
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Pedido agregado exitosamente', life: 3000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'El Pedido no pudo ser agregado', life: 3000 });
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <div id="table_header_div" className="card flex" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h1 id="pallets_title">Pedidos</h1>
                <Button id="add_pallet_btn" label="Crear Pedido" icon="pi pi-plus" onClick={() => setVisible(true)} />
            </div>
            <PedidosTable />
            <BaseDialog header="Nuevo Pedido" content={<PedidoForm createdPedido={showNotification}/>} visible={visible} setVisible={setVisible} width="60vw" />
        </div>
    )
}