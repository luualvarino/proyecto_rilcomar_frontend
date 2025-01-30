import React, { useRef, useState } from "react";
import TableComponent, { ColumnProps } from "../../base/table/TableComponent.tsx";
import "../../pallet/palletsTable/PalletsTable.css";
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
import { useGetPedidosXCliente } from "../../../querys/PedidoQuerys.ts";
import { Pedido } from "../../../models/Pedido.ts";
import { DataTableValueArray } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";



const DashboardCliente = () => {
    const [selectedRows, setSelectedRows] = useState<DataTableValueArray>([]);
    const toast = useRef<Toast>(null);

    const clienteId = 1;

    const { data } = useGetPedidosXCliente({
        clienteId,
    });
    const navigate = useNavigate();

    const viewButtonRender = (rowData: Pedido) => {
        return <span>
            <Button id="view_btn" icon="pi pi-eye" rounded text size="large" onClick={() => navigate(`/pedidos/${rowData.id}`, { state: { pedido: rowData } })} />
        </span>
    }

    const columns: ColumnProps[] = [
        { field: 'id', header: 'ID' },
        { field: 'pallets', header: 'Cantidad de Pallets', body: (rowData: Pedido) => { return <span>{rowData.pallets.length}</span>; } },
        { field: 'fechaCreacion', header: 'Fecha Creación' },
        { field: 'ultimaActualizacion', header: 'Ultima Actualizacion' },
        { field: 'estado', header: 'Estado' },
    ];
    
    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div>
            <h1 id="pedidos_title">Pedidos</h1>
            <Toast ref={toast} />
            <TableComponent
                data={data}
                columns={columns}
                paginationModel={paginationModel}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                rowClick={false}
                rowAction={viewButtonRender}
            />
        </div>
    )

};

export default DashboardCliente;
