import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export default function NavBar() {
const { user, logout } = useAuth();
return (
<header>
<h1>ShiftMate</h1>
<nav>
{user?.role === 'OWNER' && (
<>
<NavLink to="/owner" className={({isActive}) => isActive ? 'active' : ''}>대시보드</NavLink>
<NavLink to="/owner/requests" className={({isActive}) => isActive ? 'active' : ''}>대타요청</NavLink>
<NavLink to="/messages" className={({isActive}) => isActive ? 'active' : ''}>메시지</NavLink>
</>
)}
{user?.role === 'STAFF' && (
<>
<NavLink to="/me" className={({isActive}) => isActive ? 'active' : ''}>내 스케줄</NavLink>
<NavLink to="/me/requests" className={({isActive}) => isActive ? 'active' : ''}>대타요청</NavLink>
<NavLink to="/messages" className={({isActive}) => isActive ? 'active' : ''}>메시지</NavLink>
</>
)}
{!user && <NavLink to="/login">로그인</NavLink>}
{user && <button className="btn secondary" onClick={logout}>로그아웃</button>}
</nav>
</header>
);
}