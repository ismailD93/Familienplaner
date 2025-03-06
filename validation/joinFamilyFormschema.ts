import * as Yup from "yup";

const joinFamilyFormschema = () =>
  Yup.object({
    familyName: Yup.string().required("erforderlich"),
    password: Yup.string().min(1, "").required("erforderlich"),
  });

export default joinFamilyFormschema;
