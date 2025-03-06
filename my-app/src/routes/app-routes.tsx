import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import Home from "../page/home/home";
import Login from "../page/login/login";
import { useAuthStore } from "../auth/useStore";
import BaseLayout from "../components/layout/base-layout";

export const AppRoutes = () => {
    const { isAuthenticated } = useAuthStore(); 

    return (
        <BrowserRouter>
          <BaseLayout>
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated ? <Home /> : <Login />}
                />

                {PATHS.map(({ element, path }) => (
                    <Route key={path} element={element} path={path} />
                ))}
            </Routes>
            </BaseLayout>
        </BrowserRouter>
    );
};
