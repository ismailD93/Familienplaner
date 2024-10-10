import { FC } from "react";

type Props = {
  params: {
    locale: string;
  };
};

const DashboardPage: FC<Props> = async () => {
  return (
    <div>
      <div>dashboard </div>
    </div>
  );
};

export default DashboardPage;
