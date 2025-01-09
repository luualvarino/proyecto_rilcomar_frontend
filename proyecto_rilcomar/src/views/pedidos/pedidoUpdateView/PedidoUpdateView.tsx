import React from "react";
import PedidoList from "../../../components/pedido/pedidoList/PedidoList.tsx";
import { useGetPedido } from "../../../querys/PedidoQuerys.ts";
import { useParams } from "react-router-dom";

export default function PedidoUpdateView(){
    let params = useParams();
    const {data} = useGetPedido(Number(params.pedidoId) ?? 0);
    console.log(data);

    return(
        <div>
            <PedidoList pedido={data}/>
        </div>
    )
}