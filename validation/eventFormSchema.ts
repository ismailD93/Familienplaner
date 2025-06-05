import * as Yup from "yup";

const eventFormSchema = () =>
  Yup.object({
    startTime: Yup.string()
      .required("erforderlich")
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Ungültiges Zeitformat (HH:mm)"),
    endTime: Yup.string()
      .required("erforderlich")
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Ungültiges Zeitformat (HH:mm)")
      .test(
        "is-after-start",
        "Endzeit muss nach der Startzeit liegen",
        function (value) {
          const { startTime } = this.parent;
          if (!startTime || !value) return true;
          const [startHour, startMin] = startTime.split(":").map(Number);
          const [endHour, endMin] = value.split(":").map(Number);

          const startTotal = startHour * 60 + startMin;
          const endTotal = endHour * 60 + endMin;

          return endTotal > startTotal;
        }
      ),
    dateStart: Yup.string().required("erforderlich"),
    dateEnd: Yup.string().required("erforderlich"),
    text: Yup.string().min(1, "").required("erforderlich"),
    description: Yup.string().required("Beschreibung ist notwendig"),
    weekly: Yup.boolean(),
  });

export default eventFormSchema;
