"use client";
import Link from "next/link";
import { FC } from "react";

interface LandingPageProps {
  title?: string;
}

const LandingPage: FC<LandingPageProps> = () => {
  return (
    <div>
      <div>Landingpage</div>
      <Link
        href={"/start"}
        className="w-full flex justify-center mt-20 cursor-pointer text-24"
      >
        GO TO LOGIN
      </Link>
    </div>
  );
};

export default LandingPage;
