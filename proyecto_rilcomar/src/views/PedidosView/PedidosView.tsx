import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { DataTableValueArray } from "primereact/datatable";
import "../PalletsView/PalletsView.css";
import PedidosTable from "../../components/pedido/pedidosTable/PedidosTable.tsx";

export default function PedidosView() {
    const [selectedRows, setSelectedRows] = useState<DataTableValueArray>([]);

    const toast = useRef<Toast>(null);

    function showNotification(data) {
        if (data) {
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Pedido creado exitosamente', life: 3000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'El Pedido no pudo ser creado', life: 3000 });
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <div id="table_header_div" className="card flex" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h1 id="pallets_title">Pedidos</h1>
                <Button id="add_pallet_btn" label="Agregar Pedido" icon="pi pi-plus" />
            </div>
            <PedidosTable selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
        </div>
    )
}