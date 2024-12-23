import React, { useRef, useState } from "react";
import "../../pallets/palletsView/PalletsView.css";
import PedidosTable from "../../../components/pedido/pedidosTable/PedidosTable.tsx";
import { Button } from "primereact/button";

export default function PedidosView() {
    return (
        <div>
            <div id="table_header_div" className="card flex" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h1 id="pallets_title">Pedidos</h1>
                <Button id="add_pallet_btn" label="Crear Pedido" icon="pi pi-plus" />
            </div>
            <PedidosTable />
        </div>
    )
}