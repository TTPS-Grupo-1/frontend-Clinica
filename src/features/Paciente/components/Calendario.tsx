import type { FC } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarPickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

const CalendarPicker: FC<CalendarPickerProps> = ({ selected, onSelect }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Fecha</label>
      <div className="border rounded-lg p-3 bg-white">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={onSelect}
          fromDate={new Date()}
        />
      </div>
    </div>
  );
};

export default CalendarPicker;