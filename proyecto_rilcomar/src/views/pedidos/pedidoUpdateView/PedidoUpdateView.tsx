import React, { useEffect, useRef, useState } from "react";
import PedidoList from "../../../components/pedido/palletsList/PalletsList.tsx";
import { useEditPedido, useGetPedido } from "../../../querys/PedidoQuerys.ts";
import { useParams } from "react-router-dom";
import Loader from "../../../components/base/loader/Loader.tsx";
import Select from "../../../components/base/form/Select.tsx";
import { EstadoEnum, Pedido } from "../../../models/Pedido.ts";
import { Card } from "primereact/card";
import "./PedidoUpdateView.css";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export default function PedidoUpdateView() {
    let params = useParams();

    const { data: pedido, isLoading } = useGetPedido(Number(params.pedidoId));

    const [estado, setEstado] = useState("");

    useEffect(() => {
        if (pedido) {
            setEstado(pedido.estado);
        }
    }, [pedido])

    const estados = Object.keys(EstadoEnum)
        .filter((key) => isNaN(Number(key)))
        .map((key) => key.replace("_", " "));

    const { mutate: editPedido } = useEditPedido({
        onSuccessFn: (data: Pedido) => { showNotification(data); },
        onErrorFn: () => { showNotification(null); }
    })

    function handleEditarPedido() {
        pedido.estado = estado;
        editPedido(pedido);
    }

    const toast = useRef<Toast>(null);

    function showNotification(data) {
        if (data) {
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Pedido editado exitosamente', life: 3000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'El Pedido no pudo ser editado', life: 3000 });
        }
    }

    return (
        <div id="updateView_div" className="card flex flex-column align-items-center gap-3">
            <Toast ref={toast} />

            {isLoading ?
                <Loader /> :
                <Card id="pedidoUpdate_card">
                    <div className="flex flex-column align-items-center">
                        <h2>
                            Pedido <span className="normal_text">{pedido.id}</span>
                        </h2>
                        <h3>
                            Estado <span className="normal_text">{pedido.estado}</span>
                        </h3>
                        <h3>
                            Cliente <span className="normal_text">{pedido.cliente.nombre}</span>
                        </h3>
                    </div>
                    <PedidoList pedido={pedido} />
                    <div className="flex flex-column align-items-center">
                        <Select
                            id="tipo_input"
                            placeholder="Estado"
                            options={estados}
                            addedClass="md:w-16rem"
                            selectedValue={estado}
                            setSelectedValue={(value) => setEstado(value as string)}
                        />
                    </div>
                    <div id="button_div" className="flex flex-column align-items-center">
                        <Button id="button_update" className="button_filled" label="Actualizar" icon="pi pi-check" autoFocus type="button" onClick={handleEditarPedido} />
                    </div>
                </Card>
            }
        </div>
    )
}