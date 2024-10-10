import { FC, ReactNode } from "react";

type Props = {
  params: {
    locale: string;
  };
  children: ReactNode;
};

const DashboardLayout: FC<Props> = async ({ children }) => {
  return <div>{children}</div>;
};

export default DashboardLayout;
