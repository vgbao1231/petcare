import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Fragment, useMemo } from 'react';
import { routesConfig } from '@src/configs/routesConfig';
import { useAuth } from '@src/hooks/useAuth';
import { getTokenPayload } from '@src/utils/helpers';

function App() {
    const { token } = useAuth();
    const role = getTokenPayload(token).role;

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

    const routesWithPaths = useMemo(() => routes.flatMap((r) => (r.children ? r.children : r)), [routes]);

    return (
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
    );
}

export default App;
