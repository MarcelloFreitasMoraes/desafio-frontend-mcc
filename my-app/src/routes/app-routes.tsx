import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import Login from "../page/login/login";
import { useAuthStore } from "../auth/useStore";
import BaseLayout from "../components/layout/base-layout";
import People from "../page/people/people";

export const AppRoutes = () => {
    const { isAuthenticated } = useAuthStore(); 

    return (
        <BrowserRouter>
          <BaseLayout>
            <Routes>
                <Route
                    path="/people"
                    element={isAuthenticated ? <People endpoint={"/people/"} /> : <Login />}
                />

                {PATHS.map(({ element, path }) => (
                    <Route key={path} element={element} path={path} />
                ))}
            </Routes>
            </BaseLayout>
        </BrowserRouter>
    );
};
