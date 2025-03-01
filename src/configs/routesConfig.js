import { BarChart, HelpOutlineOutlined, TrendingUp } from '@mui/icons-material';
import { HeaderLayout } from '@src/layout/HeaderLayout';
import { SidebarLayout } from '@src/layout/SidebarLayout';
import LandingPage from '@src/pages/LandingPage/LandingPage';
import LoginPage from '@src/pages/LoginPage/LoginPage';
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
    user: [{ path: '/', component: LandingPage, icon: HelpOutlineOutlined, label: 'Help', layout: HeaderLayout }],
};
