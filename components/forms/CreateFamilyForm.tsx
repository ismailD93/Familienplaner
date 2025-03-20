"use client";

import { FC } from "react";
import TextInput from "../TextInput";
import { useFormik } from "formik";
import Button from "../Button";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";
import { Animation } from "../Animation";
import createFamilyFormschema from "../../validation/createFamilyFormschema";
import { useAuth } from "../../context/AuthContext";
import { createCalender } from "../../app/fetchMethods/createCalender";
import { assignToCalender } from "../../app/fetchMethods/asignToCalender";

const CreateFamilyForm: FC = ({}) => {
  const router = useRouter();
  const { authToken } = useAuth();
  const searchParams = useSearchParams();
  const animation: Animation =
    (searchParams.get("animation") as Animation) || "login";

  const formik = useFormik({
    initialValues: {
      familyName: "",
      authentication: "",
    },
    validationSchema: createFamilyFormschema(),
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        if (!authToken) return null;
        const create = await createCalender(authToken, values.familyName);

        if (!create.id) {
          console.error("Error");
        }
        const assignUserToCalender = await assignToCalender(
          authToken,
          create.id
        );

        if (assignUserToCalender.succeeded) {
          setTimeout(() => {
            router.push("/calender");
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
            name="familyName"
            onChange={formik.handleChange}
            error={formik.errors.familyName}
            touched={formik.touched.familyName}
            defaultValue=""
          />
        </div>
        <div className="mt-6 w-full">
          <TextInput
            placeholder="Autenthifizierungscode"
            type="password"
            name="authentication"
            onChange={formik.handleChange}
            error={formik.errors.authentication}
            touched={formik.touched.authentication}
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
