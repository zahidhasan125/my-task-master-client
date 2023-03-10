import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AddTask from "../components/Navbar/AddTask";
import MyTasks from "../components/MyTasks/MyTasks";
import CompletedTask from "../components/CompletedTask/CompletedTask";
import Login from "../components/Login/Login";

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Main />,
            children: [
                {
                    path: '/',
                    element: <AddTask />
                },
                {
                    path: '/mytasks',
                    element: <MyTasks />
                },
                {
                    path: '/completed',
                    element: <CompletedTask />
                },
                {
                    path: '/login',
                    element: <Login />
                }
            ]
        }
    ]
)