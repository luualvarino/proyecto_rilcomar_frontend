import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './views/home/Home.tsx';
import PalletsView from './views/pallets/palletsView/PalletsView.tsx';
import PedidosView from './views/pedidos/pedidosView/PedidosView.tsx';
import Layout from './views/layout/Layout.tsx';
import PedidoDetailView from './views/pedidos/pedidoDetailView/PedidoDetailView.tsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/pallets', element: <PalletsView /> },
        { path: '/pallets/palletId', element: <PalletsView /> },
        { path: '/pedidos', element: <PedidosView /> },
        { path: '/pedidos/pedidoId', element: <PedidoDetailView /> }
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
