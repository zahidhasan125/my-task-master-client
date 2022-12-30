import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="w-full mx-auto bg-gradient-to-tr from-indigo-900 via-sky-600  to-sky-900 min-h-screen dark:bg-gradient-to-tr dark:from-gray-900 dark:via-zinc-700 dark:to-black">
      <RouterProvider router={router}>
      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
