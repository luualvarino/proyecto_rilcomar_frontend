import React, { useRef } from "react";
import "../../pallets/palletsView/PalletsView.css";
import PedidoClienteTable from "../../../components/pedido/historialClientePedido/PedidoClienteTable.tsx";
import { Toast } from "primereact/toast";

export default function PedidosClienteView() {

    const toast = useRef<Toast>(null);
    return (
        <div>
            <Toast ref={toast} />
            <div id="table_header_div" className="card flex" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h1 id="pedCliente_title">Pedidos</h1>
            </div>
            <PedidoClienteTable />
        </div>
    )
}