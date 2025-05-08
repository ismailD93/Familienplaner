"use client";

import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import { useEffect, useState, type FC } from "react";
import DatePicker from "react-datepicker";
import { de } from "date-fns/locale";
import { format } from "date-fns";
import { ChevronIcon } from "../icons/ChevronIcon";
import { CalenderIcon } from "../icons/CalenderIcon";
import { IoMdCloseCircle } from "react-icons/io";

export interface InputComponentProps {
  name: string;
  label?: string;
  error?: string | false;
  selected?: Date | null;
  onChange?: (date: Date | undefined | null) => void;
  excludeDateIntervals?: { start: Date; end: Date }[];
  touched?: boolean;
  size?: "18" | "16";
  hidden?: boolean;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  hideCloseIcon?: boolean;
}

const DateInput: FC<InputComponentProps> = ({
  label,
  name,
  error,
  selected: passedSelected,
  onChange,
  touched,
  hidden,
  excludeDateIntervals,
  startDate,
  endDate,
  selectsEnd,
  selectsStart,
  minDate,
  maxDate,
  hideCloseIcon,
}) => {
  const [selected, setSelected] = useState<Date | null | undefined>(
    passedSelected
  );
  console.log(selected, "SELECTED");
  useEffect(() => {
    onChange?.(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    setSelected(passedSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passedSelected]);

  return (
    <>
      <div className="flex relative flex-row w-full border border-gray/20 rounded-md">
        <div
          className={classNames("w-full h-10 px-3 rounded", {
            hidden: hidden,
          })}
        >
          <div className="relative h-10 w-full">
            <DatePicker
              locale={de}
              dateFormat="dd.MM.yyyy"
              selected={selected}
              calendarClassName="custom-datepicker"
              dayClassName={() => "custom-day"}
              startDate={startDate}
              endDate={endDate}
              selectsEnd={selectsEnd}
              selectsStart={selectsStart}
              onChange={(date) => setSelected(date)}
              minDate={minDate || new Date()}
              monthsShown={1}
              wrapperClassName="w-full h-10"
              maxDate={maxDate || new Date()}
              customInput={
                <input readOnly className="outline-none h-10 w-full" />
              }
              excludeDateIntervals={excludeDateIntervals}
              renderCustomHeader={(params) => {
                return (
                  <div className="flex flex-row py-2 mb-1">
                    <button
                      type="button"
                      onClick={params.decreaseMonth}
                      disabled={params.prevMonthButtonDisabled}
                    >
                      <ChevronIcon
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
                      <ChevronIcon
                        className={classNames("h-6 w-6", {
                          invisible: params.nextMonthButtonDisabled,
                        })}
                      />
                    </button>
                  </div>
                );
              }}
            />
          </div>
          {label && (
            <div
              className={classNames(
                "text-black absolute left-3 flex flex-col pointer-events-none",
                {
                  "text-18 leading-[24px] top-0 bottom-0 justify-center":
                    !selected,
                  "text-12 leading-[16px] top-2 bottom-[unset]": !!selected,
                }
              )}
            >
              <div>{label}</div>
            </div>
          )}
          <input
            name={name}
            readOnly
            hidden
            value={selected?.toString() || ""}
          />
          {(!selected || hideCloseIcon) && (
            <div className="absolute top-0 right-0 bottom-0 flex flex-col justify-center pr-3 pointer-events-none">
              <CalenderIcon className="h-4 w-4" />
            </div>
          )}
          {!!selected && !hideCloseIcon && (
            <div className="absolute top-0 right-0 bottom-0 flex flex-col justify-center pr-3 pointer-events-auto">
              <button type="button" onClick={() => setSelected(null)}>
                <IoMdCloseCircle className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      {!!error && !!touched && (
        <span className="flex flex-col w-full text-12 leading-4 text-orange mt-1.5">
          {error}
        </span>
      )}
    </>
  );
};

export default DateInput;
