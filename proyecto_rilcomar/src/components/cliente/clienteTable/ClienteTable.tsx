import { Cliente } from "../../../models/Cliente/Cliente.ts";
import React, { useRef, useState } from "react";
import TableComponent, { ColumnProps } from "../../base/table/TableComponent.tsx";
import "./ClienteTable.css";
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import BaseDialog from "../../base/dialog/BaseDialog.tsx";
import DeleteCliente from "../deleteCliente/DeleteCliente.tsx"; //delete cliente
import { Toast } from "primereact/toast";
import { useGetClientes } from "../../../querys/ClienteQuerys.ts";
import Select from "../../base/form/Select.tsx";


export default function CleinteTable({ selectedRows, setSelectedRows }) {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [mail, setMail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const toast = useRef<Toast>(null);
    const { data } = useGetClientes({ nombre, mail })

    function showNotification(data) {
        if (data) {
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Cliente eliminado exitosamente', life: 3000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'El Cliente no pudo ser eliminado', life: 3000 });
        }
    };


    const columns: ColumnProps[] = [
        { field: "id", header: "ID" },
        { field: "nombre", header: "Nombre" },
        { field: "telefono", header: "Teléfono" },
        { field: "mail", header: "Correo Electrónico" },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    const renderHeader = () => (
        <div className="flex" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
            <div id="filters_div">
                <div id="input_filter_div">
                    <InputText
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="md:w-12rem"
                    />
                    <Button
                        disabled={!nombre}
                        icon="pi pi-times"
                        className="clear_btn"
                        rounded
                        text
                        severity="contrast"
                        onClick={() => setNombre("")}
                    />
                </div>
                <div id="input_filter_div">
                    <InputText
                        placeholder="Teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        className="md:w-12rem"
                    />
                    <Button
                        disabled={!telefono}
                        icon="pi pi-times"
                        className="clear_btn"
                        rounded
                        text
                        severity="contrast"
                        onClick={() => setTelefono("")}
                    />
                </div>
                <div id="input_filter_div">
                    <InputText
                        placeholder="Correo Electrónico"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        className="md:w-12rem"
                    />
                    <Button
                        disabled={!mail}
                        icon="pi pi-times"
                        className="clear_btn"
                        rounded
                        text
                        severity="contrast"
                        onClick={() => setMail("")}
                    />
                </div>
            </div>
            {selectedRows.length > 0 && (
                <Button
                    id="delete_btn"
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={() => setShowModal(true)}
                />
            )}
        </div>
    );

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
                rowClick={true}
            />
            <BaseDialog
                header={selectedRows.length > 1 ? "¿Desea eliminar los clientes seleccionados?" : "¿Desea eliminar el cliente seleccionado?"}
                content={
                    <DeleteCliente
                        selectedClientes={selectedRows}
                        closeModal={() => {
                            setShowModal(false);
                            setSelectedRows([]);
                        }}
                        showNotification={showNotification}
                    />
                }
                visible={showModal}
                setVisible={(value) => setShowModal(value)}
                width="30vw"
            />
        </div>
    );
}