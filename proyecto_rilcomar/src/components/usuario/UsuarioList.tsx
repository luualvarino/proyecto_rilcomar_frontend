import React from "react";
import { Button } from "primereact/button";
import { Usuario } from "../../models/Usuario"
import "./UsuarioList.css";

export default function UsuarioList({ usuarios, onDelete }) {
    return (
        <div className="usuarios-list">
            {usuarios.length === 0 ? (
                <p>No hay usuarios asignados a este cliente.</p>
            ) : (
                usuarios.map((usuario) => (
                    <div key={usuario.username} className="usuario-card">
                        <span className="usuario-nombre">{usuario.username}</span>
                        <Button 
                            id="deleteUser_btn"
                            icon="pi pi-trash" 
                            className="p-button-rounded p-button-danger p-button-text" 
                            onClick={() => onDelete(usuario.username)}
                        />
                    </div>
                ))
            )}
        </div>
    );
}