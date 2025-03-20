import { FC, ReactNode } from "react";
import Sidebar from "../../components/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCalenderId } from "../fetchMethods/getCalenderId";

type Props = {
  params: {
    locale: string;
  };
  children: ReactNode;
};

const DashboardLayout: FC<Props> = async ({ children }) => {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    redirect("/start?animation=login");
  }
  const calenderId = await getCalenderId(authToken);

  return (
    <div className="relative flex h-screen w-full flex-col">
      <div className="flex h-full w-full">
        <Sidebar disableButtons={calenderId ? false : true} />
        <div className="w-full mx-2">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
