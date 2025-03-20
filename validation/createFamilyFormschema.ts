import * as Yup from "yup";

const createFamilyFormschema = () =>
  Yup.object({
    familyName: Yup.string().required("erforderlich"),
    authentication: Yup.string().min(1, ""),
  });

export default createFamilyFormschema;
