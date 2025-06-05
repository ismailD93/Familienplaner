import { format } from "date-fns";
import { FC } from "react";
import Button from "../Button";
import { Event } from "../../types";

interface MoreEventModalProps {
  onClose?: () => void;
  extraEvents: Event[];
}

const MoreEventModal: FC<MoreEventModalProps> = ({ onClose, extraEvents }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white max-md:h-full rounded-lg shadow-lg max-w-sm w-full p-4">
        <h2 className="text-lg font-semibold mb-2">Weitere Einträge</h2>
        <div className="flex flex-col gap-2 mb-4 h-[85%] md:max-h-[300px] overflow-y-auto no-scrollbar py-4">
          {extraEvents.map((event, idx) => (
            <div key={idx} className="bg-blue/20 p-2 rounded">
              <div className="font-medium">{event.title}</div>
              <div className="text-xs text-gray-600">
                {format(new Date(event.startDate), "dd.MM.yyyy")} -{" "}
                {format(new Date(event.endDate), "dd.MM.yyyy")}
              </div>
              <div className="text-sm">{event.description}</div>
            </div>
          ))}
        </div>
        <Button
          label="Schließen"
          size="14"
          className="w-full"
          onClick={() => onClose?.()}
        />
      </div>
    </div>
  );
};

export default MoreEventModal;
