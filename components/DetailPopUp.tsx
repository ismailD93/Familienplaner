"use client";

import classNames from "classnames";
import React, { FC, useState } from "react";

interface DetailPopUpProps {
  open: boolean;
  setClose: () => void;
}

// Funktion zum Generieren der 15-Minuten-Schritte
const generateTimeOptions = (): string[] => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedTime = `${String(hour).padStart(2, "0")}:${String(
        minute
      ).padStart(2, "0")}`;
      times.push(formattedTime);
    }
  }
  return times;
};

const DetailPopUp: FC<DetailPopUpProps> = ({ open, setClose }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [reminder, setReminder] = useState("none"); // Initialwert für Erinnerung

  const handleSave = () => {
    console.log({ title, note, reminder });
  };

  return (
    <div className={classNames({ "p-6": open })}>
      {/* Dialog */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 select-none">
            <h2 className="text-xl font-bold mb-4 text-black">Detail</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-black-60">
                  Ereignistitel
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-black-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  placeholder="Titel eingeben"
                />
              </div>

              <div className="flex space-x-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-black-60">
                    Zeit von
                  </label>
                  <select className="w-full px-3 py-2 border border-black-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue">
                    {generateTimeOptions().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-black-60">
                    Zeit bis
                  </label>
                  <select className="w-full px-3 py-2 border border-black-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue">
                    {generateTimeOptions().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
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
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-black-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-black-60">
                    Datum bis
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-black-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-black-60">
                  Notiz
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
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
                onClick={handleSave}
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
