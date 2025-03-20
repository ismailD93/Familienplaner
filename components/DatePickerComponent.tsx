"use client";

import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import { useEffect, useState, type FC } from "react";
import DatePicker from "react-datepicker";
import { de } from "date-fns/locale";
import { format } from "date-fns";
import Button from "./Button";
import { BiChevronRight } from "react-icons/bi";

export interface InputComponentProps {
  selected?: Date | null;
  onChange?: (date: Date | undefined | null) => void;
  excludeDateIntervals?: { start: Date; end: Date }[];
  minDate?: Date | null;
  maxDate?: Date | null;
  setDate?: (selected: Date | null | undefined) => void;
}

const DatePickerComponent: FC<InputComponentProps> = ({
  selected: passedSelected,
  onChange,
  excludeDateIntervals,
  minDate,
  setDate,
}) => {
  const [selected, setSelected] = useState<Date | null | undefined>(
    passedSelected
  );

  useEffect(() => {
    if (selected === passedSelected) return;
    onChange?.(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (selected === passedSelected) return;
    setSelected(passedSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passedSelected]);
  return (
    <div className="min-h-[400px] max-w-[242px] flex flex-col">
      <DatePicker
        locale={de}
        dateFormat="dd. MMM yyyy"
        selected={selected}
        calendarClassName="custom-datepicker"
        dayClassName={() => "custom-day"}
        onChange={(date) => setSelected(date)}
        minDate={minDate || new Date()}
        monthsShown={1}
        inline
        excludeDateIntervals={excludeDateIntervals}
        renderCustomHeader={(params) => {
          return (
            <div className="flex flex-row py-2 mb-1">
              <button
                type="button"
                onClick={params.decreaseMonth}
                disabled={params.prevMonthButtonDisabled}
              >
                <BiChevronRight
                  className={classNames("h-6 w-6 rotate-180", {
                    invisible: params.prevMonthButtonDisabled,
                  })}
                />
              </button>
              <div className="flex flex-col flex-1 text-18 leading-[26px] font-semibold">
                {format(params.monthDate, "MMMM yyyy", { locale: de })}
              </div>
              <button
                type="button"
                onClick={params.increaseMonth}
                disabled={params.nextMonthButtonDisabled}
              >
                <BiChevronRight
                  className={classNames("h-6 w-6", {
                    invisible: params.nextMonthButtonDisabled,
                  })}
                />
              </button>
            </div>
          );
        }}
      />
      <Button
        onClick={() => setDate?.(selected)}
        label={"Auswahl bestätigen"}
        className="w-full"
        size="14"
      />
    </div>
  );
};

export default DatePickerComponent;
