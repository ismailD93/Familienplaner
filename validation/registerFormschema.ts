import * as Yup from "yup";

const getRegisterFormSchema = () =>
  Yup.object({
    username: Yup.string().required("erforderlich"),
    email: Yup.string()
      .email("Ungültige E-Mail-Adresse")
      .required("erforderlich"),
    password: Yup.string()
      .min(13, "Mindestens 10 Zeichen erforderlich")
      .matches(/[A-Z]/, "Mindestens ein Großbuchstabe erforderlich")
      .matches(/[0-9]/, "Mindestens eine Zahl erforderlich")
      .matches(/[^a-zA-Z0-9]/, "Mindestens ein Sonderzeichen erforderlich")
      .required("erforderlich"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwörter stimmen nicht überein.")
      .required("erforderlich"),
  });

export default getRegisterFormSchema;
