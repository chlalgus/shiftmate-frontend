import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles.css';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import OwnerDashboard from './pages/OwnerDashboard';
import StaffDashboard from './pages/StaffDashboard';
import Requests from './pages/Requests';
import Messages from './pages/Messages';
import { useAuth, AuthProvider } from './hooks/useAuth';


function PrivateRoute({ children }) {
const { user, loading } = useAuth();
if (loading) return <div className="container">로딩중...</div>;
if (!user) return <Navigate to="/login" replace />;
return children;
}


function RoleRoute({ role, children }) {
const { user } = useAuth();
if (!user) return <Navigate to="/login" replace />;
if (user.role !== role) return <Navigate to="/" replace />;
return children;
}


function Shell() {
return (
<div>
<NavBar />
<div>
<Routes>
<Route path="/" element={<HomeRedirect />} />
<Route path="/login" element={<Login />} />


<Route path="/owner" element={<PrivateRoute><RoleRoute role="OWNER"><OwnerDashboard /></RoleRoute></PrivateRoute>} />
<Route path="/owner/requests" element={<PrivateRoute><RoleRoute role="OWNER"><Requests mode="OWNER" /></RoleRoute></PrivateRoute>} />


<Route path="/me" element={<PrivateRoute><RoleRoute role="STAFF"><StaffDashboard /></RoleRoute></PrivateRoute>} />
<Route path="/me/requests" element={<PrivateRoute><RoleRoute role="STAFF"><Requests mode="STAFF" /></RoleRoute></PrivateRoute>} />


<Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
</Routes>
</div>
</div>
);
}


function HomeRedirect() {
const { user } = useAuth();
if (!user) return <Navigate to="/login" replace />;
return user.role === 'OWNER' ? <Navigate to="/owner" replace /> : <Navigate to="/me" replace />;
}


export default function App() {
return (
<AuthProvider>
<BrowserRouter>
<Shell />
</BrowserRouter>
</AuthProvider>
);
}