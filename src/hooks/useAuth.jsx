import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';


const AuthContext = createContext();


export function AuthProvider({ children }) {
const [user, setUser] = useState(null); // { user_id, name, role: 'OWNER' | 'STAFF' }
const [loading, setLoading] = useState(true);


useEffect(() => {
// 새로고침 후 토큰 있으면 사용자 정보 복구
const token = localStorage.getItem('token');
if (!token) { setLoading(false); return; }
api.get('/api/auth/me')
.then((res) => setUser(res.data))
.catch(() => localStorage.removeItem('token'))
.finally(() => setLoading(false));
}, []);


const login = async (email, password) => {
const { data } = await api.post('/api/auth/login', { email, password });
localStorage.setItem('token', data.token);
setUser(data.user);
};


const logout = () => {
localStorage.removeItem('token');
setUser(null);
};


return (
<AuthContext.Provider value={{ user, loading, login, logout }}>
{children}
</AuthContext.Provider>
);
}


export function useAuth() {
return useContext(AuthContext);
}