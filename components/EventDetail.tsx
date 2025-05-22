import { FC, useState } from "react";
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

// TODO For the next Time :
// * Implement and Test Api Update Event
// * Delete Event

interface EventDetailProps {
  open: boolean;
  setClose: () => void;
  event?: Event;
  user?: User;
  date?: Date;
}

const EventDetail: FC<EventDetailProps> = ({ event, open, setClose }) => {
  const [edit, setEdit] = useState<boolean>(false);

  const startTime = event?.startDate && timeParser(event.startDate, "time");
  const endTime = event?.endDate && timeParser(event.endDate, "time");

  const startDate =
    event?.startDate && (timeParser(event.startDate, "date") as Date);
  const endDate = event?.endDate && (timeParser(event.endDate, "date") as Date);

  const [dateValueStart, setDateValueStart] = useState<Date>(
    startDate || new Date()
  );
  const [dateValueEnd, setDateValueStartEnd] = useState<Date>(
    endDate || new Date()
  );

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
    onSubmit: (values) => {
      try {
        console.log(values);
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
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 select-none">
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
                    <label className="block text-sm font-medium mb-1 text-black-60">
                      Von
                    </label>
                    <div className="flex gap-x-4">
                      <div className="w-1/2">
                        <DateInput
                          hideCloseIcon
                          selected={dateValueStart || new Date()}
                          minDate={dateValueStart}
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
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-black-60">
                      Bis
                    </label>
                    <div className="flex gap-x-4">
                      <div className="w-1/2">
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
                      <div className="w-1/2">
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
                  type="submit"
                  label="Änderungen speichern"
                  size="14"
                />
              ) : (
                <Button
                  size="14"
                  type="button"
                  label="Editieren"
                  onClick={() => setEdit(!edit)}
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
