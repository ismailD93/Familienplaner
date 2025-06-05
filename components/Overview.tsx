"use client";
import { FC, useState } from "react";
import EventCard from "./EventCard";
import { Event } from "../types";

interface OverviewProps {
  events: Event[];
  name?: string;
  token: string;
}

const Overview: FC<OverviewProps> = ({ events }) => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "canceled">(
    "upcoming"
  );
  const now = new Date();

  const pastEvents = events.filter(
    (event) => new Date(event.startDate).valueOf() < now.valueOf()
  );
  const upcomingEvents = events.filter(
    (event) => new Date(event.startDate).valueOf() > now.valueOf()
  );
  const canceldEvents = events.filter((event) => event.isDeleted);

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
      {activeTab === "upcoming" && (
        <div className="mt-6 space-y-4">
          {upcomingEvents.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              date={event.startDate}
              location={""}
              description={event.description}
            />
          ))}
        </div>
      )}
      {activeTab === "past" && (
        <div className="mt-6 space-y-4">
          {pastEvents.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              date={event.startDate}
              location={""}
              isPast
              description={event.description}
            />
          ))}
        </div>
      )}
      {activeTab === "canceled" && (
        <div className="mt-6 space-y-4">
          {canceldEvents.map((event, index) => (
            <EventCard
              key={index}
              cancelled
              title={event.title}
              date={event.startDate}
              location={""}
              isPast
              description={event.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Overview;
