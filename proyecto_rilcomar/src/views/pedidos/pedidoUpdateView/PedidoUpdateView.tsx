import React from "react";
import PedidoList from "../../../components/pedido/pedidoList/PedidoList.tsx";
import { useGetPedido } from "../../../querys/PedidoQuerys.ts";
import { useParams } from "react-router-dom";
import Loader from "../../../components/base/loader/Loader.tsx";

export default function PedidoUpdateView() {
    let params = useParams();
    console.log(params);

    const { data, isLoading } = useGetPedido(Number(params.pedidoId));
    console.log(data);

    return (
        <div>
            {isLoading ? <Loader /> : <PedidoList pedido={data} />}
        </div>
    )
}