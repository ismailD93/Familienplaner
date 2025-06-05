import React, { FC, useState } from "react";
import classNames from "classnames";
import { addHours, addMinutes, format, setHours, setMinutes } from "date-fns";
import { BsClock } from "react-icons/bs";

interface TimeProps {
  name?: string;
  label?: string;
  error?: string;
  selectedValue?: string;
  touched?: boolean;
  readOnly?: boolean;
  setTime?: (value: { hour: string; minute: string }) => void;
}

const TimeSelect: FC<TimeProps> = ({
  name,
  label,
  error,
  selectedValue,
  touched,
  readOnly,
  setTime,
}) => {
  const slicedTime = selectedValue?.split(":");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<{ hour: string; minute: string }>({
    hour: slicedTime?.[0] || "-",
    minute: slicedTime?.[1] || "-",
  });

  const generateTimeOptions = () => {
    const startTime = setHours(setMinutes(new Date(), 0), 0);
    const optionsHour = Array.from({ length: 24 }, (_, index) => {
      const time = addHours(startTime, index);
      return { label: format(time, "HH"), value: format(time, "HH") };
    });

    return optionsHour;
  };

  const generateMinuteOptions = () => {
    const startTime = setMinutes(new Date(), 0);
    const optionsMinute = Array.from({ length: 4 }, (_, index) => {
      const time = addMinutes(startTime, index * 15);
      return { label: format(time, "mm"), value: format(time, "mm") };
    });

    return optionsMinute;
  };

  const timeOptions = generateTimeOptions();
  const minuteOptions = generateMinuteOptions();
  return (
    <div className="relative">
      {!!error && (
        <span className="flex absolute -bottom-4 flex-col text-12 leading-4 text-red mt-1.5">
          {error}
        </span>
      )}
      <div className="flex flex-col min-w-[120px]">
        <div
          className={classNames(
            "h-10 relative select-none rounded border border-gray/20",
            {
              "cursor-pointer": !readOnly,
              "border-red": error,
              "border-black-40": !error || !touched,
              "border-black-90": isOpen && !readOnly,
            }
          )}
        >
          <div
            className="h-full px-3 text-18 md:text-16"
            onBlur={() => {
              if (readOnly) return;
              setIsOpen(false);
            }}
            tabIndex={0}
            onClick={() => {
              if (readOnly) return;
              if (!isOpen) {
                setIsOpen(true);
              }
            }}
          >
            <div className="my-auto flex h-full gap-x-4 w-full justify-between items-center text-18">
              <div
                className={classNames(
                  "absolute left-3 flex select-none items-center py-4 transition-all duration-200 top-0 md:-mt-1.5 -mt-2 text-black-90",
                  {
                    hidden: selected && !label,
                    "text-red": error && touched,
                    "text-black-70": !error || !touched,
                  }
                )}
              >
                {label}
              </div>
              {!!selected && (
                <div className={classNames({ "mt-[17px]": !!label })}>
                  {selected.hour || "-"}:{selected.minute || "-"}
                </div>
              )}
              <BsClock className="text-black size-4" />
              {isOpen && (
                <div
                  className={classNames(
                    "absolute flex max-h-50 min-w-[120px] gap-x-2 overflow-x-hidden left-0 top-[100%] mt-[6px] z-[10] rounded overflow-hidden shadow-dropdown bg-white"
                  )}
                >
                  <div className="max-w-[60px] w-full no-scrollbar overflow-y-auto">
                    {timeOptions.map((hourOption, index) => (
                      <div
                        onClick={() => {
                          const updated = {
                            ...selected,
                            hour: hourOption.value.toString(),
                          };
                          setSelected(updated);
                          setTime?.(updated);
                        }}
                        key={`hour-${index}`}
                        className={classNames("flex justify-center w-full", {
                          "bg-blue-light/30 border-2 border-gray/10":
                            selected.hour === hourOption.value,
                          "hover:bg-blue-light/10":
                            selected.hour !== hourOption.value,
                        })}
                      >
                        <div className="flex flex-col py-1.5">
                          {hourOption.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="max-w-[60px] w-full no-scrollbar overflow-y-auto">
                    {minuteOptions.map((minuteOption, index) => (
                      <div
                        onClick={() => {
                          const updated = {
                            ...selected,
                            minute: minuteOption.value.toString(),
                          };
                          setSelected(updated);
                          setTime?.(updated);
                          setIsOpen(false);
                        }}
                        key={`hour-${index}`}
                        className={classNames("flex justify-center w-full", {
                          "bg-blue-light/30 border-2 border-gray/10":
                            selected.minute === minuteOption.value,
                          "hover:bg-blue-light/10":
                            selected.minute !== minuteOption.value,
                        })}
                      >
                        <ul className="flex" key={index}>
                          <li className="flex flex-col py-1.5">
                            {minuteOption.label}
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <input
          hidden
          name={name}
          readOnly
          value={`${selected.hour}:${selected.minute}`}
        />
      </div>
    </div>
  );
};

export default TimeSelect;
