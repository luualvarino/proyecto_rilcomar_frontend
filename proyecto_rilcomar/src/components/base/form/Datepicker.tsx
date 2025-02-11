import React from "react";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";

interface BaseDatePickerProps {
  label: string;
  minDate?: Date;
  disabled?: boolean;
  dateFormat?: string;
  value: Date;
  setValue: (value: Date) => void;
  helperText?: string;
  invalid?: boolean;
}

const BaseDatePicker = ({
  label,
  minDate,
  disabled,
  dateFormat,
  value,
  setValue,
  helperText,
  invalid
}: BaseDatePickerProps) => {

  return (
    <div className="flex-auto" style={{marginLeft: "3.8rem"}}>
      <FloatLabel>
        <Calendar
          value={value}
          onChange={(e) => setValue(e.value as Date)}
          minDate={minDate}
          disabled={disabled}
          dateFormat={dateFormat}
          showIcon //Cambiar color del boton
          style={{height: "3rem"}}
        />
        <label>{label}</label>
      </FloatLabel>
      {invalid &&
        <small id="username-help" style={{ color: 'red' }}>
          {helperText}
        </small>
      }
    </div>
  );
};

export default BaseDatePicker;
