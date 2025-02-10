import React,  { useRef }  from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { useGetPallet } from "../../../querys/PalletQuerys.ts";
import Loader from "../../../components/base/loader/Loader.tsx";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./PalletInfoView.css";

export default function PalletInfoView(){
    let params = useParams();
    let navigate = useNavigate();

    const { data: pallet, isLoading } = useGetPallet(Number(params.palletId));
    const toast = useRef<Toast>(null);

    const handleDownloadQR = () => {
        if (!pallet?.qrCode) return;

        const link = document.createElement("a");
        link.href = pallet.qrCode;
        link.download = `QR_Pallet_${pallet.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div id="palletInfoView" className="card flex flex-column align-items-center gap-3">
            <Toast ref={toast} />

            {isLoading ? (
                <Loader />
            ) : (
                <Card id="pallet_detail_card">
                    <div className="flex flex-column align-items-center">
                        <h2>
                            Pallet <span className="normal_text">{pallet.id}</span>
                        </h2>
                        <h3>Estado: <span className="normal_text">{pallet.estado}</span></h3>
                        <h3>Tipo: <span className="normal_text">{pallet.tipo}</span></h3>
                        <h3>Formato: <span className="normal_text">{pallet.formato || 'N/A'}</span></h3>
                        <h3>Peso: <span className="normal_text">{pallet.peso}</span></h3>
                        <h3>Ubicación: <span className="normal_text">{pallet.ubicacion || 'N/A'}</span></h3>
                        <h3>Observaciones: <span className="normal_text">{pallet.observaciones || 'N/A'}</span></h3>
                        
                        {/* Mostrar botón para ir a la vista del pedido si el pallet está ocupado */}
                        {pallet.estado === "Ocupado" && (
                            <div className="mt-3">
                                {pallet.historial
                                    .filter(p => p.pedido.estado !== "Finalizado") // Filtra los pedidos que no están finalizados
                                    .map((p, index) => (
                                        <Button 
                                            key={index}
                                            label="Ver Pedido"
                                            icon="pi pi-eye"
                                            className="button_filled"
                                            onClick={() => navigate(`/pedidos/${p.pedido.id}`)}
                                        />
                                    ))
                                }
                            </div>
                        )}

                        {/* Mostrar el código QR si está disponible */}
                        {pallet.qrCode && (
                            <div className="qr-code-container">
                                <h3>Código QR:</h3>
                                <img src={pallet.qrCode} alt="QR Code" className="qr-code" />
                                <Button 
                                    label="Descargar QR"
                                    icon="pi pi-download"
                                    className="button_filled"
                                    onClick={handleDownloadQR}
                                />
                            </div>
                        )}


                    </div>

                    <div id="button_div" className="flex flex-column align-items-center">
                        <Button label="Volver" icon="pi pi-arrow-left" className="button_filled" onClick={() => window.history.back()} />
                    </div>
                </Card>
            )}
        </div>
    );
}