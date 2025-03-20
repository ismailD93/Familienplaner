import * as Yup from "yup";

const joinFamilyFormschema = () =>
  Yup.object({
    familyName: Yup.string().required("erforderlich"),
    auth: Yup.string(),
  });

export default joinFamilyFormschema;
