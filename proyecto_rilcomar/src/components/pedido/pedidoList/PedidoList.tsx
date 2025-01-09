
import React, { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
import { Pallet } from '../../../models/Pallet';
import { useGetPalletsPorPedido } from '../../../querys/PalletQuerys.ts';
import { Pedido } from '../../../models/Pedido';

interface PedidoListProps {
    pedido: Pedido;
}

export default function PedidoList({ pedido }: PedidoListProps) {
    const { data } = useGetPalletsPorPedido(pedido.id ?? 0);

    const itemTemplate = (pallet: Pallet) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{pallet.id}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{pallet.estado}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${pallet.observaciones}</span>
            </div>
        );
    };

    return (
        <div className="card xl:flex xl:justify-content-center">
            <OrderList dataKey="id" value={data} itemTemplate={itemTemplate} header="Pallets"></OrderList>
        </div>
    )
}
