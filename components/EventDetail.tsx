import { FC, useEffect, useState } from "react";
import { addMonths, format, startOfDay } from "date-fns";
import classNames from "classnames";
import { Event, User } from "../types";
import { de } from "date-fns/locale";
import TextInput from "./TextInput";
import TimeSelect from "./TimeSelect";
import Button from "./Button";
import { useFormik } from "formik";
import TextArea from "./TextArea";
import DateInput from "./DateInput";
import eventUpdateFormSchema from "../validation/eventUpdateFormSchema";
import { TbTrash } from "react-icons/tb";
import { updateEvent } from "../app/fetchMethods/updateEvent";
import { useRouter } from "next/navigation";

interface EventDetailProps {
  open: boolean;
  setClose: () => void;
  event?: Event;
  user?: User;
  date?: Date;
}

const EventDetail: FC<EventDetailProps> = ({ event, open, setClose }) => {
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const startTime = event?.startDate && timeParser(event.startDate, "time");
  const endTime = event?.endDate && timeParser(event.endDate, "time");
  const startDate = event?.startDate ? new Date(event.startDate) : new Date();

  const endDate = event?.endDate ? new Date(event.endDate) : new Date();
  console.log(startDate, "start");
  const [dateValueStart, setDateValueStart] = useState<Date>(new Date());

  useEffect(() => {
    if (event?.startDate) {
      setDateValueStart(new Date(event.startDate));
    }
  }, [event?.startDate]);

  const [dateValueEnd, setDateValueStartEnd] = useState<Date>(endDate);
  const [save, setSave] = useState(false);
  const formik = useFormik({
    validationSchema: eventUpdateFormSchema(),
    initialValues: {
      title: event?.title,
      startTime: startTime as string,
      startDate: dateValueStart,
      endTime: endTime as string,
      endDate: dateValueEnd < dateValueStart ? dateValueStart : dateValueEnd,

      description: event?.description,
    },
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        if (!event || !save) return null;
        const startTime = format(normalizeDate(event.startDate), "HH:mm");

        const endTime = format(normalizeDate(event.endDate), "HH:mm");

        const updated = await updateEvent({
          title: values.title || event?.title || "",
          description: values.description || event?.description,
          endDate: format(
            normalizeDate(values.endDate || event.endDate),
            "yyyy-MM-dd"
          ),
          startDate: format(
            normalizeDate(values.startDate || event.startDate),
            "yyyy-MM-dd"
          ),
          eventId: event.id,
          isDeleted: false,
          startTime,
          endTime,
        });
        if (updated.id) {
          setSave(false);
          router.refresh();
          setOpenDialog(false);
          setEdit(false);
          setClose();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  if (!event) return null;

  const eventDateLabel =
    startOfDay(event.startDate).valueOf() ===
    startOfDay(event.endDate).valueOf()
      ? `${format(event.startDate, "dd.MMMM.yyyy", {
          locale: de,
        })} · ${startTime} - ${endTime}`
      : `${format(event.startDate, "dd.MMMM.yyyy", {
          locale: de,
        })} - ${format(event.endDate, "dd.MMMM.yyyy", {
          locale: de,
        })}`;

  return (
    <div className={classNames({ "p-6": open })}>
      {/* Dialog */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white relative rounded-lg shadow-lg w-full max-w-lg p-6 select-none">
            {edit && (
              <div className="my-auto flex justify-center w-full mb-2">
                <div
                  className="cursor-pointer p-4"
                  onClick={() => setOpenDialog(!openDialog)}
                >
                  <TbTrash className="size-7 text-red" />
                </div>
              </div>
            )}
            {!edit ? (
              <div>
                {" "}
                <div className="mb-4 text-black">
                  <div className="text-32 font-bold">{event.title}</div>
                  <span className="text-black-60">{eventDateLabel}</span>
                </div>
                <div>{`" ${event.description} "`}</div>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit} id="updateEvent">
                <div className="flex flex-col gap-y-4">
                  <TextInput
                    label="Titel"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.errors.title}
                    touched={formik.touched.title}
                  />
                  <TextArea
                    label="Terminbeschreibung"
                    name={"description"}
                    defaultValue={formik.values.description}
                    error={formik.errors.description}
                    touched={formik.touched.description}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="flex flex-col gap-y-4 mt-5">
                  <div className="flex-1">
                    <div className="flex gap-x-4">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium mb-1 text-black-60">
                          Von
                        </label>
                        <DateInput
                          hideCloseIcon
                          selected={dateValueStart || new Date()}
                          minDate={new Date()}
                          maxDate={addMonths(new Date(), 12)}
                          startDate={dateValueStart}
                          name="startDate"
                          error={formik.errors.startDate as string}
                          onChange={(date) => {
                            if (date) {
                              setDateValueStart(date);
                              formik.setFieldValue("startDate", date);
                            }
                          }}
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-medium mb-1 text-black-60">
                          Bis
                        </label>
                        <DateInput
                          selected={
                            dateValueEnd < dateValueStart
                              ? dateValueStart
                              : dateValueEnd
                          }
                          minDate={dateValueStart}
                          maxDate={addMonths(new Date(), 12)}
                          startDate={dateValueEnd}
                          name="endDate"
                          hideCloseIcon
                          error={formik.errors.endDate as string}
                          onChange={(date) => {
                            if (!date) return;
                            setDateValueStartEnd(date);
                            formik.setFieldValue("endDate", date);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-x-4">
                      <div className="w-1/2 relative">
                        <label className="block text-sm font-medium mb-1 text-black-60">
                          Von
                        </label>
                        <TimeSelect
                          name="startTime"
                          error={formik.errors.startTime}
                          selectedValue={formik.values.startTime as string}
                          touched={formik.touched.startTime}
                          setTime={(time) => {
                            if (time) {
                              formik.setFieldValue(
                                "startTime",
                                `${time.hour}:${time.minute}`
                              );
                            }
                          }}
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-medium mb-1 text-black-60">
                          Bis
                        </label>
                        <TimeSelect
                          name="endTime"
                          error={formik.errors.endTime}
                          selectedValue={formik.values.endTime as string}
                          touched={formik.touched.endTime}
                          setTime={(time) => {
                            if (time) {
                              formik.setFieldValue(
                                "endTime",
                                `${time.hour}:${time.minute}`
                              );
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}

            <div className="mt-6 flex justify-end space-x-2">
              {edit ? (
                <Button
                  form="updateEvent"
                  label="Änderungen speichern"
                  size="14"
                  onClick={() => setSave(true)}
                />
              ) : (
                <Button
                  size="14"
                  type="button"
                  label="Editieren"
                  onClick={() => setEdit(true)}
                />
              )}

              <Button
                label="Abbrechen"
                size="14"
                variant="grey-outline"
                onClick={() => {
                  if (edit) {
                    setEdit(!edit);
                  } else {
                    setClose();
                    setEdit(false);
                  }
                }}
              />
            </div>
            {openDialog && (
              <div className="absolute shadow-lg -left-3 top-10 bg-white w-full z-20 p-4 rounded-md border border-black-60">
                <div className="text-14 font-medium text-center">
                  Sind sie sicher das sie dieses Event löschen wollen
                </div>
                <div className="flex mt-4 gap-x-2 justify-center">
                  <Button
                    label="Löschen"
                    size="12"
                    variant="delete"
                    onClick={async () => {
                      const startTime = format(
                        normalizeDate(event.startDate),
                        "HH:mm"
                      );

                      const endTime = format(
                        normalizeDate(event.endDate),
                        "HH:mm"
                      );

                      const deleted = await updateEvent({
                        title: event.title,
                        description: event.description,
                        eventId: event.id,
                        isDeleted: true,
                        startDate: format(
                          normalizeDate(event.startDate),
                          "yyyy-MM-dd"
                        ),
                        endDate: format(
                          normalizeDate(event.endDate),
                          "yyyy-MM-dd"
                        ),
                        startTime: startTime,
                        endTime: endTime,
                      });
                      if (deleted.id) {
                        router.refresh();
                        setOpenDialog(false);
                        setEdit(false);
                        setClose();
                      }
                    }}
                  />
                  <Button
                    label="Abbrechen"
                    size="12"
                    variant="grey-outline"
                    onClick={() => {
                      setOpenDialog(false);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;

const timeParser = (time: Date, variant: "time" | "date") => {
  if (variant === "time") {
    const iso = time.toString();
    const timePart = iso.split("T")[1].split(":");
    return `${timePart[0]}:${timePart[1]}`;
  }

  if (variant === "date") {
    const iso = time.toString().split("T")[0]; // 'yyyy-mm-dd'
    return new Date(iso);
  }
};

const normalizeDate = (input: string | Date) => {
  const d = new Date(input);
  d.setHours(0, 0, 0, 0); // strip time
  return d;
};
