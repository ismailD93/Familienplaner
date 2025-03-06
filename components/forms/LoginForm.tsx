"use client";

import Link from "next/link";
import { FC, useState } from "react";
import TextInput from "../TextInput";
import { Logo } from "../../icons/Logo";
import { useFormik } from "formik";
import Button from "../Button";
import getLoginFormSchema from "../../validation/loginFormschema";
import { useAuth } from "../../context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import NextImage from "next/image";
import classNames from "classnames";
import { Animation } from "../Animation";

const LoginForm: FC = ({}) => {
  const router = useRouter();
  const { login } = useAuth();

  const searchParams = useSearchParams();
  const animation: Animation =
    (searchParams.get("animation") as Animation) || "login";

  const [falseValues, setFalseValues] = useState<string | undefined>(undefined);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: getLoginFormSchema(),
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const res = await fetch(`http://localhost:5140/api/account/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": "de",
          },
          body: JSON.stringify({
            username: values.username,
            password: values.password,
          }),
        });

        if (!res.ok) {
          setFalseValues("Anmelde Daten falsch!");
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const loggedIn = login(data.token);

        console.log(loggedIn, "LOGEDIND");
        if (loggedIn) {
          setTimeout(() => {
            router.push("/overview");
          }, 200);
        }
      } catch (error) {
        console.error("Submitting information form failed", error);
      }
    },
  });

  return (
    <div
      className={classNames(
        "h-full w-full flex flex-col items-center md:p-10",
        { "max-md:hidden": animation === "register" }
      )}
    >
      <form
        id="loginForm"
        onSubmit={formik.handleSubmit}
        className="w-full md:max-w-[500px] max-w-full flex flex-col md:justify-center flex-1 max-md:p-8"
      >
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
            placeholder="Username"
            type="text"
            name="username"
            onChange={formik.handleChange}
            error={formik.errors.username || falseValues}
            touched={formik.touched.username}
            defaultValue=""
          />
        </div>
        <div className="mt-6 w-full">
          <TextInput
            placeholder="Passwort"
            type="password"
            name="password"
            onChange={formik.handleChange}
            error={formik.errors.password || falseValues}
            touched={formik.touched.password}
            defaultValue=""
          />
        </div>
        <div className="mt-2 w-full">
          <Link className="text-button-small" href="/passwort">
            Passwort vergessen?
          </Link>
        </div>
        <div className="flex flex-col mt-10 gap-x-6">
          <Button
            className="w-full"
            type="submit"
            form="loginForm"
            label="Anmelden"
          />
          <div className="flex max-lg:flex-col mt-5 mx-auto max-lg:text-center">
            <span>Noch kein Account ?</span>
            <div
              className="text-blue md:ml-4 underline underline-offset-2 font-semibold cursor-pointer"
              onClick={() => router.push("/start?animation=register")}
            >
              Hier klicken zum Registrieren
            </div>
          </div>
        </div>
      </form>
      <div className="bg-orange w-full h-1/2 flex md:flex-1 items-center justify-center relative flex-col md:hidden">
        <div className="w-full aspect-[425/348] relative">
          <NextImage
            fill
            src={"/assets/Login.png"}
            alt={"Login"}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
