'use client'
import { FC, useState } from "react";

interface OverviewProps{
    name?:string
}

const Overview: FC<OverviewProps> = ({name}) => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "canceled">("upcoming");
console.log(name)
  const events = {
    upcoming: [
      { id: 1, title: "Familientreffen", date: "2025-01-30", location: "Online", participants: ["Papa", "Mama"] },
      { id: 2, title: "Geburtstagsfeier", date: "2025-02-10", location: "Zuhause", participants: ["Lena", "Tom"] },
    ],
    past: [
      { id: 3, title: "Weihnachtsessen", date: "2024-12-25", location: "Oma's Haus", participants: ["Familie Müller"] },
    ],
    canceled: [
      { id: 4, title: "Kinoabend", date: "2025-01-15", location: "Kino Berlin", participants: ["Tom", "Lena"] },
    ],
  };

  return (
    <div className="p-6 bg-black-30 min-h-screen">
      {/* Tab-Header */}
      <div className="flex space-x-4 border-b border-black-50 pb-3">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "upcoming"
              ? "border-b-2 border-blue text-blue"
              : "text-black-60 hover:text-blue"
          }`}
        >
          Bevorstehend
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "past"
              ? "border-b-2 border-blue text-blue"
              : "text-black-60 hover:text-blue"
          }`}
        >
          Vergangen
        </button>
        <button
          onClick={() => setActiveTab("canceled")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "canceled"
              ? "border-b-2 border-blue text-blue"
              : "text-black-60 hover:text-blue"
          }`}
        >
          Abgesagt
        </button>
      </div>

      {/* Ereignisliste */}
      <div className="mt-6 space-y-4">
        {events[activeTab].map((event) => (
          <div
            key={event.id}
            className="bg-white border border-black-50 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-16 font-bold text-black">{event.title}</h3>
            <p className="text-14 text-black-60 mt-1">📅 {event.date}</p>
            <p className="text-14 text-black-60 mt-1">📍 {event.location}</p>
            <p className="text-14 text-black-60 mt-1">
              👥 Teilnehmer: {event.participants.join(", ")}
            </p>
            <button className="mt-4 bg-blue text-white text-14 font-semibold px-4 py-2 rounded-lg hover:bg-blue-light transition">
              Bearbeiten
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
