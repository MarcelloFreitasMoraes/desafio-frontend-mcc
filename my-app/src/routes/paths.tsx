import Films from "../page/films/films";
import Species from "../page/species/species";
import Login from "../page/login/login";
import Register from "../page/register/register";


export const PATHS = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/films',
        element: <Films endpoint={'/films/'}/>,
    },
    {
        path: '/species',
        element: <Species endpoint={'/species/'}/>,
    },
]