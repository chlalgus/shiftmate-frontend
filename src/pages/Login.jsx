import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export default function Login() {
const { login } = useAuth();
const nav = useNavigate();
const [email, setEmail] = useState('owner@shiftmate.dev');
const [password, setPassword] = useState('demo1234');
const [error, setError] = useState('');


const handleSubmit = async (e) => {
e.preventDefault();
try {
await login(email, password);
nav('/');
} catch (err) {
setError('로그인 실패. 계정 정보를 확인해주세요.');
}
};


return (
<div className="container">
<div className="card" style={{maxWidth:480, margin:'40px auto'}}>
<h2>로그인</h2>
<form onSubmit={handleSubmit} className="grid">
<input className="input" placeholder="이메일" value={email} onChange={(e)=>setEmail(e.target.value)} />
<input className="input" type="password" placeholder="비밀번호" value={password} onChange={(e)=>setPassword(e.target.value)} />
{error && <div style={{color:'crimson'}}>{error}</div>}
<button className="btn" type="submit">로그인</button>
</form>
</div>
</div>
);
}