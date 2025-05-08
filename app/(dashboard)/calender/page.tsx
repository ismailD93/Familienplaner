import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Calender from "../../../components/Calneder";
import { User } from "../../../types";
import { getCalenderId } from "../../fetchMethods/getCalenderId";
import CreateOrJoinCalender from "../../../components/CreateOrJoinCalender";
import { getAllFamilyMembers } from "../../fetchMethods/getAllFamilyMembers";
import { getAllCalenderEvents } from "../../fetchMethods/getAllCalenderEvents";
import { getUserByToken } from "../../fetchMethods/getUserByToken";

const DashboardPage = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    redirect("/start?animation=login");
  }

  const user = (await getUserByToken(authToken)) as User;

  const calenderId = await getCalenderId(authToken);
  if (!calenderId) {
    return <CreateOrJoinCalender />;
  } else {
    const allFamilyMembers = await getAllFamilyMembers(authToken, calenderId);
    const allEvents = await getAllCalenderEvents(authToken, calenderId);

    return (
      <Calender
        events={allEvents}
        user={user}
        family={allFamilyMembers.familyMembers}
      />
    );
  }
};

export default DashboardPage;
