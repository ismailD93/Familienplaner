import * as Yup from "yup";

const createFamilyFormschema = () =>
  Yup.object({
    familyName: Yup.string().required("erforderlich"),
    password: Yup.string().min(1, "").required("erforderlich"),
  });

export default createFamilyFormschema;
