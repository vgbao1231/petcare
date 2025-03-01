import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Fragment, useMemo } from 'react';
import { routesConfig } from '@src/configs/routesConfig';
import { useAuth } from '@src/hooks/useAuth';

function App() {
    const { auth } = useAuth();
    // Test
    const jwtClaims = useMemo(
        () => ({
            scope: auth.accessToken,
        }),
        [auth.accessToken]
    );

    const routes = useMemo(() => {
        switch (jwtClaims['scope']) {
            case 'ADMIN':
                return routesConfig.admin;
            case 'USER':
                return routesConfig.user;
            default:
                return routesConfig.public;
        }
    }, [jwtClaims]);

    const routesWithPaths = useMemo(() => routes.flatMap((r) => (r.children ? r.children : r)), [routes]);
    console.log(routesWithPaths);

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
