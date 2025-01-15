import React, { useRef, useState } from "react";
import TableComponent, { ColumnProps } from "../../base/table/TableComponent.tsx";
import "./PalletsTable.css";
import { Button } from 'primereact/button';
import BaseDialog from "../../base/dialog/BaseDialog.tsx";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { DataTableValueArray } from "primereact/datatable";
import { Pedido } from "../../../models/Pedido.ts";
import { Cliente } from "../../../models/Cliente.ts";
import { useGetPedidosCliente } from "../../../querys/PedidoQuerys.ts";

interface HistorialTableProps {
    selectedRows: DataTableValueArray;
    setSelectedRows: (rows: DataTableValueArray) => void;
}

const viewButtonRender = (rowData: Pedido) => {
    return <span>
        <Button id="view_btn" icon="pi pi-eye" rounded text size="large" onClick={() => navigate(/pedidos/${rowData.id}, { state: { pallet: rowData } })} />
    </span>
}

export default function HistorialTable({ selectedRows, setSelectedRows }: HistorialTableProps) {
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [showModal, setShowModal] = useState(false);
    const toast = useRef<Toast>(null);

    //cliente logueado
    const clientePrueba: Cliente = {
        id: 1,
        nombre: "Juan Pérez",
        telefono: "123456789",
        mail: "juan.perez@example.com",
    };

    const { data: pedidos } = useGetPedidosCliente(clientePrueba.id)({});

    const filteredData = pedidos?.filter((pedido: Pedido) => {
        // Filtrar por fechas si están seleccionadas
        const fechaCreacion = new Date(pedido.fechaCreacion);
        const inicio = fechaInicio ? new Date(fechaInicio) : null;
        const fin = fechaFin ? new Date(fechaFin) : null;

        return (
            (!inicio || fechaCreacion >= inicio) &&
            (!fin || fechaCreacion <= fin)
        );
    }) || [];

    const columns: ColumnProps[] = [
        { field: 'id', header: 'Numero' },
        //{ field: 'cantidadPalelts', header: 'Cantidad' },
        { field: 'fechaCreacion', header: 'Fecha Inicio' },
        { field: 'ultimaActualizacion', header: 'Fecha Fin' },
    ];

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
                        <Button disabled={!fechaInicio} icon="pi pi-times" className="clear_btn" rounded text severity="contrast" onClick={() => setFechaInicio("")} />
                    </div>
                    <div id="select_filter_div">
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            placeholder="Fecha Fin"
                            className="md:w-12rem"
                        />
                        <Button disabled={!fechaFin} icon="pi pi-times" className="clear_btn" rounded text severity="contrast" onClick={() => setFechaFin("")} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Toast ref={toast} />
            <TableComponent
                data={filteredData}
                columns={columns}
                header={renderHeader}
                paginationModel={{ page: 0, pageSize: 5 }}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                rowClick={false}
                rowAction={viewButtonRender}
            />
        </div>
    );
}
