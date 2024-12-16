import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";

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
        helperText
    }: TextInputProps) {

    return (
        <div id={id ?? ""} className="flex flex-column gap-2">
            <div  className={`p-inputgroup flex-1 w-full ${addedClass ?? ""}`}>
                {prefix && <span className="p-inputgroup-addon">{prefix}</span>}
                {isNumber ?
                    <InputNumber
                        invalid={invalid}
                        placeholder={placeholder}
                        value={value as number}
                        onChange={(e) => setValue(e.value ?? 0)}
                    />
                    :
                    isMultiline ?
                        <InputTextarea
                            autoResize
                            placeholder={placeholder}
                            rows={5}
                            value={value as string}
                            onChange={(e) => setValue(e.target.value)}
                            invalid={invalid}
                        />
                        :
                        <InputText
                            placeholder={placeholder}
                            value={value as string}
                            onChange={(e) => setValue(e.target.value)}
                            invalid={invalid}
                        />
                }
                {suffix && <span className="p-inputgroup-addon">{suffix}</span>}
            </div>
            {invalid &&
                <small id="username-help">
                    {helperText}
                </small>
            }
        </div>
    )
}