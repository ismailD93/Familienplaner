"use client";

import { FC, useState } from "react";
import TextInput from "../TextInput";
import { useFormik } from "formik";
import Button from "../Button";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";
import { Animation } from "../Animation";
import joinFamilyFormschema from "../../validation/joinFamilyFormschema";
import { useAuth } from "../../context/AuthContext";
import { getCalenderByName } from "../../app/fetchMethods/getCalenderByName";
import { assignToCalender } from "../../app/fetchMethods/asignToCalender";

const JoinFamilyForm: FC = ({}) => {
  const router = useRouter();
  const { authToken } = useAuth();
  const searchParams = useSearchParams();
  const animation: Animation =
    (searchParams.get("animation") as Animation) || "login";

  const [falseValues, setFalseValues] = useState<string | undefined>(undefined);
  const formik = useFormik({
    initialValues: {
      familyName: "",
      auth: "",
    },
    validationSchema: joinFamilyFormschema(),
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        if (!authToken) return;
        const data = await getCalenderByName(authToken, values.familyName);

        if (!data) {
          setFalseValues("Kalender existiert nicht!");
          throw new Error(`HTTP error! status: ${data}`);
        }
        await assignToCalender(authToken, data.id);

        router.refresh();
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
        Um einer Familie beitreten zu können bitte folgende Felder ausfüllen
        <div className="w-full mt-8 md:mt-10">
          <TextInput
            placeholder="Familienname / Kalendername"
            type="text"
            name="familyName"
            onChange={formik.handleChange}
            error={formik.errors.familyName || falseValues}
            touched={formik.touched.familyName}
            defaultValue=""
          />
        </div>
        <div className="mt-6 w-full">
          <TextInput
            placeholder="Autenthifizierungscode"
            type="password"
            name="password"
            onChange={formik.handleChange}
            error={formik.errors.auth || falseValues}
            touched={formik.touched.auth}
            defaultValue=""
          />
        </div>
        <div className="flex flex-col mt-10 gap-x-6">
          <Button
            className="w-full"
            type="submit"
            size="14"
            variant="blue-outline"
            form="loginForm"
            label="Beitreten"
          />
        </div>
      </form>
    </div>
  );
};

export default JoinFamilyForm;
