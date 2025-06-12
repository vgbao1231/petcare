import { AssignmentOutlined, CalendarMonthOutlined, CalendarTodayOutlined, CreditCardOutlined, Dashboard, EventAvailableOutlined, HomeOutlined, Inventory2Outlined, Payment, Person, PetsOutlined, ShoppingCartOutlined, StorefrontOutlined } from '@mui/icons-material';
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
import AdminProductPage from '@src/pages/Admin/ProductPage/ProductPage';
import CustomerAppointmentPage from '@src/pages/Customer/AppointmentPage/AppointmentPage';
import AdminAppointmentPage from '@src/pages/Admin/AppointmentPage/AppointmentPage';
import CartPage from '@src/pages/Customer/CartPage/CartPage';
import PetTrackingPage from '@src/pages/Customer/PetTrackingPage/PetTrackingPage';
import MyOrderPage from '@src/pages/Customer/MyOrderPage/MyOrderPage';
import MyAppointmentPage from '@src/pages/Customer/MyAppointmentPage/MyAppointmentPage';
import UserPage from '@src/pages/Admin/UserPage/UserPage';
import OrderPage from '@src/pages/Customer/OrderPage/OrderPage';
import AdminOrderPage from '@src/pages/Admin/OrderPage/OrderPage';
import PetPage from '@src/pages/Admin/PaymentPage/PaymentPage';
import PaymentSuccess from '@src/pages/Customer/PaymentPage/PaymentSuccess';
import PaymentFailed from '@src/pages/Customer/PaymentPage/PaymentFailed';

export const routesConfig = {
    // Example
    public: [
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
        { path: '/verify', component: VerifyPage },
        { path: '/forgot-password', component: ForgotPasswordPage },
        { path: '/reset-password', component: ResetPasswordPage },
        { path: '/payments/success', component: PaymentSuccess, icon: CreditCardOutlined, label: 'Payment' },
        { path: '/payments/cancel', component: PaymentFailed, icon: CreditCardOutlined, label: 'Payment' },
    ],
    admin: [
        { path: '/', component: DashboardPage, icon: Dashboard, label: 'Dashboard', layout: HeaderSidebarLayout },
        { path: '/users', component: UserPage, icon: Person, label: 'Users', layout: HeaderSidebarLayout },
        { path: '/appointments', component: AdminAppointmentPage, icon: CalendarMonthOutlined, label: 'Appointment', layout: HeaderSidebarLayout },
        { path: '/orders', component: AdminOrderPage, icon: ShoppingCartOutlined, label: 'Orders', layout: HeaderSidebarLayout },
        { path: '/products', component: AdminProductPage, icon: Inventory2Outlined, label: 'Products & Services', layout: HeaderSidebarLayout },
        { path: '/payments', component: PetPage, icon: Payment, label: 'Payments', layout: HeaderSidebarLayout },
        { path: '/payments/success', component: PaymentSuccess, icon: CreditCardOutlined, label: 'Payment' },
        { path: '/payments/cancel', component: PaymentFailed, icon: CreditCardOutlined, label: 'Payment' },
    ],
    customer: [
        { path: '/', component: LandingPage, icon: HomeOutlined, label: 'Home', layout: HeaderLayout },
        { path: '/product', component: ProductPage, icon: StorefrontOutlined, label: 'Shop', layout: HeaderLayout },
        { path: '/appointment', component: CustomerAppointmentPage, icon: EventAvailableOutlined, label: 'Appointment', layout: HeaderLayout },
        { path: '/pet-tracking', component: PetTrackingPage, icon: PetsOutlined, label: 'Pet Tracking', layout: HeaderLayout },
        { path: '/cart', component: CartPage, icon: ShoppingCartOutlined, label: 'Cart', layout: HeaderLayout },
        { path: '/my-order', component: MyOrderPage, icon: AssignmentOutlined, label: 'My Order', layout: HeaderLayout },
        { path: '/my-appointment', component: MyAppointmentPage, icon: CalendarTodayOutlined, label: 'My Appointment', layout: HeaderLayout },
        { path: '/order', component: OrderPage, icon: AssignmentOutlined, label: 'Order', layout: HeaderLayout },
        { path: '/payments/success', component: PaymentSuccess, icon: CreditCardOutlined, label: 'Payment' },
        { path: '/payments/cancel', component: PaymentFailed, icon: CreditCardOutlined, label: 'Payment' },
    ]
};
