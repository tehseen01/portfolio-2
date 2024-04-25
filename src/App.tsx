import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import { VariantProvider } from './utils/useVariants';
import { SectionProvider } from './utils/sectionContext';

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
                <RouterProvider router={router} />
            </VariantProvider>
        </SectionProvider>
    );
}

export default App;
