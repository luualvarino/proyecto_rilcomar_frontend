import { Box } from "@mui/material";
import React from "react";
import Header from "../components/base/header/Header.tsx";
import PalletsTable from "../components/palletsTable/PalletsTable.tsx";

export default function Home() {
    return (
        <Box>
            <Header />
            <PalletsTable />
        </Box>
    )
}