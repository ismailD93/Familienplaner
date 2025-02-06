import * as Yup from "yup";

const getRegisterFormSchema = () =>
    Yup.object({
    username: Yup.string().required("erforderlich"),
    email: Yup.string().email().required("erforderlich"),
    password: Yup.string().min(1, "").required("erforderlich"),
    });

export default getRegisterFormSchema;
