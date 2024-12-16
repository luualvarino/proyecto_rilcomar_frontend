import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

interface SelectProps {
    id?: string;
    options: string[];
    placeholder: string;
    addedClass?: string;
    selectedValue: string;
    setSelectedValue: (value: string) => void;
    invalid?: boolean;
    helperText?: string;
}
export default function Select(
    {
        id,
        options,
        placeholder,
        addedClass,
        selectedValue,
        setSelectedValue,
        invalid,
        helperText
    }: SelectProps) {

    return (
        <div className="flex flex-column gap-2">
            <Dropdown
                id={id ?? ""}
                value={selectedValue}
                onChange={(e: DropdownChangeEvent) => setSelectedValue(e.value)}
                options={options}
                optionLabel="name"
                placeholder={placeholder}
                className={`w-full ${addedClass ?? ""}`}
                invalid={invalid}
            />
            {invalid &&
                <small id="username-help">
                    {helperText}
                </small>
            }
        </div>

    )
}
