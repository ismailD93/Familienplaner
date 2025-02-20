"use client";
import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import NextImage from "next/image";

type Animation = "register" | "login";

const StartAnimation: FC = () => {
  const searchParams = useSearchParams();
  const animation: Animation =
    (searchParams.get("animation") as Animation) || "login";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: animation === "login" ? "82%" : "0%" }}
        animate={{ x: animation === "login" ? "82%" : "0%" }}
        exit={{ x: animation === "login" ? "82%" : "0%" }}
        transition={{ duration: 0.5 }}
        className="fixed w-full md:w-[55%] z-10 h-full mx-auto text-green"
      >
        <div className="bg-orange w-full h-1/2 md:h-full md:w-full flex max-md:py-10 md:flex-1 items-center justify-center relative flex-col">
          <div className="w-full aspect-[425/348] relative">
            <NextImage
              fill
              src={
                animation === "login"
                  ? "/assets/Login.png"
                  : "/assets/Register.png"
              }
              alt={animation === "login" ? "Login" : "Register"}
              className="object-contain"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StartAnimation;
