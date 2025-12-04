import { useEffect, useState } from 'react';
import api from '../api/client';


export default function Messages() {
const [targetId, setTargetId] = useState('');
const [content, setContent] = useState('');
const [items, setItems] = useState([]);


const load = async () => {
const { data } = await api.get('/api/messages');
setItems(data);
};


useEffect(() => { load(); }, []);


const send = async () => {
if (!targetId || !content.trim()) return;
await api.post('/api/messages', { receiver_id: Number(targetId), content });
setContent('');
load();
};


return (
<div className="container">
<h2>메시지</h2>
<div className="card">
<div className="grid grid-2">
<input className="input" placeholder="받는 사람 user_id" value={targetId} onChange={(e)=>setTargetId(e.target.value)} />
<input className="input" placeholder="메시지 내용" value={content} onChange={(e)=>setContent(e.target.value)} />
</div>
<div style={{marginTop:12}}>
<button className="btn" onClick={send}>전송</button>
</div>
</div>
{items.map((m)=> (
<div className="card" key={m.message_id}>
<div style={{display:'flex', justifyContent:'space-between'}}>
<div>
<div><b>{m.sender_name}</b> → {m.receiver_name}</div>
<div>{m.content}</div>
</div>
<div className="badge">{m.created_at}</div>
</div>
</div>
))}
</div>
);
}