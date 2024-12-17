import React, { useState } from "react";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";

interface BaseRadioButtonProps {
    label: string;
    options: string[];
    selectedValue: string;
    setSelectedValue: (value: string) => void;
}

export default function BaseRadioButton({ label, options, selectedValue, setSelectedValue }: BaseRadioButtonProps) {
    return (
        <div className="card flex justify-content-center">
            <div><label>{label}</label></div>
            <div className="flex flex-wrap gap-3">
                {options.map(option => {
                    return (
                        <div key={option} className="flex align-items-center">
                            <RadioButton inputId={option} value={option} onChange={(e: RadioButtonChangeEvent) => setSelectedValue(e.value)} checked={selectedValue === option} />
                            <label className="ml-2">{option}</label>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
