
import React, { useRef } from 'react';
import { Avatar } from 'primereact/avatar';
import logo from "../../../../imgs/LogoRilcomar.png";
import "./Header.css";
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'primereact/menu';
import { Usuario } from '../../../../models/Usuario';

export default function CustomDemo() {

    const navigate = useNavigate();
    const userString = localStorage.getItem("usuario");
    const user: Usuario | null = userString ? JSON.parse(userString) : null;
    const menuRef = useRef<Menu | null>(null);

    function handleLogout() {
        localStorage.removeItem("usuario");
        navigate("/");
    }

    const startContent = (
        <React.Fragment>
            <img id='logo_img' src={logo} />
        </React.Fragment>
    );

    const items = [
        {
            id: 'home_item',
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/client/home')
        },
        {
            //la dejo aca para probar, hay que agegar que se vea solo cuando el usuairo es cliente
            label: 'Historial',
            icon: 'pi pi-star',
            command: () => navigate('/pedidosCliente')
        },
    ];

    const menuItems = [
        {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: handleLogout
        }
    ];

    const toggleMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (menuRef.current) {
            menuRef.current.toggle(event);
        }
    };

    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center gap-2 user-menu" onClick={toggleMenu}>
                <Avatar icon="pi pi-user" size="large" shape="circle" />
                <span className="text-bluegray-50">{user?.cliente.nombre}</span>
            </div>
            <Menu model={menuItems} popup ref={menuRef} />
        </React.Fragment>
    );

    return (
        <div >
            <Menubar id='header' start={startContent} model={items} end={endContent} />
        </div>
    );
}
