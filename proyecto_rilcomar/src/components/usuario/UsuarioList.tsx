import React from "react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./UsuarioList.css"

export default function UserList({ usuarios, onDelete, isPending }) {
    return (
        <div className="user-list-container">
            {usuarios.length === 0 ? (
                <p className="no-users">No hay usuarios asociados al cliente.</p>
            ) : (
                usuarios.map((usuario) => (
                    <Card key={usuario.username} className="user-card">
                        <div className="user-content">
                            <div className="user-left">
                            <Avatar
                                label={usuario.username.charAt(0).toUpperCase()}
                                size="large"
                                shape="circle"
                            />
                            <div className="user-info">
                                <span className="user-name">{usuario.username}</span>
                            </div>
                            </div>
                            <div className="user-right">
                            <Button
                                icon="pi pi-trash"
                                label="Eliminar usuario"
                                className="p-button-rounded p-button-danger"
                                onClick={() => onDelete(usuario.username)}
                                loading={isPending}
                            />
                            </div>
                        </div>
                    </Card>
                ))
                
            )}
        </div>
    );
}