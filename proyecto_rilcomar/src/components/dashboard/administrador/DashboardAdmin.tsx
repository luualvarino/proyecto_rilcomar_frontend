import React, { useRef, useState } from "react";
import { useGetPalletsCount } from "../../../querys/PalletQuerys.ts";
import { useGetPedidosNoFinalizados } from "../../../querys/PedidoQuerys.ts";
import "../Dashboard.css";
import { DataTableValueArray } from "primereact/datatable";
import { Toast } from "primereact/toast";
import TableComponent, { ColumnProps } from "../../base/table/TableComponent.tsx";
import { Pedido } from "../../../models/Pedido.ts";

const DashboardAdmin = () => {
    //parte de pallets
    const { data: palletData, isLoading: isLoadingPallets, error: errorPallets } = useGetPalletsCount();

    //parte de pedidos
    const [selectedRows, setSelectedRows] = useState<DataTableValueArray>([]);
    const toast = useRef<Toast>(null);
    const { data: pedidoData, isPending } = useGetPedidosNoFinalizados();

    const columns: ColumnProps[] = [
        { field: 'id', header: 'ID' },
        { field: 'cliente', header: 'Cliente', body: (rowData: Pedido) => { return <span>{rowData.cliente.nombre}</span> } },
        { field: 'pallets', header: 'Cantidad de Pallets', body: (rowData: Pedido) => { return <span>{rowData.pallets.length}</span>; } },
        { field: 'ultimaActualizacion', header: 'Ultima Actualización' },
        { field: 'estado', header: 'Estado', body: (rowData: Pedido) => {return <span>{rowData.estado?.replace("_", " ")}</span>} },
    ];

    return (
        <div>
            <div>
                <h1 id="pallet_title">Pallets</h1>
                {isLoadingPallets ? (
                    <div>Loading...</div>
                ) : errorPallets ? (
                    <div>Error loading data</div>
                ) : (
                    <div className="dashboard-card">
                        <div className="dashboard-item">
                            <h2>Libres</h2>
                            <p className="blue">{palletData?.Libre || 0}</p>
                        </div>
                        <div className="dashboard-item">
                            <h2>Ocupados</h2>
                            <p className="blue">{palletData?.Ocupado || 0}</p>
                        </div>
                        <div className="dashboard-item">
                            <h2>Total</h2>
                            <p className="blue">{(palletData?.Ocupado + palletData?.Libre) || 0}</p>
                        </div>
                    </div>
                )}
            </div>

            <div>
            <h1 id="pedidos_title">Pedidos</h1>
                <Toast ref={toast} />
                <TableComponent
                    data={pedidoData}
                    columns={columns}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    rowClick={false}
                    isLoading={isPending}
                />
            </div>
        </div>
    );
};

export default DashboardAdmin;
