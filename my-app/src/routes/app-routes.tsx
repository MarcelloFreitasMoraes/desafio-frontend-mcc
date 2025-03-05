import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import Home from "../page/Home/home";
import Login from "../page/Login/login";
import { useAuthStore } from "../auth/useStore";

export const AppRoutes = () => {
    const { isAuthenticated } = useAuthStore(); 

    return (
        <BrowserRouter>
            {/* <Header /> */}
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated ? <Home /> : <Login />}
                />

                {PATHS.map(({ element, path }) => (
                    <Route key={path} element={element} path={path} />
                ))}
            </Routes>
        </BrowserRouter>
    );
};
