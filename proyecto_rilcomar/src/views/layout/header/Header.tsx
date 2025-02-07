
import React , { useEffect, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import logo from "../../../imgs/LogoRilcomar.png";
import "./Header.css";
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { useNavigate } from 'react-router-dom';
import { Button } from "primereact/button";

export default function CustomDemo() {
    const navigate = useNavigate();

    
    const [usuario, setUsuario] = useState(() => {
        const usuarioLogueado = localStorage.getItem("usuario");
        return usuarioLogueado ? JSON.parse(usuarioLogueado) : null;
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const usuarioLogueado = localStorage.getItem("usuario");
            setUsuario(usuarioLogueado ? JSON.parse(usuarioLogueado) : null);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const cerrarSesion = () => {
        localStorage.clear();
        setUsuario(null);
        navigate("/login");
    };

    const startContent = (
        <React.Fragment>
            <img id='logo_img' src={logo} />
        </React.Fragment>
    );

    
    let items: { id?: string; label: string; icon: string; command: () => void }[] = [];

    if (usuario) {
        const esAdmin = usuario.esAdmin;

        if (esAdmin) {
            items = [
                { id: 'home_item', label: 'Home', icon: 'pi pi-home', command: () => navigate('/') },
                { label: 'Pallets', icon: 'pi pi-bars', command: () => navigate('/pallets') },
                { label: 'Pedidos', icon: 'pi pi-barcode', command: () => navigate('/pedidos') },
                { label: 'Clientes', icon: 'pi pi-star', command: () => navigate('/clientes') },
            ];
        } else {
            items = [
                { label: 'Pedidos', icon: 'pi pi-barcode', command: () => navigate('/pedidos') },
            ];
        }
    }

    
    const inicialAvatar = usuario ? usuario.username.charAt(0).toUpperCase() : "";

    
    const endContent = usuario ? (
        <React.Fragment>
            <div className="flex align-items-center gap-3">
                <Avatar label={inicialAvatar} size="large" shape="circle" />
                <Button label="Cerrar sesión" id="cerrarSesion_btn" icon="pi pi-sign-out" className="p-button-text" onClick={cerrarSesion} />
            </div>
        </React.Fragment>
    ) : null;

    return (
        <div>
            <Menubar id='header' start={startContent} model={items} end={endContent} />
        </div>
    );
}
        