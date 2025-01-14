import React, { useRef, useState } from "react";
import TableComponent, { ColumnProps } from "../../base/table/TableComponent.tsx";
import "./PalletsTable.css";
import { Button } from 'primereact/button';
import BaseDialog from "../../base/dialog/BaseDialog.tsx";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { DataTableValueArray } from "primereact/datatable";
import Select from "../../base/form/Select.tsx";
import { Pedido } from "../../../models/Pedido.ts";

interface HistorialTableProps {
    selectedRows: DataTableValueArray;
    setSelectedRows: (rows: DataTableValueArray) => void;
}

const viewButtonRender = (rowData: Pedido) => {
    return <span>
        <Button id="view_btn" icon="pi pi-eye" rounded text size="large" onClick={() => navigate(`/pedidos/${rowData.id}`, { state: { pallet: rowData } })} />
    </span>
}


export default function HistorialTable({ selectedRows, setSelectedRows }: HistorialTableProps) {
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [showModal, setShowModal] = useState(false);
    const toast = useRef<Toast>(null);
    let data: any[] = [];

    const navigate = useNavigate();


    const columns: ColumnProps[] = [
        { field: 'id', header: 'ID' },
        //{ field: , header: 'Cantidad' },
        { field: 'fechaCreacion', header: 'Fecha Inicio' }, 
        { field: 'ultimaActualizacion', header: 'Fecha Fin' },
    ];

    const paginationModel = { page: 0, pageSize: 5 };


    const renderHeader = () => {
        return (
            <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div id="filters_div">
                    <div id="select_filter_div">
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            placeholder="Fecha Inicio"
                            className="md:w-12rem"
                        />
                        <Button disabled={fechaInicio === ""} icon="pi pi-times" className="clear_btn" rounded text severity="contrast" onClick={() => setFechaInicio("")} />
                    </div>
                    <div id="select_filter_div">
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            placeholder="Fecha Fin"
                            className="md:w-12rem"
                        />
                        <Button disabled={fechaFin === ""} icon="pi pi-times" className="clear_btn" rounded text severity="contrast" onClick={() => setFechaFin("")} />
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
                rowClick={false}
                rowAction={viewButtonRender}
            />
            <BaseDialog
                header={selectedRows.length > 1 ? "" : ""}
                content={
                    <DeletePallet
                        selectedPallets={selectedRows}
                        closeModal={() => { setShowModal(false); setSelectedRows([]); }}
                    />}
                visible={showModal}
                setVisible={(value) => setShowModal(value)}
                width="30vw"
            />
        </div>
    )
}