import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Fragment, useMemo } from 'react';
import { routesConfig } from '@src/configs/routesConfig';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { getTheme, theme } from '@src/theme';
import { useAuth } from '@src/hooks/useAuth';
import { getTokenPayload } from '@src/utils/helpers';

function App() {
    const { token } = useAuth();
    const role = getTokenPayload(token).role;

    // const role = 3;

    const routes = useMemo(() => {
        switch (role) {
            case 1:
                return routesConfig.admin;
            case 2:
                return routesConfig.employee;
            case 3:
                return routesConfig.customer;
            default:
                return routesConfig.public;
        }
    }, [role]);

    const themeByRole = useMemo(() => {
        switch (role) {
            case 1:
                return theme;
            case 2:
                return theme;
            case 3:
                return createTheme(getTheme('light'));
            default:
                return createTheme(getTheme('light'));
        }
    }, [role]);

    const routesWithPaths = useMemo(() => routes.flatMap((r) => (r.children ? r.children : r)), [routes]);

    return (
        <ThemeProvider theme={themeByRole}>
            <CssBaseline />
            <Routes>
                {routesWithPaths.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout ? route.layout : Fragment;
                    return route.children ? (
                        route.children.map((r, i) => (
                            <Route
                                key={i}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        ))
                    ) : (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                <Route path="*" element={<Navigate to={routes[0].path} />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
