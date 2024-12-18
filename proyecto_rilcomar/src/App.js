import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './views/Home/Home.tsx';
import PalletsView from './views/PalletsView/PalletsView.tsx';
import PedidosView from './views/PedidosView/PedidosView.tsx';
import Layout from './views/Layout/Layout.tsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/pallets', element: <PalletsView /> },
        { path: '/pedidos', element: <PedidosView /> }
      ]
    }
  ])

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
