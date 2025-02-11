import * as React from 'react';
import { DataTable, DataTableValueArray } from 'primereact/datatable';
import { Column } from 'primereact/column';

export interface ColumnProps {
  field: string;
  header: string;
  body?: (rowData: any) => React.JSX.Element;
}

interface EnhancedTableProps {
  data: any[];
  columns: ColumnProps[];
  header?: () => React.JSX.Element;
  footer?: React.JSX.Element;
  selectedRows?: DataTableValueArray;
  setSelectedRows?: (rows: DataTableValueArray) => void;
  rowClick?: boolean;
  rowAction?: (rowData) => React.JSX.Element;
  isLoading?: boolean;
}

export default function TableComponent(
  {
    data,
    columns,
    header,
    footer,
    selectedRows = [],
    setSelectedRows,
    rowClick,
    rowAction,
    isLoading,
  }: EnhancedTableProps) {

  return (
    <div className="card">
      <DataTable
        value={data}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: '50rem' }}
        selectionMode={rowClick ? null : 'checkbox'}
        selection={selectedRows ?? null}
        onSelectionChange={(e) => setSelectedRows?.(e.value as DataTableValueArray)}
        dataKey="id"
        loading={isLoading}
        paginator 
        rows={10} 
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
        {columns.map(col => (
          <Column key={col.field} field={col.field} header={col.header} body={col.body} />
        ))}
        {rowAction && <Column body={(rowData) => rowAction(rowData)} />}
      </DataTable>
    </div>
  );
}
