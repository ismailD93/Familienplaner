"use client";

import { FC, useState } from "react";
import TextInput from "../TextInput";
import { useFormik } from "formik";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";
import { Animation } from "../Animation";
import createFamilyFormschema from "../../validation/createFamilyFormschema";

const CreateFamilyForm: FC = ({}) => {
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
    validationSchema: createFamilyFormschema(),
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
      className={classNames("h-full w-full flex flex-col items-center", {
        "max-md:hidden": animation === "register",
      })}
    >
      <form
        id="loginForm"
        onSubmit={formik.handleSubmit}
        className="w-full md:max-w-[500px] max-w-full flex flex-col md:justify-center flex-1"
      >
        Erstellen Sie eine Familie
        <div className="w-full mt-8 md:mt-10">
          <TextInput
            placeholder="Familienname / Kalendername"
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
            placeholder="Autenthifizierungscode"
            type="password"
            name="password"
            onChange={formik.handleChange}
            error={formik.errors.password || falseValues}
            touched={formik.touched.password}
            defaultValue=""
          />
        </div>
        <div className="flex flex-col mt-10 gap-x-6">
          <Button
            className="w-full"
            type="submit"
            size="14"
            variant="blue"
            form="loginForm"
            label="Erstellen"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateFamilyForm;
