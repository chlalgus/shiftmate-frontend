import { useEffect, useState } from 'react';
import api from '../api/client';


export default function Requests({ mode = 'OWNER' /* OWNER | STAFF */ }) {
const [items, setItems] = useState([]);


const load = async () => {
const url = mode === 'OWNER' ? '/api/requests/store' : '/api/requests/my';
const { data } = await api.get(url);
setItems(data);
};


useEffect(() => { load(); }, [mode]);


const act = async (id, status) => {
await api.patch(`/api/requests/${id}`, { status });
load();
};


return (
<div className="container">
<h2>대타 요청</h2>
{items.map((r) => (
<div className="card" key={r.request_id}>
<div style={{display:'flex', justifyContent:'space-between'}}>
<div>
<div><b>요청자:</b> {r.from_user_name} → <b>대상:</b> {r.to_user_name || '미지정'}</div>
<div><b>근무:</b> {r.start_at} ~ {r.end_at}</div>
<div><b>상태:</b> <span className="badge">{r.status}</span></div>
</div>
<div>
{mode === 'OWNER' && (
<>
<button className="btn" onClick={()=>act(r.request_id,'ACCEPTED')}>승인</button>
<button className="btn secondary" onClick={()=>act(r.request_id,'REJECTED')} style={{marginLeft:8}}>거절</button>
</>
)}
</div>
</div>
</div>
))}
</div>
);
}