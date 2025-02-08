import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PalletsView from './views/admin/pallets/palletsView/PalletsView.tsx';
import PedidosClienteView from './views/cliente/pedidoClienteView/PedidoClienteView.tsx';
import PedidosView from './views/admin/pedidos/pedidosView/PedidosView.tsx';
import LayoutAdmin from './views/admin/layout/Layout.tsx';
import LayoutCliente from './views/cliente/layout/Layout.tsx';
import PedidoDetailView from './views/admin/pedidos/pedidoDetailView/PedidoDetailView.tsx';
import ClientesView from './views/admin/clientes/clientesView/ClientesView.tsx';
import PedidoUpdateView from './views/public/pedidoUpdateView/PedidoUpdateView.tsx';
import PalletInfoView from './views/pallets/palletInfoView/PalletInfoView.tsx';
import Login from './views/login/Login.tsx';
import AdminHome from './views/admin/home/Home.tsx';
import ClientHome from './views/cliente/home/Home.tsx';


function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    {
      path: '/',
      element: <LayoutAdmin />,
      children: [
        { path: '/admin/home', element: <AdminHome /> },
        { path: '/pallets', element: <PalletsView /> },
        //{ path: '/pallets/:palletId', element: <PalletsView /> },
        { path: '/pedidos', element: <PedidosView /> },
        { path: '/pedidos/:pedidoId/detalle', element: <PedidoDetailView /> },
        { path: '/clientes', element: <ClientesView /> },
      ]
    },
    {
      path: '/',
      element: <LayoutCliente />,
      children: [
        { path: '/client/home', element: <ClientHome /> },
        { path: '/pedidosCliente', element: <PedidosClienteView /> },
      ]
    },
    { path: '/pedidos/:pedidoId', element: <PedidoUpdateView /> },
    { path: '/pallets/:palletId', element: <PalletInfoView /> },
  ])

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
