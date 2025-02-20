"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface LandingPageProps {
  title?: string;
}

const LandingPage: FC<LandingPageProps> = () => {
  const router = useRouter();
  return (
    <div>
      <div>Landingpage</div>
      <div
        className="w-full flex justify-center mt-20 cursor-pointer text-24"
        onClick={() => router.push("/start")}
      >
        GO TO LOGIN
      </div>
    </div>
  );
};

export default LandingPage;
