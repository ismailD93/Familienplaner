import { FC } from "react";
import RegisterForm from "../../../components/forms/RegisterForm";
import LoginForm from "../../../components/forms/LoginForm";
import StartAnimation from "../../../components/Animation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  params: {
    locale: string;
  };
};

const StartPage: FC<Props> = () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (authToken) {
    redirect("/calender");
  }

  return (
    <div className="flex justify-between h-screen max-md:flex-col">
      <StartAnimation />
      <div className="md:w-[45%]">
        <LoginForm />
      </div>
      <div className="md:w-[45%]">
        <RegisterForm />
      </div>
    </div>
  );
};

export default StartPage;
