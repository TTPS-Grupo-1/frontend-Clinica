import type { FC } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import "react-day-picker/dist/style.css";

interface CalendarPickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

const CalendarPicker: FC<CalendarPickerProps> = ({ selected, onSelect }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Fecha</label>
      <div className="border rounded-lg bg-white flex justify-center items-center py-4 capitalize">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={onSelect}
          fromDate={new Date()}
          locale={es}
        />
      </div>
    </div>
  );
};

export default CalendarPicker;