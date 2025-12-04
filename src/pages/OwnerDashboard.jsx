import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';
import ShiftCalendar from '../components/ShiftCalendar';


export default function OwnerDashboard() {
const [shifts, setShifts] = useState([]);
const [loading, setLoading] = useState(true);


const fetchShifts = async () => {
setLoading(true);
try {
const { data } = await api.get('/api/shifts'); // 사장 매장 기준 전체 시프트
setShifts(data);
} finally { setLoading(false); }
};


useEffect(() => { fetchShifts(); }, []);


const events = useMemo(() => (
shifts.map(s => ({
id: s.shift_id,
title: s.assigned_user_name || '미배정',
start: s.start_at,
end: s.end_at,
extendedProps: s,
}))
), [shifts]);


const onDateClick = async (info) => {
const start = prompt('시작 시간(예: 2025-12-03 10:00)\n기본은 클릭한 날짜의 10:00으로 처리됩니다.', `${info.dateStr} 10:00`);
if (!start) return;
const end = prompt('종료 시간(예: 2025-12-03 14:00)', `${info.dateStr} 14:00`);
if (!end) return;
const userId = prompt('배정할 직원 user_id (없으면 비워두세요)');
await api.post('/api/shifts', { start_at: start, end_at: end, assigned_user_id: userId || null });
fetchShifts();
};


const onEventClick = async ({ event }) => {
const action = prompt('수정(m)/삭제(d)/취소(c) 중 선택', 'm');
if (action === 'd') {
await api.delete(`/api/shifts/${event.id}`);
fetchShifts();
}
if (action === 'm') {
const end = prompt('새 종료 시간(예: 2025-12-03 18:00)', event.endStr?.replace('Z',''));
if (!end) return;
await api.patch(`/api/shifts/${event.id}`, { end_at: end });
fetchShifts();
}
};


return (
<div className="container">
<h2>사장님 대시보드</h2>
<div className="badge">근무 관리 · 급여 기반 데이터</div>
{loading ? <p>불러오는 중...</p> : (
<ShiftCalendar events={events} onDateClick={onDateClick} onEventClick={onEventClick} />
)}
</div>
);
}