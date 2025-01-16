import Overview from "../../../components/Overview";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// const cookieStore = cookies();
// const authToken = cookieStore.get("authToken")?.value;

// if (!authToken) {
//   redirect("/login");
// }

const OverviewPage = async () => {
  return (
    <div>
      <Overview />
    </div>
  );
};

export default OverviewPage;
