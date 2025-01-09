import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import React from "react";

interface BaseDatePickerProps {
  label: string;
  minDate?: Date;
  disabled?: boolean;
  dateFormat?: string;
  value: Date;
  setValue: (value: Date) => void;
}

const BaseDatePicker = ({
  label,
  minDate,
  disabled,
  dateFormat,
  value,
  setValue
}: BaseDatePickerProps) => {

  return (
    <div className="flex flex-column gap-2">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          onChange={(value) => setValue(value as Date)}
          value={value}
          minDate={minDate}
          disabled={disabled ?? false}
          format={dateFormat ?? "MM/dd/yyyy"}
          // sx={{borderColor: '#1f425d'}}
        />
      </LocalizationProvider>
    </div>
  );
};

export default BaseDatePicker;
