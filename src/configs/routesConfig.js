import { BarChart, HelpOutlineOutlined, TrendingUp } from '@mui/icons-material';
import { HeaderLayout } from '@src/layout/HeaderLayout';
import { SidebarLayout } from '@src/layout/SidebarLayout';
import AppointmentPage from '@src/pages/AppointmentPage/AppointmentPage';
import ForgotPasswordPage from '@src/pages/ForgotPasswordPage/ForgotPasswordPage';
import LandingPage from '@src/pages/LandingPage/LandingPage';
import LoginPage from '@src/pages/LoginPage/LoginPage';
import MyAppointmentPage from '@src/pages/MyAppointmentPage/MyAppointmentPage';
import PetTrackingPage from '@src/pages/PetTrackingPage/PetTrackingPage';
import ProductPage from '@src/pages/ProductPage/ProductPage';
import RegisterPage from '@src/pages/RegisterPage/RegisterPage';
import TestPage from '@src/pages/TestPage/TestPage';
import VerifyPage from '@src/pages/VerifyPage/VerifyPage';
import ResetPasswordPage from '@src/pages/ResetPasswordPage/ResetPasswordPage';
import CartPage from '@src/pages/CartPage/CartPage';
import MyOrderPage from '@src/pages/MyOrderPage/MyOrderPage';
import CheckoutPage from '@src/pages/CheckoutPage/CheckoutPage';

export const routesConfig = {
    // Example
    public: [
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
        { path: '/verify', component: VerifyPage },
        { path: '/forgot-password', component: ForgotPasswordPage },
        { path: '/reset-password', component: ResetPasswordPage },
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
    employee: [{ path: '/', component: TestPage, icon: HelpOutlineOutlined, label: 'Help', layout: SidebarLayout }],
    customer: [
        { path: '/', component: LandingPage, label: 'Home', layout: HeaderLayout },
        { path: '/product', component: ProductPage, label: 'Shop', layout: HeaderLayout },
        { path: '/service', component: ProductPage, label: 'Services', layout: HeaderLayout },
        { path: '/appointment', component: AppointmentPage, label: 'Appointment', layout: HeaderLayout },
        { path: '/cart', component: CartPage, label: 'Cart', layout: HeaderLayout },
        { path: '/pet-tracking', component: PetTrackingPage, label: 'Pet Tracking', layout: HeaderLayout },
        { path: '/my-order', component: MyOrderPage, label: 'My Order', layout: HeaderLayout },
        { path: '/my-appointment', component: MyAppointmentPage, label: 'My Appointment', layout: HeaderLayout },
        { path: '/checkout', component: CheckoutPage, label: 'My Appointment', layout: HeaderLayout },
    ],
};
