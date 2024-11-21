import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  // Access cookies server-side
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome! Your token: {authToken}</p>
    </div>
  );
};

export default DashboardPage;
