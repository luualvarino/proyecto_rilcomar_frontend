import { Button } from "primereact/button";
import React from "react";
import { Pedido } from "../../../models/Pedido.ts";
import "../../pallet/deletePallet/DeletePallet.tsx";
import { useDeletePedido } from "../../../querys/PedidoQuerys.ts";

export default function DeletePedido({ selectedPedidos, closeModal, showNotification }) {
    const { mutate: deletePedido, isPending } = useDeletePedido({
        onSuccessFn: () => showNotification("Ok"),
        onErrorFn: () => showNotification(null)
    })

    function handleDeletePedido() {
        selectedPedidos.forEach((pedido: Pedido) => {
            if (pedido.id) {
                deletePedido(pedido.id);
            }
        })
        closeModal();
    }

    return (
        <div id="delete_div" className="card">
            <ul id="delete_list">
                {selectedPedidos.map((pedido: Pedido) => {
                    return <li key={pedido.id}>{pedido.id}</li>
                })}
            </ul>

            <div>
                <Button label="Confirmar" icon="pi pi-check" className="button_filled" onClick={handleDeletePedido} loading={isPending} />
                <Button label="Cancelar" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} onClick={closeModal} />
            </div>
        </div>
    )
}