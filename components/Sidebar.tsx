"use client";

import { FC } from "react";
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { TbLogout } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { GoGear } from "react-icons/go";
import classNames from "classnames";

type NavigationProps = {
  disableButtons?: boolean;
};

const Sidebar: FC<NavigationProps> = ({ disableButtons }) => {
  const router = useRouter();
  const { logout } = useAuth();
  const pathname = usePathname();

  const linkItems = [
    {
      link: "/overview",
      label: "Überblick",
      icon: <LuClipboardList className="size-6 md:size-7" />,
    },
    {
      link: "/calender",
      label: "Kalender",
      icon: <SlCalender className="size-5 md:size-6" />,
    },
    {
      link: "/family",
      label: "Familie",
      icon: <MdOutlineFamilyRestroom className="size-5 md:size-6" />,
    },
  ];

  return (
    <div className="w-full max-w-[50px] md:max-w-[64px] ">
      <div className="fixed bg-[#E4EDF3] inset-y-0 top-0 z-[2] w-full max-w-[50px] md:max-w-[64px] select-none shadow-xl">
        <div className="flex flex-col justify-between h-full px-2 py-36 items-center">
          <div className="flex flex-col  text-10">
            {linkItems.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    if (!disableButtons) router.push(item.link);
                  }}
                  key={index}
                  className={classNames(
                    "flex flex-col items-center p-2 gap-y-1.5 rounded-md",
                    {
                      "cursor-pointer": !disableButtons,
                      "text-gray/60": disableButtons,
                      "text-blue": pathname === item.link && !disableButtons,
                      "text-gray/80": pathname !== item.link && !disableButtons,
                      "hover:bg-blue hover:bg-opacity-15 cursor-pointer":
                        pathname !== item.link && !disableButtons,
                    }
                  )}
                >
                  {item.icon}
                  <span className="hidden md:block">{item.label}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-y-10 text-10">
            <div
              onClick={() => {
                logout();
                router.refresh();
              }}
              className="cursor-pointer text-10 font-medium flex flex-col items-center gap-y-1.5 hover:text-blue"
            >
              <TbLogout className="size-5 md:size-6 text-gray/80" />
              <span className="hidden text-gray md:block">Ausloggen</span>
            </div>
            <div
              onClick={() => {
                if (!disableButtons) router.push("/settings");
              }}
              className={classNames(
                "flex flex-col items-center p-2 rounded-md gap-y-1.5",
                {
                  "cursor-pointer": !disableButtons,
                  "text-gray/60": disableButtons,
                  "text-blue": pathname === "/settings" && !disableButtons,
                  "text-gray/80": pathname === "/settings" && !disableButtons,
                  "hover:bg-blue hover:bg-opacity-15 cursor-pointer":
                    pathname === "/settings" && !disableButtons,
                }
              )}
            >
              <GoGear
                className={classNames("size-5 md:size-6", {
                  "text-blue": pathname === "/settings",
                  "text-gray/80": pathname !== "/settings",
                })}
              />
              <span className="hidden md:block ">Einstellung</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
