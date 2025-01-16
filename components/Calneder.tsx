"use client";

import classNames from "classnames";
import { addDays, format, startOfWeek } from "date-fns";
import { de } from "date-fns/locale";
import { FC, useState } from "react";
import { ChevronIcon } from "../icons/ChevronIcon";
import DetailPopUp from "./DetailPopUp";

interface CalenderProps {
  name?: string;
}

const ITEMS_PER_PAGE = 6;

const Calender: FC<CalenderProps> = ({}) => {
  const weekdays: { weekday: string; date: Date }[] = [];
  const [currentPage, setCurrentPage] = useState(0);
  const [expand, setExpand] = useState<7 | 14>(7);
  const [open, setOpen] = useState<boolean>(false);

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });

  for (let i = 0; i < expand; i++) {
    const day = addDays(weekStart, i);
    weekdays.push({ date: day, weekday: format(day, "EEEE", { locale: de }) });
  }

  const userArr = [
    "ismail",
    "metehan",
    "Uemit",
    "TEst",
    "Test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
  ];

  // Calculation for user to show
  const paginatedUsers = userArr.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  console.log(expand);
  const hasNextPage = (currentPage + 1) * ITEMS_PER_PAGE < userArr.length;
  const hasPrevPage = currentPage > 0;

  return (
    <div className="h-full w-full relative">
      <div className="my-5">TEST</div>
      {/* Header */}
      <div className="flex sticky top-0 z-20">
        <div className="min-w-20" />
        {paginatedUsers.map((item, index) => {
          return (
            <div className="w-full max-w-[200px]" key={index}>
              <div
                className={classNames(
                  "border-t h-10 flex text-gray border-gray/10 justify-center items-center border-l",
                  {
                    "border-r": index === paginatedUsers.length - 1,
                  }
                )}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>

      {/* Weeklyview */}
      <div className="flex-col flex w-full relative">
        {weekdays.map((day, rowIndex) => (
          <div key={rowIndex} className="flex w-full min-h-20">
            <div
              className={classNames(
                "min-w-20 border-l border-gray/10 border-b text-gray flex min-h-20 items-center justify-center",
                {
                  "border-t rounded-tl-md": rowIndex === 0,
                }
              )}
            >
              <div className="flex flex-col items-center">
                <div>{day.weekday.slice(0, 2).toUpperCase()}</div>
                <div>{format(day.date, "dd")}</div>
              </div>
            </div>
            <div className="flex w-full">
              {paginatedUsers.map((item, index) => {
                return (
                  <div
                    onDoubleClick={() => {
                      setOpen(!open);
                    }}
                    key={index}
                    className={classNames(
                      "border-b border-l border-gray/10 w-full cursor-pointer max-w-[200px]",
                      {
                        "border-t": rowIndex === 0,
                        "border-r": index === paginatedUsers.length - 1,
                      }
                    )}
                  >
                    {}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={() => {
          if (expand === 7) {
            setExpand(14);
          } else setExpand(7);
        }}
        className="w-full border-gray/30 cursor-pointer border rounded-sm mt-0.5 shadow-xl py-1 flex justify-center"
      >
        <ChevronIcon
          className={classNames("size-4 transition-all duration-200", {
            "rotate-90": expand === 7,
            "-rotate-90": expand === 14,
          })}
        />
      </div>
      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-10"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={!hasPrevPage}
        >
          <ChevronIcon className="size-6 rotate-[180deg]" />
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-10"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={!hasNextPage}
        >
          <ChevronIcon className="size-6" />
        </button>
      </div>
      <DetailPopUp open={open} setClose={() => setOpen(false)} />
    </div>
  );
};

export default Calender;
