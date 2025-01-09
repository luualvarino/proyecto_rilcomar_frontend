import React from "react";
import Header from "../../components/base/header/Header.tsx";
import "./Home.css";
import PalletsView from "./PalletsView/PalletsView.tsx";
import CleintesView from "./ClienteView/Clienteview.tsx";

export default function Home() {
    return (
        <div>
            <Header />
            <PalletsView />
            <CleintesView />
        </div>
    )
}