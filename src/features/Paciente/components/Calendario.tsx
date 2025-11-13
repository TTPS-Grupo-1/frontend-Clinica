import type { FC } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import "react-day-picker/dist/style.css";

interface CalendarPickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: ((date: Date) => boolean) | Date[];
}

const CalendarPicker: FC<CalendarPickerProps> = ({
  selected,
  onSelect,
  minDate,
  maxDate,
  disabled,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Fecha</label>
      <div className="border rounded-lg bg-white flex justify-center items-center py-4 capitalize">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={onSelect}
          fromDate={minDate}
          toDate={maxDate}
          locale={es}
          disabled={disabled || undefined} // 👈 el cambio importante
        />
      </div>
    </div>
  );
};

export default CalendarPicker;
