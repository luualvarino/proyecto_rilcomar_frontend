
import React from 'react';
import { OrderList } from 'primereact/orderlist';
import { Pallet } from '../../../models/Pallet';
import { Pedido } from '../../../models/Pedido';
import "./PedidoList.css";

interface PedidoListProps {
    pedido: Pedido;
}

export default function PedidoList({ pedido }: PedidoListProps) {

    const itemTemplate = (pallet: Pallet) => {
        return (
            <div className="orderlist-item">
                <div className="details">
                    <span className="font-bold">ID: {pallet.id}</span>
                    <span>{pallet.estado}</span>
                </div>
                <span className="observ">{pallet.observaciones || '-'}</span>
            </div>
        );
    };

    return (
        <div className="card">
            <OrderList dataKey="id" value={pedido.pallets} itemTemplate={itemTemplate} header="Pallets"></OrderList>
        </div>
    )
}
