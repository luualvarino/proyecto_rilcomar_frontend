import { useEffect, useState } from "react";
import { Pallet } from "../../models/Pallet";
import React from "react";
import TableComponent from "../base/table/TableComponent.tsx";
import { GridColDef } from '@mui/x-data-grid';


export default function PalletsTable() {

    const [pallets, setPallets] = useState<Pallet[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/rilcomar/pallets")
            .then((response) => response.json())
            .then((data) => {
                setPallets(data);
            });
    }, []);

    const columns: GridColDef<Pallet>[] = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'estado', headerName: 'Estado', width: 200 },
        { field: 'tipo', headerName: 'Tipo', width: 200 },
        {
          field: 'estaDisponible',
          headerName: 'Está Disponible',
          width: 200,
          valueFormatter: (row : Pallet) => row.estaDisponible ? 'Si' : 'No'
        }
      ];
      
      const paginationModel = { page: 0, pageSize: 5 };

    return (
        <TableComponent data={pallets} columns={columns} paginationModel={paginationModel}/>
    )
}