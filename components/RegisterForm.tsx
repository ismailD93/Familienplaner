"use client";

import { FC, useState } from "react";
import TextInput from "./TextInput";
import { Logo } from "../icons/Logo";
import { useFormik } from "formik";
import Button from "./Button";
import { useRouter, useSearchParams } from "next/navigation";
import getRegisterFormSchema from "../validation/registerFormschema";
import { Animation } from "./Animation";
import classNames from "classnames";
import NextImage from "next/image";

const RegisterForm: FC = ({}) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const animation: Animation =
    (searchParams.get("animation") as Animation) || "login";

  const [falseValues, setFalseValues] = useState<string | undefined>(undefined);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: getRegisterFormSchema(),
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const res = await fetch(`http://localhost:5140/api/account/register`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": "de",
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
          }),
        });

        if (!res.ok) {
          setFalseValues("Anmelde Daten falsch!");
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Überprüfe den HTTP-Statuscode
        const statusCode = res.status; // z.B. 200, 400, 500, etc.

        if (statusCode === 200) {
          setTimeout(() => {
            router.push("/login");
          }, 100);
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
        { "max-md:hidden": animation === "login" }
      )}
    >
      <form
        id="registerForm"
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
          <span>Bitte registrieren Sie sich, um fortzufahren.</span>
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
        <div className="w-full mt-6">
          <TextInput
            placeholder="Email"
            type="text"
            name="email"
            onChange={formik.handleChange}
            error={formik.errors.email || falseValues}
            touched={formik.touched.email}
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
        <div className="mt-6 w-full">
          <TextInput
            placeholder="Passwort bestätigen"
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            error={formik.errors.confirmPassword || falseValues}
            touched={formik.touched.password}
            defaultValue=""
          />
        </div>
        <div className="flex flex-col mt-10 gap-x-6">
          <Button
            className="w-full"
            type="submit"
            form="registerForm"
            label="Registrieren"
          />
          <div
            className="mx-auto mt-5 text-blue underline underline-offset-4 font-semibold cursor-pointer"
            onClick={() => router.push("/start?animation=login")}
          >
            Zurück zum Anmelden
          </div>
        </div>
      </form>
      <div className="bg-orange w-full h-1/2 flex md:flex-1 items-center justify-center relative flex-col md:hidden">
        <div className="w-full aspect-[425/348] relative">
          <NextImage
            fill
            src={"/assets/Register.png"}
            alt={"Login"}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
