import React from "react";
import "./Home.css";
import Historial from "../historial/HistorialTable/HistorialTable.tsx";

export default function Home() {
    return (
        <div id="dash_div">
            <h2 id="dash_subtitle">Notificaciones</h2>
            <Historial />

            <h2 id="dash_subtitle">Pedidos</h2>
            
        </div>
    )
}