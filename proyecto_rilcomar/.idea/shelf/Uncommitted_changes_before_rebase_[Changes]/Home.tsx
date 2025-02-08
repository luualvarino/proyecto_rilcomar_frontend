import React from "react";
import "./Home.css";
import Dashboard from "../../../components/dashboard/administrador/DashboardAdmin.tsx";

export default function Home() {
    return (
        <div id="home_container">
            <div id="home_content">
                <Dashboard />
            </div>
        </div>
    );
}