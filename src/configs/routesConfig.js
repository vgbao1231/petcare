import { BarChart, HelpOutlineOutlined, TrendingUp } from '@mui/icons-material';
import { HeaderLayout } from '@src/layout/HeaderLayout';
import { SidebarLayout } from '@src/layout/SidebarLayout';
import LandingPage from '@src/pages/LandingPage/LandingPage';
import LoginPage from '@src/pages/LoginPage/LoginPage';
import ProductPage from '@src/pages/ProductPage/ProductPage';
import TestPage from '@src/pages/TestPage/TestPage';

export const routesConfig = {
    // Example
    public: [
        { path: '/login', component: LoginPage },
        { path: '/test', component: TestPage },
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
        { path: '/appointment', component: ProductPage, label: 'Appointment', layout: HeaderLayout },
    ],
};
