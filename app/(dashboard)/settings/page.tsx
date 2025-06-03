import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Settings from "../../../components/Settings";
import { getAllFamilyMembers } from "../../fetchMethods/getAllFamilyMembers";
import { getCalenderId } from "../../fetchMethods/getCalenderId copy";
import CreateOrJoinCalender from "../../../components/CreateOrJoinCalender";
import { User } from "../../../types";
import { getUserByToken } from "../../fetchMethods/getUserByToken";

const DashboardPage = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    redirect("/login");
  }
  const calenderId = await getCalenderId(authToken);

  const allFamilyMembers = await getAllFamilyMembers(authToken, calenderId);

  return (
    <div>
      <Settings members={allFamilyMembers.familyMembers} />
    </div>
  );
};

export default DashboardPage;
