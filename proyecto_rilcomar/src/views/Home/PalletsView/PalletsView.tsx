import PalletsTable from "../../../components/palletsTable/PalletsTable.tsx";
import BaseDialog from "../../../components/base/dialog/BaseDialog.tsx";
import PalletForm from "../../../components/palletForm/PalletForm.tsx";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Pallet } from "../../../models/Pallet/Pallet.ts";
import React, { useEffect, useRef, useState } from "react";
import { DataTableValueArray } from "primereact/datatable";


export default function PalletsView() {
    const [visible, setVisible] = useState<boolean>(false);
    const [pallets, setPallets] = useState<Pallet[]>();
    const [selectedRows, setSelectedRows] = useState<DataTableValueArray>([]);

    const toast = useRef<Toast>(null);

    useEffect(() => {
        getPallets();
    }, []);

    function getPallets() {
        fetch("http://localhost:8080/rilcomar/pallets")
            .then((response) => response.json())
            .then((data) => {
                setPallets(data);
            });
    };

    function addPallet(data) {
        setVisible(false);
        if (data) {
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Pallet agregado exitosamente', life: 3000 });
            getPallets();
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'El Pallet no pudo ser agregado', life: 3000 });
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <div id="button_div">
                <Button id="add_pallet_btn" label="Agregar Pallet" icon="pi pi-plus" onClick={() => setVisible(true)} />
            </div>
            <PalletsTable pallets={pallets} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
            <BaseDialog header="Nuevo Pallet" content={<PalletForm addPallet={addPallet} />} visible={visible} setVisible={setVisible} />
        </div>
    )
}