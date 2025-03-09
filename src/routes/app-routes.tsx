import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import Login from "../page/login/login";
import { useAuthStore } from "../auth/useStore";
import BaseLayout from "../components/layout/base-layout";
import People from "../page/people/people";
import Register from "../page/register/register";

export const AppRoutes = () => {
    const { isAuthenticated } = useAuthStore(); 

    return (
        <BrowserRouter>
            {isAuthenticated ? (
                <BaseLayout>
                    <Routes>
                        <Route path="/people" element={<People />} />
                        {PATHS.map(({ element, path }) => (
                            <Route key={path} element={element} path={path} />
                        ))}
                    </Routes>
                </BaseLayout>
            ) : (
                <Routes>
                    <Route path="*" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            )}
        </BrowserRouter>
    );
};
