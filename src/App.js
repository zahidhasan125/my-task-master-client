import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Routes';

function App() {
  return (
    <div className="w-full mx-auto bg-[#eb5e28] min-h-screen">
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  );
}

export default App;
