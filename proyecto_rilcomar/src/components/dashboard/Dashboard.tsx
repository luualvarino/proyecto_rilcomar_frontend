import React from "react";
import DashboardAdmin from "./administrador/DashboardAdmin.tsx";
import DashboardCliente from "../../components/dashboard/cliente/DashboardCliente.tsx";

const Dashboard = () => {

    //const  user  = "cliente";
    const  user  = "admin";


    return (
        <div>
            {user === "admin" ? (
                <DashboardAdmin />
            ) : user === "cliente" ? (
                <DashboardCliente />
            ) : (
                <div>No tienes permisos para acceder a esta página.</div>
            )}
        </div>
    );
};
export default Dashboard;
