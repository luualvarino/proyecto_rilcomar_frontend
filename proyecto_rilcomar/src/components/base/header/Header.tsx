
import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import logo from "../../../imgs/LogoRilcomar.png";
import "./Header.css";
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';

export default function CustomDemo() {
    const startContent = (
        <React.Fragment>
            <img id='logo_img' src={logo}/>
        </React.Fragment>
    );

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
        },
        {
            label: 'Pallets',
            icon: 'pi pi-star'
        },
        {
            label: 'Pedidos',
            icon: 'pi pi-star'
        },
    ];

    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                <span className="text-bluegray-50">Amy Elsner</span>
            </div>
        </React.Fragment>
    );

    return (
        <div >
            <Menubar id='header' start={startContent} model={items} end={endContent}  />
        </div>
    );
}
        