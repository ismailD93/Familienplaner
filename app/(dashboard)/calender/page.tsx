// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

import Calender from "../../../components/Calneder";

const DashboardPage = async () => {
  // const cookieStore = cookies();
  // const authToken = cookieStore.get("authToken")?.value;

  // if (!authToken) {
  //   redirect("/login");
  // }

  return <Calender />;
};

export default DashboardPage;
