import { Button } from "primereact/button";
import React from "react";
import { Cliente } from "../../../models/Cliente.ts";
import "../../pallet/deletePallet/DeletePallet.css";
import { useDeleteCliente } from "../../../querys/ClienteQuerys.ts";

export default function DeleteCliente({ cliente, closeModal, showNotification }) {
    const { mutate: deleteCliente } = useDeleteCliente({
        onSuccessFn: () => showNotification("Ok"),
        onErrorFn: () => showNotification(null)
    })

    function handleDeleteCliente() {
        deleteCliente(cliente.id);
        closeModal();
    }

    return (
        <div id="delete_div" className="card">
            <span style={{marginTop: "5rem"}}>Tenga en cuenta que al eliminar un Cliente se eliminaran todos los Pedidos asociados al mismo.</span>
            <div style={{marginTop: "1rem"}}>
                <Button label="Confirmar" icon="pi pi-check" className="button_filled" onClick={handleDeleteCliente} />
                <Button label="Cancelar" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} onClick={closeModal} />
            </div>
        </div>
    )
}