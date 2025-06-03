"use client";

import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { User } from "../types";
import DateInput from "./DateInput";
import {
  addMinutes,
  addMonths,
  format,
  setMilliseconds,
  setSeconds,
} from "date-fns";
import TimeSelect from "./TimeSelect";
import { useFormik } from "formik";
import eventFormSchema from "../validation/eventFormSchema";
import { createEvent } from "../app/fetchMethods/createEvent";
import { useRouter } from "next/navigation";

interface DetailPopUpProps {
  open: boolean;
  setClose: () => void;
  user?: User;
  date?: Date;
}

const DetailPopUp: FC<DetailPopUpProps> = ({ open, setClose, date, user }) => {
  const start = roundTime();
  const router = useRouter();
  const [dateValueStart, setDateValueStart] = useState<Date>(
    date || new Date()
  );
  const [dateValueEnd, setDateValueStartEnd] = useState<Date>(
    date || new Date()
  );

  const formik = useFormik({
    initialValues: {
      text: "",
      description: "",
      startTime: start,
      endTime: start,
      dateStart: dateValueStart.toDateString(),
      dateEnd:
        dateValueEnd < dateValueStart
          ? dateValueStart.toDateString()
          : dateValueEnd.toDateString(),
    },
    validateOnBlur: false,
    validationSchema: eventFormSchema(),
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        if (!user) return;
        const response = await createEvent(user?.name, {
          title: values.text,
          description: values.description,
          startDate: values.dateStart,
          endDate: values.dateEnd,
          startTime: values.startTime,
          endTime: values.endTime,
        });

        if (response) {
          setClose?.();
          router.refresh();
        }
      } catch (error) {
        console.error("Submitting information form failed", error);
      }
    },
  });

  const [note, setNote] = useState("");
  const [reminder, setReminder] = useState("none"); // Initialwert für Erinnerung

  // const parsedDate = format(date || new Date(), "dd.MM.yyyy");
  useEffect(() => {
    if (!date) return;
    setDateValueStart(date);
    setDateValueStartEnd(date);
  }, [date]);
  return (
    <div className={classNames({ "p-6": open })}>
      {/* Dialog */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 select-none">
            <h2 className="text-xl font-bold mb-4 text-black">Detail</h2>
            <form
              id="saveEvent"
              onSubmit={formik.handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1 text-black-60">
                  Ereignistitel
                </label>
                <input
                  type="text"
                  name="text"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  className="w-full px-3 py-2 border border-black-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  placeholder="Titel eingeben"
                />
              </div>

              <div className="flex space-x-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-black-60">
                    Zeit von
                  </label>
                  <TimeSelect
                    name="startTime"
                    setTime={(time) => {
                      if (time) {
                        formik.setFieldValue(
                          "startTime",
                          `${time.hour}:${time.minute}`
                        );
                      }
                    }}
                    error={formik.errors.startTime}
                    selectedValue={formik.values.startTime}
                    touched={formik.touched.startTime}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-black-60">
                    Zeit bis
                  </label>
                  <TimeSelect
                    name="endTime"
                    setTime={(time) => {
                      if (time) {
                        formik.setFieldValue(
                          "endTime",
                          `${time.hour}:${time.minute}`
                        );
                      }
                    }}
                    error={formik.errors.endTime}
                    selectedValue={formik.values.endTime}
                    touched={formik.touched.endTime}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-black-60">
                    Erinnerung
                  </label>
                  <select
                    value={reminder}
                    onChange={(e) => setReminder(e.target.value)}
                    className="w-full px-3 py-2 border border-black-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  >
                    <option value="none">Keine</option>
                    <option value="5min">5 Min vorher</option>
                    <option value="10min">10 Min vorher</option>
                    <option value="15min">15 Min vorher</option>
                    <option value="30min">30 Min vorher</option>
                    <option value="1hr">1 Std. vorher</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-black-60">
                    Datum von
                  </label>
                  <DateInput
                    selected={dateValueStart}
                    minDate={date}
                    maxDate={addMonths(new Date(), 12)}
                    startDate={date}
                    name="dateStart"
                    error={formik.errors.dateStart}
                    onChange={(date) => {
                      if (date) {
                        setDateValueStart(date);
                        formik.setFieldValue("dateStart", date);
                      }
                    }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-black-60">
                    Datum bis
                  </label>
                  <DateInput
                    selected={
                      dateValueEnd < dateValueStart
                        ? dateValueStart
                        : dateValueEnd
                    }
                    minDate={date}
                    error={formik.errors.dateEnd}
                    maxDate={addMonths(new Date(), 12)}
                    name={"dateEnd"}
                    onChange={(date) => {
                      if (date) {
                        setDateValueStartEnd(date);
                        formik.setFieldValue(
                          "dateEnd",
                          format(date, "yyyy-MM-dd")
                        );
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-black-60">
                  Notiz
                </label>
                <textarea
                  value={formik.values.description}
                  name="description"
                  onChange={formik.handleChange}
                  className="w-full px-3 py-2 border border-black-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  rows={3}
                  placeholder="Notiz eingeben"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-black-60">
                  Benutzer
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => alert("Benutzer hinzufügen")}
                    className="w-10 h-10 bg-blue text-white rounded-full flex items-center justify-center hover:bg-blue-light"
                  >
                    +
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setClose();
                }}
                className="px-4 py-2 border border-black-50 rounded-lg hover:bg-black-40 text-black"
              >
                Abbrechen
              </button>
              <button
                form="saveEvent"
                className="px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue-light"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPopUp;

const roundTime = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  const remainder = 15 - (minutes % 15);
  const nextQuarter = addMinutes(now, remainder);

  const rounded = setMilliseconds(setSeconds(nextQuarter, 0), 0);

  const start = format(rounded, "HH:mm");
  return start;
};
