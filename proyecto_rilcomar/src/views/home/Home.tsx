import React from "react";
import "./Home.css";
import Dashboard from "../../components/dashboard/Dashboard.tsx";

export default function Home() {
    return (
        <div id="home_container">
            <div id="home_content">
                <Dashboard />
                {/* <h1 id="home_title">Bienvenido al sistema de autogestión</h1> */}
            </div>
        </div>
    );
}