import { FC } from "react";
import RegisterForm from "../../../components/RegisterForm";
import LoginForm from "../../../components/LoginForm";
import StartAnimation from "../../../components/Animation";

type Props = {
  params: {
    locale: string;
  };
};

const StartPage: FC<Props> = () => {
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
