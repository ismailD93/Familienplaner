"use client";

import Link from "next/link";
import { FC } from "react";
import TextInput from "./TextInput";
import { Logo } from "../icons/Logo";
import { useFormik } from "formik";
import Button from "./Button";
import getLoginFormSchema from "../validation/loginFormschema";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const LoginForm: FC = ({}) => {
  const router = useRouter();
  const { login, logout } = useAuth();
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
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        login(data);
        if (data.token) {
          router.push("/");
        }
      } catch (error) {
        console.error("Submitting information form failed", error);
      }
    },
  });

  return (
    <div className="h-full w-full flex flex-col items-center p-8 md:p-10">
      <form
        id="loginForm"
        onSubmit={formik.handleSubmit}
        className="w-full md:max-w-[500px] max-w-full flex flex-col md:justify-center flex-1"
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
            error={formik.errors.username}
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
            error={formik.errors.password}
            touched={formik.touched.password}
            defaultValue=""
          />
        </div>
        <div className="mt-2 w-full">
          <Link className="text-button-small" href="/passwort">
            Passwort vergessen?
          </Link>
        </div>
        <div className="mt-10 md:px-8">
          <Button
            className="w-full"
            type="submit"
            form="loginForm"
            label="Anmelden"
          />
        </div>
        <div className="mt-10 md:px-8">
          <Button
            className="w-full"
            onClick={() => logout()}
            type="button"
            label="Logout"
          />
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
