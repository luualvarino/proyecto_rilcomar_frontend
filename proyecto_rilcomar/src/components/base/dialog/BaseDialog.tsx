
import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import "./BaseDialog.css";

interface BaseDialogProps {
    header?: string;
    content: React.JSX.Element;
    visible: boolean;
    setVisible: (value: boolean) => void;
    width?: string;
}

export default function BaseDialog({ header, content, visible, setVisible, width } : BaseDialogProps) {

    return (
        <div className="card flex justify-content-center">
            <Dialog header={header} visible={visible} style={{ width: `${width ?? "40vw"}` }} onHide={() => { if (!visible) return; setVisible(false); }}>
                {content}
            </Dialog>
        </div>
    )
}
