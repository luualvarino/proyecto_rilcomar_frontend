import { EstadoEnum, FormatoEnum, MaterialEnum, Pallet } from "../../../models/Pallet/Pallet.ts";
import React, { useRef, useState } from "react";
import TableComponent, { ColumnProps } from "../../base/table/TableComponent.tsx";
import "./PalletsTable.css";
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import BaseDialog from "../../base/dialog/BaseDialog.tsx";
import DeletePallet from "../deletePallet/DeletePallet.tsx";
import { Toast } from "primereact/toast";
import { useGetPallets } from "../../../querys/PalletQuerys.ts";
import Select from "../../base/form/Select.tsx";


export default function PalletsTable({ selectedRows, setSelectedRows }) {
    const [estado, setEstado] = useState("");
    const [tipo, setTipo] = useState("");
    const [formato, setFormato] = useState("");
    const [showModal, setShowModal] = useState(false);
    const toast = useRef<Toast>(null);
    const { data } = useGetPallets({ estado, tipo, formato })

    function showNotification(data) {
        if (data) {
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Pallet eliminado exitosamente', life: 3000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'El Pallet no pudo ser eliminado', life: 3000 });
        }
    };

    const estaDisponibleRender = (rowData: Pallet) => {
        const estaDisp = rowData.estado.toString() === "Libre" ? "Si" : "No";
        return <span>{estaDisp}</span>;
    };

    const columns: ColumnProps[] = [
        { field: 'id', header: 'ID' },
        { field: 'estado', header: 'Estado' },
        { field: 'tipo', header: 'Tipo' }, //Buscar forma de mostrar los valores escritos bien (con tilde)
        { field: 'formato', header: 'Formato' },
        { field: 'estaDisponible', header: 'Esta Disponible', body: estaDisponibleRender },
        { field: 'observaciones', header: 'Observaciones' }
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    const estados = Object.keys(EstadoEnum)
        .filter((key) => isNaN(Number(key)))
        .map((key) => key.replace("_", " "));

    const tipos = Object.keys(MaterialEnum)
        .filter((key) => isNaN(Number(key)))
        .map((key) => key);

    const formatos = Object.keys(FormatoEnum)
        .filter((key) => isNaN(Number(key)))
        .map((key) => key.replace("_", " "));

    const renderHeader = () => {
        return (
            <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div id="filters_div">
                    <div id="select_filter_div">
                        <Select
                            placeholder="Estado"
                            options={estados}
                            addedClass="md:w-12rem"
                            selectedValue={estado}
                            setSelectedValue={(value) => setEstado(value)}
                        />
                        <Button disabled={estado === ""} icon="pi pi-times" className="clear_btn" rounded text severity="contrast" onClick={() => setEstado("")} />
                    </div>
                    <div id="select_filter_div">
                        <Select
                            placeholder="Tipo"
                            options={tipos}
                            addedClass="md:w-12rem"
                            selectedValue={tipo}
                            setSelectedValue={(value) => setTipo(value)}
                        />
                        <Button disabled={tipo === ""} icon="pi pi-times" className="clear_btn" rounded text severity="contrast" onClick={() => setTipo("")} />
                    </div>
                    <div id="select_filter_div">
                        <Select
                            placeholder="Formato"
                            options={formatos}
                            addedClass="md:w-12rem"
                            selectedValue={formato}
                            setSelectedValue={(value) => setFormato(value)}
                        />
                        <Button disabled={formato === ""} icon="pi pi-times" className="clear_btn" rounded text severity="contrast" onClick={() => setFormato("")} />
                    </div>
                </div>

                {selectedRows.length > 0 && <Button id="delete_btn" icon="pi pi-trash" severity="danger" onClick={() => setShowModal(true)} />}
            </div>
        );
    };

    return (
        <div>
            <Toast ref={toast} />
            <TableComponent
                data={data}
                columns={columns}
                header={renderHeader}
                paginationModel={paginationModel}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                rowClick={true}
            />
            <BaseDialog
                header={selectedRows.length > 1 ? "Desea eliminar los Pallets seleccionados?" : "Desea eliminar el Pallet seleccionado?"}
                content={
                    <DeletePallet
                        selectedPallets={selectedRows}
                        closeModal={() => { setShowModal(false); setSelectedRows([]); }}
                        showNotification={showNotification}
                    />}
                visible={showModal}
                setVisible={(value) => setShowModal(value)}
                width="30vw"
            />
        </div>
    )
}