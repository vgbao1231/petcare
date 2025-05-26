import { CalendarMonthOutlined, Dashboard, Person } from '@mui/icons-material';
import { HeaderLayout } from '@src/layout/HeaderLayout/HeaderLayout';
import { HeaderSidebarLayout } from '@src/layout/HeaderSidebarLayout/HeaderSidebarLayout';
import LoginPage from '../pages/Public/LoginPage/LoginPage';
import RegisterPage from '@src/pages/Public/RegisterPage/RegisterPage';
import VerifyPage from '@src/pages/Public/VerifyPage/VerifyPage';
import ForgotPasswordPage from '@src/pages/Public/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '@src/pages/Public/ResetPasswordPage/ResetPasswordPage';
import DashboardPage from '@src/pages/Admin/DashboardPage/DashboardPage';
import LandingPage from '@src/pages/Customer/LandingPage/LandingPage';
import ProductPage from '@src/pages/Customer/ProductPage/ProductPage';
import CustomerAppointmentPage from '@src/pages/Customer/AppointmentPage/AppointmentPage';
import AdminAppointmentPage from '@src/pages/Admin/AppointmentPage/AppointmentPage';
import CartPage from '@src/pages/Customer/CartPage/CartPage';
import PetTrackingPage from '@src/pages/Customer/PetTrackingPage/PetTrackingPage';
import MyOrderPage from '@src/pages/Customer/MyOrderPage/MyOrderPage';
import MyAppointmentPage from '@src/pages/Customer/MyAppointmentPage/MyAppointmentPage';
import CheckoutPage from '@src/pages/Customer/CheckoutPage/CheckoutPage';
import UserPage from '@src/pages/Admin/UserPage/UserPage';
import TestPage from '@src/pages/TestPage';

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
        { path: '/', component: DashboardPage, icon: Dashboard, label: 'Dashboard', layout: HeaderSidebarLayout },
        { path: '/users', component: UserPage, icon: Person, label: 'Users', layout: HeaderSidebarLayout },
        { path: '/appointment', component: AdminAppointmentPage, icon: CalendarMonthOutlined, label: 'Appointment', layout: HeaderSidebarLayout },
        { path: '/test', component: TestPage, icon: Dashboard, label: 'Users', layout: HeaderSidebarLayout },
    ],
    customer: [
        { path: '/', component: LandingPage, label: 'Home', layout: HeaderLayout },
        { path: '/product', component: ProductPage, label: 'Shop', layout: HeaderLayout },
        { path: '/service', component: ProductPage, label: 'Services', layout: HeaderLayout },
        { path: '/appointment', component: CustomerAppointmentPage, label: 'Appointment', layout: HeaderLayout },
        { path: '/cart', component: CartPage, label: 'Cart', layout: HeaderLayout },
        { path: '/pet-tracking', component: PetTrackingPage, label: 'Pet Tracking', layout: HeaderLayout },
        { path: '/my-order', component: MyOrderPage, label: 'My Order', layout: HeaderLayout },
        { path: '/my-appointment', component: MyAppointmentPage, label: 'My Appointment', layout: HeaderLayout },
        { path: '/checkout', component: CheckoutPage, label: 'My Appointment', layout: HeaderLayout },
    ],
};
