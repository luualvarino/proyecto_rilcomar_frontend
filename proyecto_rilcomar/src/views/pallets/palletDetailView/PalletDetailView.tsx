import React from "react";
import { useLocation } from "react-router-dom";
import { Pallet } from "../../../models/Pallet";
import PedidosTable from "../../../components/pallet/pedidosTable/PedidosTable.tsx";
import { Card } from "primereact/card";
import "./PalletDetailView.css";

export default function PalletDetailView() {

    const location = useLocation();
    const pallet: Pallet = location.state?.pallet;

    return (
        <div>
            <h1>Pallet {pallet.id}</h1>
            {pallet.pedidoActual &&
                <Card id="palletDetail_card">
                    <h2>Pedido Actual:</h2>
                    <h3>
                        Id: <span className="normal_text">{pallet.pedidoActual.id}</span>
                    </h3>
                    <h3>
                        Estado: <span className="normal_text">{pallet.pedidoActual.estado}</span>
                    </h3>
                    <h3>
                        Cliente: <span className="normal_text">{pallet.pedidoActual.cliente.nombre}</span>
                    </h3>
                    <h3>
                        Ubicación: <span className="normal_text">{pallet.pedidoActual.ubicacion}</span>
                    </h3>
                </Card>
            }
            <Card>
                <h2 id="pallets_title">Historial</h2>
                <PedidosTable pedidos={pallet.historial} />
            </Card>
        </div>
    )
}