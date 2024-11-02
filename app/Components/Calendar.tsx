import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import 'react-datepicker/dist/react-datepicker.css';
import enUS from 'date-fns/locale/en-US';

const locales = {
	'en-US': enUS,
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
		title: 'Big Meeting',
		allDay: true,
		start: new Date(2024, 10, 20),
		end: new Date(2024, 10, 24),
	},
	{
		title: 'Vacation',
		allDay: true,
		start: new Date(2024, 10, 18),
		end: new Date(2024, 10, 20),
	},
	{
		title: 'Conference',
		allDay: true,
		start: new Date(2024, 10, 2),
		end: new Date(2024, 10, 8),
	},
];

const CalendarComp = () => {
	const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
	const [allEvents, setAllEvents] = useState(events);

	// function handleAddEvent() {
	// 	if (newEvent.title && newEvent.start && newEvent.end) {
	// 		setAllEvents([...allEvents, newEvent]);
	// 		setNewEvent({ title: '', start: 'null', end: 'null' });
	// 	}
	// }
	return (
		<div>
			<h1>Calendar</h1>
			<h2>Add New Event</h2>

			{/* <div>
				<input
					type="text"
					placeholder="Add title"
					style={{ width: '20%', marginRight: '10px' }}
					value={newEvent.title}
					onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
				/>
				<DatePicker
					placeholderText="Start Date"
					style={{ marginRight: '10px' }}
					selected={newEvent.start}
					onChange={(start) => setNewEvent({ ...newEvent, start })}
				/>
				<DatePicker
					placeholderText="End Date"
					selected={newEvent.end}
					onChange={(end) => setNewEvent({ ...newEvent, end })}
				/>
				<button style={{ marginTop: '10px' }} onClick={handleAddEvent}>
					Add event
				</button>
			</div> */}

			<Calendar
				localizer={localizer}
				events={allEvents}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500, margin: '50px' }}
			/>
		</div>
	);
};

export default CalendarComp;
