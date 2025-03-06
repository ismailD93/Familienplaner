import Overview from "../../../components/Overview";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieStore = cookies();
const authToken = cookieStore.get("authToken")?.value;

if (!authToken) {
  redirect("/start?animation=login");
}

const OverviewPage = async () => {
  return <Overview />;
};

export default OverviewPage;
