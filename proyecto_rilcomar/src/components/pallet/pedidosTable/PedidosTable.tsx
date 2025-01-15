import React from "react";
import TableComponent, { ColumnProps } from "../../base/table/TableComponent.tsx";
import "../../pallet/palletsTable/PalletsTable.css";
import { Pedido } from "../../../models/Pedido.ts";


export default function PedidosTable({pedidos}) {

    const columns: ColumnProps[] = [
        { field: 'id', header: 'ID' },
        { field: 'estado', header: 'Estado' },
        { field: 'cliente', header: 'Cliente', body: (rowData: Pedido) => { return <span>{rowData.cliente.nombre}</span> } },
        { field: 'fechaCreacion', header: 'Fecha Creación' },
        { field: 'fechaEntrega', header: 'Fecha Entrega' },
        { field: 'ubicacion', header: 'Ubicación' }
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div>
            <TableComponent
                data={pedidos}
                columns={columns}
                paginationModel={paginationModel}
            />
        </div>
    )
}