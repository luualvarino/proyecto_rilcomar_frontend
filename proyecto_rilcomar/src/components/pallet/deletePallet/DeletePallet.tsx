import { Button } from "primereact/button";
import React from "react";
import { Pallet } from "../../../models/Pallet.ts";
import "./DeletePallet.css";
import { useDeletePallet } from "../../../querys/PalletQuerys.ts";

export default function DeletePallet({ selectedPallets, closeModal, showNotification }) {
    const { mutate: deletePallet } = useDeletePallet({
        onSuccessFn: () => showNotification("Ok"),
        onErrorFn: () => showNotification(null)
    })

    function handleDeletePallet() {
        selectedPallets.forEach((pallet: Pallet) => {
            if (pallet.id) {
                deletePallet(pallet.id);
            }
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
                <Button label="Confirmar" icon="pi pi-check" className="button_filled" onClick={handleDeletePallet} />
                <Button label="Cancelar" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} onClick={closeModal} />
            </div>
        </div>
    )
}