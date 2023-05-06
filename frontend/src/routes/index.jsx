import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from '../auth/ProtectedRoutes';
import Appointments from '../pages/Appointments';
import Colaborators from '../pages/Colaborators';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import RegisterMassive from '../pages/RegisterMassive';
import Forgot from '../pages/Forgot';
import NotFound from '../pages/NotFound';
import UserEdit from '../pages/UserEdit';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/register/massive" element={<RegisterMassive />} />
                    <Route path="/user/edit" element={<UserEdit />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/colaborators" element={<Colaborators />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;