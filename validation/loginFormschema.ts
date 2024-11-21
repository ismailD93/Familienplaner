import * as Yup from "yup";

const getLoginFormSchema = () =>
  Yup.object({
    username: Yup.string().required("erforderlich"),
    password: Yup.string().min(1, "").required("erforderlich"),
  });

export default getLoginFormSchema;
