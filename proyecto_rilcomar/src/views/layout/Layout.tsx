import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./header/Header.tsx";

export default function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
