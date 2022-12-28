import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AddTask from "../components/Navbar/AddTask";

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Main />,
            children: [
                {
                    path: '/',
                    element: <AddTask />
                }
            ]
        }
    ]
)