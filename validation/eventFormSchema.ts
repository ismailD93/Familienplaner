import * as Yup from "yup";

const eventFormSchema = () =>
  Yup.object({
    startTime: Yup.string().required("erforderlich"),
    endTime: Yup.string().required("erforderlich"),
    dateStart: Yup.string().required("erforderlich"),
    dateEnd: Yup.string().required("erforderlich"),
    text: Yup.string().min(1, "").required("erforderlich"),
  });

export default eventFormSchema;
