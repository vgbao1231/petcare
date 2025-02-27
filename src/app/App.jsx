import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Fragment, useMemo } from 'react';
import { routes } from '@src/configs/routesConfig';

function App() {
    const routesWithPaths = useMemo(() => routes.flatMap((r) => (r.children ? r.children : r)), []);

    return (
        <Router
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
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
            </Routes>
        </Router>
    );
}

export default App;
