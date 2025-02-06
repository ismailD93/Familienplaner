import { FC, ReactNode } from "react";
import Sidebar from "../../components/Sidebar";

type Props = {
  params: {
    locale: string;
  };
  children: ReactNode;
};

const DashboardLayout: FC<Props> = async ({ children }) => {
  return (
    <div className="relative flex h-screen w-full flex-col">
      <div className="flex h-full w-full">
        <Sidebar />
        <div className="w-full mx-2">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
