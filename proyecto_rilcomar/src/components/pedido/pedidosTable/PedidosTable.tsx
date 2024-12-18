import { EstadoEnum, FormatoEnum, MaterialEnum, Pallet } from "../../../models/Pallet.ts";
import React, { useRef, useState } from "react";
import TableComponent, { ColumnProps } from "../../base/table/TableComponent.tsx";
import "../../pallet/palletsTable/PalletsTable.css";
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
import Select from "../../base/form/Select.tsx";
import { useGetPedidos } from "../../../querys/PedidoQuerys.ts";
import { Pedido } from "../../../models/Pedido.ts";


export default function PedidosTable({ selectedRows, setSelectedRows }) {
    const [estado, setEstado] = useState("");
    const [tipo, setTipo] = useState("");
    const [formato, setFormato] = useState("");
    const [showModal, setShowModal] = useState(false);
    const toast = useRef<Toast>(null);
    const { data } = useGetPedidos({ estado });

    function showNotification(data) {
        console.log(data);

        if (data) {
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Pedido eliminado exitosamente', life: 3000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'El Pedido no pudo ser eliminado', life: 3000 });
        }
    };

    const columns: ColumnProps[] = [
        { field: 'id', header: 'ID' },
        { field: 'estado', header: 'Estado' },
        { field: 'cliente', header: 'Cliente', body: (rowData: Pedido) => { return <span>{rowData.cliente.nombre}</span> } },
        { field: 'fechaCreacion', header: 'Fecha Creación' },
        { field: 'fechaEntrega', header: 'Fecha Entrega' },
        { field: 'ubicacion', header: 'Ubicación' }
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    const estados = Object.keys(EstadoEnum)
        .filter((key) => isNaN(Number(key)))
        .map((key) => key.replace("_", " "))
        .filter(estado => estado !== "Libre");

    const renderHeader = () => {
        return (
            <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div id="filters_div">
                    <div id="select_filter_div">
                        <Select
                            placeholder="Estado"
                            options={estados}
                            addedClass="md:w-12rem"
                            selectedValue={estado}
                            setSelectedValue={(value) => setEstado(value)}
                        />
                        <Button disabled={estado === ""} icon="pi pi-times" className="clear_btn" rounded text severity="contrast" onClick={() => setEstado("")} />
                    </div>
                </div>

                {selectedRows.length > 0 && <Button id="delete_btn" icon="pi pi-trash" severity="danger" onClick={() => setShowModal(true)} />}
            </div>
        );
    };

    return (
        <div>
            <Toast ref={toast} />
            <TableComponent
                data={data}
                columns={columns}
                header={renderHeader}
                paginationModel={paginationModel}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                rowClick={false}
            />
            {/* <BaseDialog
                header={selectedRows.length > 1 ? "Desea eliminar los Pallets seleccionados?" : "Desea eliminar el Pallet seleccionado?"}
                content={
                    <DeletePallet
                        selectedPallets={selectedRows}
                        closeModal={() => { setShowModal(false); setSelectedRows([]); }}
                        showNotification={showNotification}
                    />}
                visible={showModal}
                setVisible={(value) => setShowModal(value)}
                width="30vw"
            /> */}
        </div>
    )
}