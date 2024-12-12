"use client";

import classNames from "classnames";
import { addDays, format, startOfWeek } from "date-fns";
import { de } from "date-fns/locale";
import { FC } from "react";
interface CalenderProps {
  name?: string;
}
const Calender: FC<CalenderProps> = ({}) => {
  const weekdays: { weekday: string; date: Date }[] = [];

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });

  for (let i = 0; i < 7; i++) {
    const day = addDays(weekStart, i);
    weekdays.push({ date: day, weekday: format(day, "EEEE", { locale: de }) });
  }

  const userArr = ["ismail", "metehan", "Uemit", "TEst", "Test1", "test2"];

  const test = addDays(new Date(), 6);

  console.log(test);

  return (
    <div className="mx-4 h-full">
      <div className="w-full">
        <div className="flex">
          <div className="min-w-20" />
          {userArr.map((item, index) => {
            return (
              <div className=" w-full" key={index}>
                <div
                  className={classNames(
                    "min-w-[200px] border-t h-10 flex justify-center items-center",
                    {
                      "border-l": index !== 0,
                    }
                  )}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-col flex w-full">
          {weekdays.map((day, rowIndex) => (
            <div key={rowIndex} className="flex w-full min-h-20">
              <div className="min-w-20 flex border-t border-b items-center justify-center">
                <div className="flex flex-col items-center">
                  <div>{day.weekday.slice(0, 2).toUpperCase()}</div>
                  <div>{format(day.date, "dd")}</div>
                </div>
              </div>

              {userArr.map((item, index) => {
                return (
                  <div
                    onClick={() => console.log(item, day)}
                    key={index}
                    className="border border-black min-w-[200px] w-full cursor-pointer"
                  >
                    {}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calender;
