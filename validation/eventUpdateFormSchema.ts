import * as Yup from "yup";

const eventUpdateFormSchema = () =>
  Yup.object({
    startTime: Yup.string().required("erforderlich"),
    endTime: Yup.string().required("erforderlich"),
    startDate: Yup.string().required("erforderlich"),
    endDate: Yup.string().required("erforderlich"),
    title: Yup.string().min(1, "").required("erforderlich"),
    description: Yup.string().min(1, "").required("erforderlich"),
  });

export default eventUpdateFormSchema;
