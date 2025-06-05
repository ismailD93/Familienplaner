import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Settings from "../../../components/Settings";
import { getAllFamilyMembers } from "../../fetchMethods/getAllFamilyMembers";
import { getCalenderId } from "../../fetchMethods/getCalenderId copy";

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
      <Settings
        userToken={authToken}
        members={allFamilyMembers.familyMembers}
      />
    </div>
  );
};

export default DashboardPage;
