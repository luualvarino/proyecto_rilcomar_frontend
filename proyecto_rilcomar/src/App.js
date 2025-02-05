import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './views/home/Home.tsx';
import PalletsView from './views/pallets/palletsView/PalletsView.tsx';
import PedidosView from './views/pedidos/pedidosView/PedidosView.tsx';
import PedidosClienteView from './views/pedidos/pedidoClienteView/PedidoClienteView.tsx';
import Layout from './views/layout/Layout.tsx';
import PedidoDetailView from './views/pedidos/pedidoDetailView/PedidoDetailView.tsx';
import ClientesView from './views/clientes/clientesView/ClientesView.tsx';
import PedidoUpdateView from './views/pedidos/pedidoUpdateView/PedidoUpdateView.tsx';
import Login from './views/login/Login.tsx';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Login /> },
        { path: '/home', element: <Home /> },
        { path: '/pallets', element: <PalletsView /> },
        { path: '/pallets/:palletId', element: <PalletsView /> },
        { path: '/pedidos', element: <PedidosView /> },
        { path: '/pedidos/:pedidoId/detalle', element: <PedidoDetailView /> },
        { path: '/pedidosCliente', element: <PedidosClienteView /> },
        { path: '/clientes', element: <ClientesView /> },
      ]
    },
    { path: '/pedidos/:pedidoId', element: <PedidoUpdateView /> },
  ])

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
