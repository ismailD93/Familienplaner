"use client";
import { FC, useState } from "react";
import EventCard from "./EventCard";
import { User } from "../types";
import { addDays } from "date-fns";

interface OverviewProps {
  name?: string;
}
type Event = {
  id: number;
  title: string;
  location: string;
  date: Date;
  participants: User[];
};
const Overview: FC<OverviewProps> = ({}) => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "canceled">(
    "upcoming"
  );

  const date = new Date();
  const test = addDays(date, 1);
  const test1 = addDays(date, 2);
  const test2 = addDays(date, 3);

  const events: Event[] = [
    {
      id: 1,
      title: "Familientreffen",
      date: date,
      location: "Online",
      participants: [
        { id: "2", name: "Metehan", status: "online" },
        { id: "3", name: "Uemit", status: "online" },
      ],
    },
    {
      id: 2,
      title: "Geburtstagsfeier",
      date: test,
      location: "Zuhause",
      participants: [
        { id: "7", name: "Oma", status: "online" },
        { id: "8", name: "Opa", status: "offline" },
      ],
    },
    {
      id: 3,
      title: "Weihnachtsessen",
      date: test1,
      location: "Oma's Haus",
      participants: [{ id: "4", name: "Kind1", status: "online" }],
    },
    {
      id: 4,
      title: "Kinoabend",
      date: test2,
      location: "Kino Berlin",
      participants: [
        { id: "4", name: "Kind1", status: "online" },
        { id: "5", name: "Kind2", status: "offline" },
        { id: "6", name: "Kind3", status: "offline" },
      ],
    },
  ];
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
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            date={event.date}
            location={event.location}
            participants={event.participants}
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;
