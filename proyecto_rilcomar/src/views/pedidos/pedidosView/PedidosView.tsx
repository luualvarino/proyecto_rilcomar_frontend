import React, { useRef, useState } from "react";
import "../../pallets/palletsView/PalletsView.css";
import PedidosTable from "../../../components/pedido/pedidosTable/PedidosTable.tsx";

export default function PedidosView() {
    return (
        <div>
            <PedidosTable />
        </div>
    )
}