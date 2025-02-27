import { BarChart, HelpOutlineOutlined, Home, TrendingUp } from '@mui/icons-material';
import { SidebarLayout } from '@src/layout/SidebarLayout';
import ExamplesPage from '@src/pages/ExamplesPage/ExamplesPage';
import TestPage from '@src/pages/TestPage/TestPage';

export const routes = [
    { path: '/', component: ExamplesPage, icon: Home, label: 'Home', layout: SidebarLayout },
    { path: '/help', component: TestPage, icon: HelpOutlineOutlined, label: 'Help', layout: SidebarLayout },
    {
        label: 'Statistics',
        icon: BarChart,
        children: [
            { path: '/income', component: TestPage, label: 'Income', icon: TrendingUp, layout: SidebarLayout },
            { path: '/report', component: TestPage, label: 'Report', icon: BarChart, layout: SidebarLayout },
        ],
    },
];
