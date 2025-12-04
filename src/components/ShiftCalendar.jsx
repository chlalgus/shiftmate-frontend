import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


export default function ShiftCalendar({ events, onDateClick, onEventClick, initialView = 'timeGridWeek' }) {
return (
<div className="card">
<FullCalendar
plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
initialView={initialView}
headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
events={events}
dateClick={(info) => onDateClick && onDateClick(info)}
eventClick={(info) => onEventClick && onEventClick(info)}
selectable
height="auto"
slotMinTime="06:00:00"
slotMaxTime="24:00:00"
/>
</div>
);
}