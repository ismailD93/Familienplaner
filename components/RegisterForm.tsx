"use client";

import Link from "next/link";
import { FC, useState } from "react";
import TextInput from "./TextInput";
import { Logo } from "../icons/Logo";
import { useFormik } from "formik";
import Button from "./Button";
import { useRouter } from "next/navigation";
import getRegisterFormSchema from "../validation/registerFormschema";
import { data } from "framer-motion/client";

const RegisterForm: FC = ({}) => {
const router = useRouter();
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
        const statusCode = res.status;  // z.B. 200, 400, 500, etc.
        
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
    <div className="h-full w-full flex flex-col items-center p-8 md:p-10">
        <form
        id="registerForm"
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
        <div className="mt-10 md:px-8">
            <Button
            className="w-full"
            type="submit"
            form="registerForm"
            label="Registrieren"
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

export default RegisterForm;
