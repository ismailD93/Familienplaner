import { FC } from "react";
import NextImage from "next/image";
import RegisterForm from "../../../components/RegisterForm";

type Props = {
  params: {
    locale: string;
  };
};

const RegisterPage: FC<Props> = () => {
  return (
    // <AutWrapper>
    <div className="absolute inset-0 flex flex-col md:flex-row">
      <div className="bg-orange w-full h-1/2 md:h-full md:w-1/2 flex max-md:py-10 md:flex-1 items-center justify-center relative flex-col">
        <div className="w-full aspect-[425/348] relative">
          <NextImage
            fill
            src={"/assets/Login.png"}
            alt={"Login"}
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex flex-1 w-full h-1/2 md:h-full md:w-1/2 flex-col">
        <RegisterForm />
      </div>
    </div>
    // </AutWrapper>
  );
};

export default RegisterPage;
