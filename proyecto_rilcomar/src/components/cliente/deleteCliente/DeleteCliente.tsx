import { Button } from "primereact/button";
import React from "react";
import { Cliente } from "../../../models/Cliente/Cliente";
import "./DeleteCliente.css";

export default function DeleteCliente({ selectedCliente, closeModal, showNotification}) {

    function handleDeleteCliente() {
        selectedCliente.map((cliente: Cliente) => {
            fetch(`http://localhost:8080/rilcomar/cliente/${cliente.id}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) {
                        showNotification(response);
                    } else {
                        showNotification(null);
                    }
                })
                .catch(() => showNotification(null));
        })
        closeModal();
    }

    return (
        <div id="delete_div" className="card">
            <ul id="delete_list">
                {selectedCliente.map((cliente: Cliente) => {
                    return <li key={cliente.id}>{cliente.id}</li>
                })}
            </ul>

            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={handleDeleteCliente} />
                <Button label="Cancelar" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} onClick={closeModal} />
            </div>
        </div>
    )
}