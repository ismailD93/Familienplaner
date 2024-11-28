"use client";

import classNames from "classnames";
import { FC, useState } from "react";
//The current file is a CommonJS module whose imports generate "require" calls. However, the file that is referenced is an ECMAScript module and cannot be imported with require
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

type NavigationProps = {
  role?: string;
  name?: string;
  isSuperAdmin?: boolean;
};

const Sidebar: FC<NavigationProps> = ({}) => {
  const router = useRouter();
  const { logout } = useAuth();
  const [isSidebarOpen] = useState(true);

  return (
    <>
      {/* <div className="fixed bg-[#E4EDF3] inset-x-0 top-0 z-[1] border-b border-grey-90 bg-blue-100 px-8 py-6">
        <div
          className={classNames(
            "flex justify-between transition-all duration-300",
            {
              "ml-52": isSidebarOpen,
              "ml-14": !isSidebarOpen,
            }
          )}
        >
          <div
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <div>MENU</div>
          </div>
          <div className="flex items-center gap-x-8"></div>
        </div>
      </div>*/}
      <div
        className={classNames("w-full transition-all duration-300", {
          "max-w-[208px]": isSidebarOpen,
          "max-w-[56px]": !isSidebarOpen,
        })}
      >
        <AnimatePresence>
          <motion.div
            initial={{ width: isSidebarOpen ? 208 : 56 }}
            animate={{ width: isSidebarOpen ? 208 : 56 }}
            className="fixed bg-[#E4EDF3] inset-y-0 top-0 z-[2] w-full max-w-[64px] select-none border-r"
          >
            <div className="flex h-full flex-col">
              <div className="flex flex-row items-center gap-x-2 px-4 pt-5">
                {/* <AccountIcon className="h-6  w-full max-w-[24px]" />
                {debouncedShow && (
                  <div
                    className={classNames("line-clamp-1 font-medium", {
                      hidden: !isSidebarOpen,
                    })}
                  >
                    {!!role ? (name ? name : "Logged in") : "LOGIN"}
                  </div>
                )} */}
              </div>
              <div className="mx-2 mt-15 flex flex-col gap-y-0.5">
                {/* {LINKS.map((item, index) => {
                  let filteredLinkItems = item.items;
                  let linkItem = item;
                  if (!isSuperAdmin) {
                    filteredLinkItems = filteredLinkItems.filter(
                      links => !links.superAdminOnly,
                    );
                    linkItem = {...linkItem, items: filteredLinkItems};
                  }
                  if (!isAdmin) {
                    filteredLinkItems = filteredLinkItems.filter(
                      links => !!links.sieAllowed,
                    );
                    linkItem = {...linkItem, items: filteredLinkItems};
                  }
                  if (!role) return null;
                  return (
                    <SidebarDropdown
                      key={index}
                      linkItem={linkItem}
                      url={pathname}
                      openSidebar={() => setIsSidebarOpen(true)}
                      clickedNav={value => {
                        if (subNavLabel === value) {
                          setSubNavLabel(undefined);
                        } else {
                          setSubNavLabel(value);
                        }
                      }}
                      subNav={subNavLabel}
                      isSideBarOpen={isSidebarOpen}
                    />
                  );
                })} */}
              </div>
              <div className="flex h-full items-end justify-center pb-6">
                <div className="flex flex-col gap-y-4 text-center">
                  <div
                    onClick={() => {
                      logout();
                      router.refresh();
                    }}
                    className="cursor-pointer p-2 text-14 font-medium"
                  >
                    {isSidebarOpen ? <span>Logout</span> : "Logouticon"}
                  </div>

                  {/* <Link
                    prefetch={false}
                    href={
                      isAdmin
                        ? '/admin/dashboard'
                        : '/admin/parts/request-match'
                    }
                    className='mx-auto'>
                    {isSidebarOpen ? (
                      <LogoIcon className='w-[94px]' />
                    ) : (
                      <LogoIconNew className='h-3.5 w-3.5' />
                    )}
                  </Link> */}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default Sidebar;
