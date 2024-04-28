import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import { VariantProvider } from './utils/useVariants';
import { Toaster } from 'sonner';
import { ThemeProvider } from './utils/ThemeContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
]);

function App() {
    return (
        <ThemeProvider>
            <VariantProvider>
                <Toaster />
                <RouterProvider router={router} />
            </VariantProvider>
        </ThemeProvider>
    );
}

export default App;
