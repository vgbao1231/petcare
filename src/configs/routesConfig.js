import { BarChart, HelpOutlineOutlined, TrendingUp } from '@mui/icons-material';
import { HeaderLayout } from '@src/layout/HeaderLayout';
import { SidebarLayout } from '@src/layout/SidebarLayout';
import AppointmentPage from '@src/pages/AppointmentPage/AppointmentPage';
import LandingPage from '@src/pages/LandingPage/LandingPage';
import LoginPage from '@src/pages/LoginPage/LoginPage';
import MyAppointmentPage from '@src/pages/MyAppointmentPage/MyAppointmentPage';
import MyOrderPage from '@src/pages/MyOrderPage/MyOrderPage';
import PetTrackingPage from '@src/pages/PetTrackingPage/PetTrackingPage';
import ProductPage from '@src/pages/ProductPage/ProductPage';
import RegisterPage from '@src/pages/RegisterPage/RegisterPage';
import TestPage from '@src/pages/TestPage/TestPage';
import VerifyPage from '@src/pages/VerifyPage/VerifyPage';

export const routesConfig = {
    // Example
    public: [
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
        { path: '/verify', component: VerifyPage },
    ],
    admin: [
        { path: '/', component: TestPage, icon: HelpOutlineOutlined, label: 'Help', layout: SidebarLayout },
        {
            label: 'Statistics',
            icon: BarChart,
            children: [
                { path: '/income', component: TestPage, label: 'Income', icon: TrendingUp, layout: SidebarLayout },
                { path: '/report', component: TestPage, label: 'Report', icon: BarChart, layout: SidebarLayout },
            ],
        },
    ],
    user: [
        { path: '/', component: LandingPage, label: 'Home', layout: HeaderLayout },
        { path: '/product', component: ProductPage, label: 'Shop', layout: HeaderLayout },
        { path: '/service', component: ProductPage, label: 'Services', layout: HeaderLayout },
        { path: '/appointment', component: AppointmentPage, label: 'Appointment', layout: HeaderLayout },
        { path: '/pet-tracking', component: PetTrackingPage, label: 'Pet Tracking', layout: HeaderLayout },
        { path: '/my-order', component: MyOrderPage, label: 'My Order', layout: HeaderLayout },
        { path: '/my-appointment', component: MyAppointmentPage, label: 'My Appointment', layout: HeaderLayout },
    ],
};
