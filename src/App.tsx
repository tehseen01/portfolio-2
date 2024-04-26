import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import { VariantProvider } from './utils/useVariants';
import { SectionProvider } from './utils/sectionContext';
import { Toaster } from 'sonner';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
]);

function App() {
    return (
        <SectionProvider>
            <VariantProvider>
                <Toaster />
                <RouterProvider router={router} />
            </VariantProvider>
        </SectionProvider>
    );
}

export default App;
