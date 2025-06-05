import Overview from "../../../components/Overview";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCalenderId } from "../../fetchMethods/getCalenderId";
import CreateOrJoinCalender from "../../../components/CreateOrJoinCalender";
import { getAllCalenderEvents } from "../../fetchMethods/getAllCalenderEvents";

const OverviewPage = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    redirect("/start?animation=login");
  }

  const calenderId = await getCalenderId(authToken);
  if (!calenderId) {
    return <CreateOrJoinCalender />;
  } else {
    const allEvents = await getAllCalenderEvents(authToken, calenderId);
    return <Overview events={allEvents} token={authToken} />;
  }
};

export default OverviewPage;
