import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";
import "./TextInput.css";

interface TextInputProps {
    id?: string;
    placeholder: string;
    isNumber?: boolean;
    isMultiline?: boolean;
    prefix?: string;
    suffix?: string;
    addedClass?: string;
    value: string | number;
    setValue: (value: string | number) => void;
    invalid?: boolean;
    helperText?: string;
    type?: string;
}

export default function TextInput(
    {
        id,
        placeholder,
        isNumber = false,
        prefix,
        suffix,
        isMultiline,
        addedClass,
        value,
        setValue,
        invalid,
        helperText,
        type
    }: TextInputProps) {

    return (
        <div id={id ?? ""} className="flex flex-column gap-2">
            <div className={`p-inputgroup flex-1 ${addedClass ?? ""}`}>
                <FloatLabel style={{ marginTop: '1rem' }} className={prefix ? "with-prefix" : ""}>
                    {prefix && <span className="p-inputgroup-addon">{prefix}</span>}
                    {isNumber ? (
                        <InputNumber
                            invalid={invalid}
                            value={value as number}
                            onValueChange={(e) => setValue(e.value ?? 0)}
                        />
                    ) : isMultiline ? (
                        <InputTextarea
                            autoResize
                            rows={5}
                            value={value as string}
                            onChange={(e) => setValue(e.target.value)}
                            invalid={invalid}
                        />
                    ) : (
                        <InputText
                            value={value as string}
                            onChange={(e) => setValue(e.target.value)}
                            invalid={invalid}
                            type={type}
                        />
                    )}
                    {suffix && <span className="p-inputgroup-addon">{suffix}</span>}
                    <label>{placeholder}</label>
                </FloatLabel>
            </div>
            {invalid &&
                <small id="username-help">
                    {helperText}
                </small>
            }
        </div>
    )
}