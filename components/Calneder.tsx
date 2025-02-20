"use client";

import classNames from "classnames";
import { addDays, format, startOfWeek, subDays } from "date-fns";
import { de } from "date-fns/locale";
import { FC, useState } from "react";
import { ChevronIcon } from "../icons/ChevronIcon";
import DetailPopUp from "./DetailPopUp";
import { User } from "../types";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { CalenderIcon } from "../icons/CalenderIcon";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import DatePickerModal from "./modal/DatePickerModal";
import DatePickerComponent from "./DatePickerComponent";

interface CalenderProps {
  name?: string;
  user?: User;
  family: User[];
}

const ITEMS_PER_PAGE = 5;

const Calender: FC<CalenderProps> = ({ user, family }) => {
  const weekdays: { weekday: string; date: Date }[] = [];
  const [currentPage, setCurrentPage] = useState(0);
  const [expand, setExpand] = useState<7 | 14>(7);
  const [open, setOpen] = useState<boolean>(false);
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [userView, setUserView] = useState<"self" | "family">("family");
  const today = new Date();
  const [calenderDate, setCalenderDate] = useState<Date>(today);

  const weekStart = startOfWeek(calenderDate, { weekStartsOn: 1 });

  const date = new Date();

  const formattedDate = format(date, "dd.LL.yyyy", { locale: de });
  const selectedDate = format(weekStart, "LLLL yyyy", { locale: de });

  for (let i = 0; i < expand; i++) {
    const day = addDays(weekStart, i);
    weekdays.push({ date: day, weekday: format(day, "EEEE", { locale: de }) });
  }

  // Calculation for user to show
  const paginatedUsers = family.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  const hasNextPage = (currentPage + 1) * ITEMS_PER_PAGE < family.length;
  const hasPrevPage = currentPage > 0;

  return (
    <div className="h-full w-full relative">
      <div className="flex max-cmd:justify-center gap-x-2 lg:pr-10 max-cmd:mt-10 cmd:absolute right-0 top-0">
        <div
          onClick={() => setUserView("self")}
          className={classNames(
            "bg-blue text-white w-10 flex items-center justify-center h-8 cmd:h-[50px] max-cmd:rounded-md cmd:rounded-b-md shadow-lg",
            {
              "bg-blue": userView === "self",
              "bg-blue/50": userView === "family",
            }
          )}
        >
          <FaUser className="size-5" />
        </div>
        <div
          onClick={() => setUserView("family")}
          className={classNames(
            "text-white w-10 flex items-center justify-center h-8 cmd:h-[50px] max-cmd:rounded-md cmd:rounded-b-md shadow-lg",
            {
              "bg-blue/50": userView === "self",
              "bg-blue": userView === "family",
            }
          )}
        >
          <MdOutlineFamilyRestroom className="size-6" />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="mt-4 mb-4 cmd:mb-3 ml-6">
          <div className="flex max-cmd:flex-col max-lg:items-center max-lg:gap-y-3 select-none">
            <div className="flex gap-x-2 cmd:w-1/2 items-center">
              <div className="flex items-center text-16 font-semibold text-gray">
                {selectedDate}
              </div>
              <div
                onClick={() => setOpenDatePicker?.(true)}
                className="text-blue rounded-md hover:bg-blue hover:text-white cursor-pointer size-8 flex items-center justify-center"
              >
                <CalenderIcon className="size-4" />
              </div>
            </div>
            <div className="cmd:w-2/3 gap-x-2 flex items-center text-gray">
              <div
                className="cursor-pointer hover:text-blue"
                onClick={() => setCalenderDate((prev) => subDays(prev, 7))}
              >
                <BiChevronLeft className="size-8" />
              </div>

              <div
                className="cursor-pointer hover:text-blue font-semibold"
                onClick={() => setCalenderDate(new Date())}
              >
                {formattedDate}
              </div>

              <div
                className="cursor-pointer hover:text-blue"
                onClick={() => setCalenderDate((prev) => addDays(prev, 7))}
              >
                <BiChevronRight className="size-8" />
              </div>
            </div>
          </div>
        </div>
        {/* Header */}
        <div className="flex sticky top-0 z-20">
          <div className="min-w-10 cmd:min-w-20" />
          {userView === "family" ? (
            paginatedUsers.map((item, index) => {
              return (
                <div className="w-full" key={index}>
                  <div
                    className={classNames(
                      "border-t flex max-cmd:flex-row-reverse cmd:gap-x-4 text-gray border-gray/10 justify-center items-center border-l py-4",
                      {
                        "border-r": index === paginatedUsers.length - 1,
                      }
                    )}
                  >
                    <div className=" cmd:size-12 bg-gray/50 rounded-full relative">
                      <div
                        className={classNames(
                          "size-2.5 max-md:hidden rounded-full absolute cmd:-bottom-0.5 -bottom-5 -right-2 cmd:-right-1",
                          {
                            "bg-green": item.status === "online",
                            "bg-[#F68C14]": item.status === "offline",
                          }
                        )}
                      />
                    </div>
                    <div className="cmd:flex hidden">{item.name}</div>
                    <div className="flex size-9 items-center justify-center cmd:hidden bg-black-60 rounded-full">
                      {item.name.slice(0, 2)}
                    </div>
                  </div>
                  <div
                    className={classNames("md:hidden w-full h-2", {
                      "bg-green": item.status === "online",
                      "bg-[#F68C14]": item.status === "offline",
                    })}
                  />
                </div>
              );
            })
          ) : (
            <div className="w-full">
              <div
                className={classNames(
                  "border-t border-r flex max-cmd:flex-row-reverse cmd:gap-x-4 text-gray border-gray/10 justify-center items-center border-l py-4"
                )}
              >
                <div className=" cmd:size-12 bg-gray/50 rounded-full relative">
                  <div
                    className={classNames(
                      "size-2.5 max-md:hidden rounded-full absolute cmd:-bottom-0.5 -bottom-5 -right-2 cmd:-right-1",
                      {
                        "bg-green": user?.status === "online",
                        "bg-[#F68C14]": user?.status === "offline",
                      }
                    )}
                  />
                </div>
                <div className="cmd:flex hidden">{user?.name}</div>
                <div className="flex size-9 items-center justify-center cmd:hidden bg-black-60 rounded-full">
                  {user?.name.slice(0, 2)}
                </div>
              </div>
              <div
                className={classNames("md:hidden w-full h-2", {
                  "bg-green": user?.status === "online",
                  "bg-[#F68C14]": user?.status === "offline",
                })}
              />
            </div>
          )}
        </div>

        {/* Weeklyview */}
        <div className="relative">
          <div className="flex-col flex w-full">
            <div />
            {weekdays.map((day, rowIndex) => {
              return (
                <div key={rowIndex} className="flex w-full min-h-20">
                  <div
                    className={classNames(
                      "min-w-10 cmd:min-w-20 border-l border-gray/10 border-b text-gray flex min-h-20 items-center justify-center",
                      {
                        "border-t rounded-tl-md": rowIndex === 0,
                        "bg-blue/5": isSameDay(date, day.date),
                      }
                    )}
                  >
                    <div className="flex flex-col items-center">
                      <div>{day.weekday.slice(0, 2).toUpperCase()}</div>
                      <div>{format(day.date, "dd")}</div>
                    </div>
                  </div>
                  <div className="flex w-full overflow-y-scroll">
                    {userView === "family" ? (
                      paginatedUsers.map((item, index) => {
                        return (
                          <div
                            onDoubleClick={() => {
                              setOpen(!open);
                              console.log(item.name, day.date);
                            }}
                            key={index}
                            className={classNames(
                              "border-b border-l border-gray/10 w-full cursor-pointer",
                              {
                                "border-t": rowIndex === 0,
                                "border-r": index === paginatedUsers.length - 1,
                                "bg-blue/5": isSameDay(date, day.date),
                              }
                            )}
                          >
                            {}
                          </div>
                        );
                      })
                    ) : (
                      <div
                        onDoubleClick={() => {
                          setOpen(!open);
                        }}
                        className={classNames(
                          "border-b border-l border-gray/10 w-full cursor-pointer border-r",
                          {
                            "border-t": rowIndex === 0,
                          }
                        )}
                      >
                        {}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            onClick={() => {
              if (expand === 7) {
                setExpand(14);
              } else setExpand(7);
            }}
            className="mb-1 w-full border-gray/30 cursor-pointer border rounded-sm mt-0.5 shadow-xl py-1 flex justify-center"
          >
            <ChevronIcon
              className={classNames("size-4 transition-all duration-200", {
                "rotate-90": expand === 7,
                "-rotate-90": expand === 14,
              })}
            />
          </div>
        </div>
        {/* Pagination */}
        <div
          className={classNames("flex justify-between mt-4", {
            hidden: userView === "self",
          })}
        >
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
      </div>
      <DetailPopUp open={open} setClose={() => setOpen(false)} />
      <DatePickerModal
        onClose={() => setOpenDatePicker(false)}
        open={openDatePicker}
      >
        <DatePickerComponent
          setDate={(date) => {
            if (date) {
              setCalenderDate(date);
            }
            setOpenDatePicker(false);
          }}
        />
      </DatePickerModal>
    </div>
  );
};

export default Calender;

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
