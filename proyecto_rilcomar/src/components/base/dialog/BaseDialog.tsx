
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function BaseDialog({ header, content, visible, setVisible }) {

    return (
        <div className="card flex justify-content-center">
            <Dialog header={header} visible={visible} style={{ width: '40vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                {content}
            </Dialog>
        </div>
    )
}
