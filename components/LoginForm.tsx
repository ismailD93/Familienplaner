"use client";

import Link from "next/link";
import { FC, useRef } from "react";
import TextInput from "./TextInput";
import { Logo } from "../icons/Logo";

const LoginForm: FC = ({}) => {
  const submitRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="h-full w-full flex flex-col items-center p-8 md:p-10">
      <form className="w-full md:max-w-[500px] max-w-full flex flex-col md:justify-center flex-1">
        <div className="text-center w-full flex items-center">
          <Logo className="size-16" />{" "}
          <div className="text-52 mt-auto font-bold text-blue !leading-none">
            UMI
          </div>
        </div>
        <div className="flex flex-col ml-2.5 mt-4">
          <span className="md:text-20 lg:text-24 font-bold">
            Ein Plan für die ganze Familie
          </span>
          <span>Willkommen zurück, bitte melde dich in dein Konto ein</span>
        </div>
        <div className="w-full mt-8 md:mt-10">
          <TextInput
            placeholder="Email"
            type="email"
            name="email"
            defaultValue=""
          />
        </div>
        <div className="mt-6 w-full">
          <TextInput
            placeholder="Passwort"
            type="password"
            name="password"
            defaultValue=""
          />
        </div>
        <div className="mt-2 w-full">
          <Link className="text-button-small" href="/passwort">
            Passwort vergessen?
          </Link>
        </div>
        <div className="mt-10 md:px-8">
          <button ref={submitRef} className="w-full" type="submit" />
        </div>
      </form>
      <div>
        <Link
          href="/support"
          className="text-button underline underline-offset-8"
        >
          Hilfe & Kontakt
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
