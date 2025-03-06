import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Calender from "../../../components/Calneder";
import { User } from "../../../types";
import { getCalenderId } from "../../fetchMethods/getCalenderId";
import CreateOrJoinCalender from "../../../components/CreateOrJoinCalender";

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

  const familiy: User[] = [
    user,
    { id: "2", name: "Metehan", status: "online" },
    { id: "3", name: "Uemit", status: "online" },
    { id: "4", name: "Kind1", status: "online" },
    { id: "5", name: "Kind2", status: "offline" },
    { id: "6", name: "Kind3", status: "offline" },
    { id: "7", name: "Oma", status: "online" },
    { id: "8", name: "Opa", status: "offline" },
  ];
  const calenderId = await getCalenderId(authToken);

  if (!calenderId) {
    return <CreateOrJoinCalender />;
  } else {
    return <Calender user={user} family={familiy} />;
  }
};

export default DashboardPage;
