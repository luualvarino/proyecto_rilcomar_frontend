import { EstadoEnum, FormatoEnum, MaterialEnum, Pallet } from "../../../models/Pallet.ts";
import React, { useRef, useState } from "react";
import TableComponent, { ColumnProps } from "../../base/table/TableComponent.tsx";
import "./PalletsTable.css";
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
import { useGetPalletsPorPedido } from "../../../querys/PalletQuerys.ts";
import Select from "../../base/form/Select.tsx";
import { useNavigate } from "react-router-dom";
import { DataTableValueArray } from "primereact/datatable";

interface PalletsTableProps {
    pedidoId: number;
    selectedRows: DataTableValueArray;
    setSelectedRows: (rows: DataTableValueArray) => void;
}

export default function PalletsTable({ pedidoId, selectedRows, setSelectedRows }: PalletsTableProps) {
    const [estado, setEstado] = useState("");
    const [tipo, setTipo] = useState("");
    const [formato, setFormato] = useState("");
    const [showModal, setShowModal] = useState(false);
    const toast = useRef<Toast>(null);

    const { data } = useGetPalletsPorPedido(pedidoId);

    const navigate = useNavigate();

    const viewButtonRender = (rowData: Pallet) => {
        return <span>
            <Button id="view_btn" icon="pi pi-eye" rounded text size="large" onClick={() => navigate(`/pallets/${rowData.id}`, { state: { pallet: rowData } })} />
        </span>
    }

    const columns: ColumnProps[] = [
        { field: 'id', header: 'ID' },
        { field: 'estado', header: 'Estado' },
        { field: 'tipo', header: 'Tipo' }, //Buscar forma de mostrar los valores escritos bien (con tilde)
        { field: 'formato', header: 'Formato' },
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
                rowClick={false}
                rowAction={viewButtonRender}
            />
        </div>
    )
}