import PalletsTable from "../../../components/pallet/palletsTable/PalletsTable.tsx";
import BaseDialog from "../../../components/base/dialog/BaseDialog.tsx";
import PalletForm from "../../../components/pallet/palletForm/PalletForm.tsx";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { DataTableValueArray } from "primereact/datatable";
import "./PalletsView.css";


export default function PalletsView() {
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<DataTableValueArray>([]);

    const toast = useRef<Toast>(null);

    function showNotification(data) {
        setVisible(false);
        if (data) {
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Pallet agregado exitosamente', life: 3000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'El Pallet no pudo ser agregado', life: 3000 });
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <div id="table_header_div" className="card flex" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h1 id="pallets_title">Pallets</h1>
                <Button id="add_pallet_btn" label="Agregar Pallet" icon="pi pi-plus" onClick={() => setVisible(true)} />
            </div>
            <PalletsTable selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
            <BaseDialog header="Nuevo Pallet" content={<PalletForm addPallet={showNotification} />} visible={visible} setVisible={setVisible} />
        </div>
    )
}