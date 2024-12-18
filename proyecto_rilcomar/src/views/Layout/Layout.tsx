import { Outlet } from "react-router-dom";
import React from "react";
import Header from "../../components/base/header/Header.tsx";

export default function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
