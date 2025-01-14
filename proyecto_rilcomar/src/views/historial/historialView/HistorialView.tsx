import React, { useRef, useState } from "react";
import HistorialTable from "../../../components/historial/historialTable/HistorialTable.tsx";

export default function HistorialView() {
    return (
        <div>
            <div id="table_header_div" className="card flex" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h1 id="historial_title">Historial</h1>
            </div>
            <HistorialTable />
        </div>
    )
}