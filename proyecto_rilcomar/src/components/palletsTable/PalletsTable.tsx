import { Pallet } from "../../models/Pallet/Pallet.ts";
import React, { useState } from "react";
import TableComponent, { ColumnProps } from "../base/table/TableComponent.tsx";
import "./PalletsTable.css";
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';


export default function PalletsTable({ pallets, selectedRows, setSelectedRows }) {
    const [searchText, setSearchText] = useState("");

    const estaDisponibleRender = (rowData: Pallet) => {
        const estaDisp = rowData.estaDisponible ? "Si" : "No";
        return <span>{estaDisp}</span>;
    };

    const columns: ColumnProps[] = [
        { field: 'id', header: 'ID' },
        { field: 'estado', header: 'Estado' },
        { field: 'tipo', header: 'Tipo' }, //Buscar forma de mostrar los valores escritos bien (con tilde)
        { field: 'formato', header: 'Formato' },
        { field: 'estaDisponible', header: 'Esta Disponible', body: estaDisponibleRender }
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    const renderHeader = () => {
        return (
          <div className="flex" style={{justifyContent:'space-between'}}>
            <IconField iconPosition="left">
              <InputIcon className="pi pi-search" />
              <InputText value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar" />
            </IconField>
    
            {selectedRows.length > 0 && <Button icon="pi pi-trash" severity="danger" />}
          </div>
        );
      }; 

    return (
        <TableComponent
            data={pallets}
            columns={columns}
            header={renderHeader}
            paginationModel={paginationModel}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            rowClick={true}
        />
    )
}