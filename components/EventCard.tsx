import { FC } from "react";
import { User } from "../types";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import classNames from "classnames";
import { BsClockFill } from "react-icons/bs";
import { FaLocationPin } from "react-icons/fa6";
import Button from "./Button";
import { BiChevronDown } from "react-icons/bi";

interface EventCardProps {
  title: string;
  date: Date;
  location: string;
  participants: User[];
}

const EventCard: FC<EventCardProps> = ({
  title,
  date,
  location,
  participants,
}) => {
  const weekdayName = format(date, "EE", { locale: de });
  const weekDay = format(date, "dd", { locale: de });
  const today =
    format(date, "dd.mm.yyyy", { locale: de }).valueOf() ===
    format(new Date(), "dd.mm.yyyy", { locale: de }).valueOf();

  return (
    <div className="bg-white border border-black-50 md:h-32 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex max-md:flex-col">
      <div
        className={classNames(
          "flex md:flex-col max-md:w-full max-md:justify-center max-md:gap-x-5 text-center my-auto items-center w-20 max-md:mb-5 md:mr-3",
          {
            "text-black/80": !today,
            "text-red": today,
          }
        )}
      >
        <span className="text-40 md:text-24">{weekdayName}</span>
        <span className={"text-40 leading-none font-semibold"}>{weekDay}</span>
      </div>
      <div className="border-r max-md:border-b max-md:w-full border-gray/10 md:mr-5 max-md:mb-5" />
      <div className=" flex justify-between w-full max-md:flex-col">
        <div className="flex max-md:flex-col max-md:items-center max-md:gap-y-2 md:w-2/3">
          <div className="flex flex-col md:w-1/2 gap-y-1 md:gap-y-4 justify-center">
            <div className="flex items-center gap-x-2">
              <BsClockFill className="fill-gray" />
              <span className="text-16 text-black/80">{"09:00 - 09:45"}</span>
            </div>
            <div className="flex items-center gap-x-2">
              <FaLocationPin className="fill-gray" />
              <span className="text-14 text-black/80 mt-1">{location}</span>
            </div>
          </div>
          <div className="flex flex-col md:w-1/2 gap-y-1 md:gap-y-4 justify-center">
            <h3 className="text-16 font-medium text-black/80">{title}</h3>

            <div className="text-14 text-black-60 mt-1 flex">
              {participants.map((user, index) => {
                return (
                  <div
                    className={classNames(
                      "size-8 rounded-full bg-black-50 border border-blue flex items-center justify-center",
                      { "-ml-3": index !== 0 }
                    )}
                    key={index}
                  >
                    {user.name.slice(0, 1)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Button
          className="my-auto max-md:mt-4 mx-auto"
          variant="blue"
          label={"Bearbeiten"}
          icon={<BiChevronDown className="size-5" />}
        />
      </div>
    </div>
  );
};

export default EventCard;
