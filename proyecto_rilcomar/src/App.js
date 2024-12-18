import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './views/Home/Home.tsx';

function App() {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
