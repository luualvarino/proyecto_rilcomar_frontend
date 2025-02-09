
import React from 'react';
import logo from "../../../../imgs/LogoRilcomar.png";
import "./Header.css";
import { Menubar } from 'primereact/menubar';

export default function CustomDemo() {

    const startContent = (
        <React.Fragment>
            <img id='logo_img' src={logo} alt='Logo Rilcomar' />
        </React.Fragment>
    );

    return (
        <div >
            <Menubar id='header' start={startContent} />
        </div>
    );
}
