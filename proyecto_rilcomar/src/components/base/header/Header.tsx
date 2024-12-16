
import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import logo from "../../../imgs/LogoRilcomar.png";
import "./Header.css";

export default function CustomDemo() {
    const startContent = (
        <React.Fragment>
            <img id='logo_img' src={logo}/>
        </React.Fragment>
    );

    const centerContent = (
        <div className="flex flex-wrap align-items-center gap-3">
            <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-home text-2xl"></i>
            </button>
            <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-user text-2xl"></i>
            </button>
            <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-search text-2xl"></i>
            </button>
        </div>
    );

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
            <Toolbar id='header' start={startContent} center={centerContent} end={endContent}  />
        </div>
    );
}
        