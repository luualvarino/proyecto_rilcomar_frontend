import { Button } from "primereact/button";
import React from "react";
import { Pallet } from "../../../models/Pallet/Pallet";
import "./DeletePallet.css";

export default function DeletePallet({ selectedPallets, closeModal, showNotification}) {

    function handleDeletePallet() {
        selectedPallets.map((pallet: Pallet) => {
            fetch(`http://localhost:8080/rilcomar/pallets/${pallet.id}`, {
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
                {selectedPallets.map((pallet: Pallet) => {
                    return <li key={pallet.id}>{pallet.id}</li>
                })}
            </ul>

            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={handleDeletePallet} />
                <Button label="Cancelar" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} onClick={closeModal} />
            </div>
        </div>
    )
}