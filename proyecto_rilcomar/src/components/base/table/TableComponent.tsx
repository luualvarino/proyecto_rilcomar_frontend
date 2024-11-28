import { Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as React from 'react';

interface EnhancedTableProps {
  data: any[];
  columns: GridColDef[];
  paginationModel: {};
}

export default function TableComponent({ data, columns, paginationModel }: EnhancedTableProps) {

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
