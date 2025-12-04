import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';
import ShiftCalendar from '../components/ShiftCalendar';


export default function StaffDashboard() {
const [shifts, setShifts] = useState([]);


const fetchMyShifts = async () => {
const { data } = await api.get('/api/shifts/my');
setShifts(data);
};


useEffect(() => { fetchMyShifts(); }, []);


const events = useMemo(() => shifts.map(s => ({
id: s.shift_id,
title: s.store_name || '근무',
start: s.start_at,
end: s.end_at,
extendedProps: s,
})), [shifts]);


const onEventClick = async ({ event }) => {
const ok = confirm('이 근무에 대해 대타를 요청하시겠어요?');
if (!ok) return;
await api.post('/api/requests', { shift_id: Number(event.id) });
alert('대타 요청이 등록되었습니다.');
};


return (
<div className="container">
<h2>내 스케줄</h2>
<ShiftCalendar events={events} onEventClick={onEventClick} />
</div>
);
}