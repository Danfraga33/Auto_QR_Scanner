import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import enUS from "date-fns/locale/en-US";
import * as RDP from "react-datepicker";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2024, 10, 20),
    end: new Date(2024, 10, 24),
  },
  {
    title: "Vacation",
    allDay: true,
    start: new Date(2024, 10, 18),
    end: new Date(2024, 10, 20),
  },
  {
    title: "Conference",
    allDay: true,
    start: new Date(2024, 10, 2),
    end: new Date(2024, 10, 8),
  },
];

const CalendarComp = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  const RDPC = (((RDP.default as any).default as any) ||
    (RDP.default as any) ||
    (RDP as any)) as typeof RDP.default;
  function handleAddEvent() {
    if (newEvent.title && newEvent.start && newEvent.end) {
      setAllEvents([...allEvents, newEvent]);
      setNewEvent({ title: "", start: "null", end: "null" });
    }
  }
  return (
    <div>
      <h1>Calendar</h1>
      <h2>Add New Event</h2>

      <div>
        <input
          type="text"
          placeholder="Add title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />

        <RDPC
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start ? new Date(newEvent.start) : null}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <RDPC
          placeholderText="End Date"
          selected={newEvent.end ? new Date(newEvent.end) : null}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        {/* <RDPC placeholderText="Start Date" /> */}
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add event
        </button>
      </div>

      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        selectable={true}
      />
    </div>
  );
};

export default CalendarComp;
