import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Calender from "../../../components/Calneder";
import { User } from "../../../types";
import { getCalenderId } from "../../fetchMethods/getCalenderId";
import CreateOrJoinCalender from "../../../components/CreateOrJoinCalender";
import { getAllCalenderEvents } from "../../fetchMethods/getAllCalenderEvents";

const DashboardPage = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    redirect("/start?animation=login");
  }
  const user = {
    id: "1",
    name: "Ismail",
    status: "online",
    role: "admin",
  } as User;

  const calenderId = await getCalenderId(authToken);

  if (!calenderId) {
    return <CreateOrJoinCalender />;
  } else {
    const allEvents = await getAllCalenderEvents(authToken, calenderId);

    return <Calender user={user} family={allEvents.familyMembers} />;
  }
};

export default DashboardPage;
