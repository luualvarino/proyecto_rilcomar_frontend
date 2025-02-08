import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { useGetClientes, useDeleteCliente } from "../../../querys/ClienteQuerys.ts";
import { useGetUsuariosPorCliente, useDeleteUsuario } from "../../../querys/UsuarioQuerys.ts";
import "./ClientesDataview.css"
import { Cliente } from "../../../models/Cliente.ts";
import Dataview from "../../base/dataview/Dataview.tsx";
import BaseDialog from "../../base/dialog/BaseDialog.tsx";
import UserForm from "../../usuario/UsuarioForm.tsx"
import UserList from "../../usuario/UsuarioList.tsx"
import ClienteEditForm from "../clienteForm/ClienteEditForm.tsx"
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { classNames } from "primereact/utils";



export default function ClientesDataview() {
    const { data } = useGetClientes({});
    const [visibleUserForm, setVisibleUserForm] = useState<boolean>(false);
    const [visibleClienteEditForm, setVisibleClienteEditForm] = useState<boolean>(false);
    const [visibleGestionarUsuarios, setVisibleGestionarUsuarios] = useState<boolean>(false);
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
    const toast = useRef<Toast>(null);


    const { data: usuarios, refetch } = useGetUsuariosPorCliente(selectedCliente?.id || 0);

    const { mutate: deleteUsuario } = useDeleteUsuario({
        onSuccessFn: () => {
            toast.current?.show({ severity: "success", summary: "Éxito", detail: "Usuario eliminado correctamente", life: 3000 });
            setTimeout(() => {
                refetch();
            }, 500);
        },
        onErrorFn: () => {
            toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo eliminar el usuario", life: 3000 });
        },
    });

    const handleEliminarUsuario = (username: string) => {
        deleteUsuario(username);
    };

    const handleAgregarUsuario = (cliente: Cliente) => {
        setSelectedCliente(cliente);
        setVisibleUserForm(true);
    };

    const handleGestionarUsuarios = (cliente: Cliente) => {
        setSelectedCliente(cliente);
        setVisibleGestionarUsuarios(true);
    };

    const handleEditarCliente = (cliente: Cliente) => {
        setSelectedCliente(cliente);
        setVisibleClienteEditForm(true);
    };

    const handleEliminarCliente = (id: number) => {
        confirmDialog({
            message: `¿Está seguro que desea eliminar este cliente?`,
            header: "Confirmación",
            icon: "pi pi-exclamation-triangle",
            accept: () => deleteCliente(id),
        });
    };

    const { mutate: deleteCliente } = useDeleteCliente({
        onSuccessFn: () => {
            toast.current?.show({ severity: "success", summary: "Éxito", detail: "Cliente eliminado correctamente", life: 3000 });

        },
        onErrorFn: () => {
            toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo eliminar el cliente", life: 3000 });
        },
    });

    function onEditSuccess(data) {
        setVisibleClienteEditForm(false);
        if (data) {
            toast.current?.show({ severity: "success", summary: "Éxito", detail: "Cliente editado correctamente", life: 3000 });
        } else {
            toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo editar el cliente", life: 3000 });
        }
    }

    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog />
            <Dataview
                data={data}
                itemTemplate={(item) => {
                    const cliente = item as Cliente;
                    return (
                        <div className="col-12" key={cliente?.id}>
                            <div className={classNames("flex flex-column xl:flex-row xl:align-items-start p-4 gap-4", {
                                "border-top-1 surface-border": true,
                            })}>
                                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                        <div className="text-2xl font-bold text-900">{cliente.nombre}</div>
                                        <div className="flex align-items-center gap-3">
                                            <span className="flex align-items-center gap-2">
                                                <i className="pi pi-envelope"></i>
                                                <span className="font-semibold">{cliente.mail}</span>
                                            </span>
                                        </div>
                                        <div className="flex align-items-center gap-3">
                                            <span className="flex align-items-center gap-2">
                                                <i className="pi pi-phone"></i>
                                                <span className="font-semibold">{cliente.telefono}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                        <SplitButton
                                            label="Agregar Usuario"
                                            icon="pi pi-user-plus"
                                            onClick={() => handleAgregarUsuario(cliente)}
                                            model={[
                                                {
                                                    label: "Gestionar Usuarios",
                                                    icon: "pi pi-users",
                                                    command: () => handleGestionarUsuarios(cliente),
                                                },
                                                {
                                                    label: "Editar Cliente",
                                                    icon: "pi pi-user-edit",
                                                    command: () => handleEditarCliente(cliente),
                                                }
                                            ]}
                                            className="p-button-rounded split-button"
                                        />
                                        <Button
                                            label="Eliminar"
                                            icon="pi pi-trash"
                                            severity="danger"
                                            className="p-button-rounded"
                                            onClick={() => handleEliminarCliente(cliente.id!)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            />

            <BaseDialog
                header={`Agregar Usuario a ${selectedCliente?.nombre || ""}`}
                visible={visibleUserForm}
                setVisible={setVisibleUserForm}
                width="30vw"
                content={<UserForm clienteSeleccionado={selectedCliente} />}
            />

            <BaseDialog
                header={`Editar Cliente ${selectedCliente?.nombre || ""}`}
                visible={visibleClienteEditForm}
                setVisible={setVisibleClienteEditForm}
                width="30vw"
                content={<ClienteEditForm clienteToEdit={selectedCliente} onEditSuccess={onEditSuccess} />}
            />

            <BaseDialog
                header={`Usuarios de ${selectedCliente?.nombre || ""}`}
                visible={visibleGestionarUsuarios}
                setVisible={setVisibleGestionarUsuarios}
                width="30vw"
                content={
                    <UserList
                        usuarios={usuarios || []}
                        onDelete={handleEliminarUsuario}
                    />
                }
            />
        </div>
    );
}