import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import UserTable from './components/UserTable';
import UserPosts from './components/UserPosts';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        visibleToasts={9}
        position="top-center"
        duration={5000}
        closeButton
        richColors
        toastOptions={{
          classNames: {
            toast: 'toaster',
            title: 'title',
            description: 'description',
            actionButton: 'actionButton',
            cancelButton: 'cancelButton',
            closeButton: 'closeButton',
          },
        }}
      />
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<UserTable />} />
            <Route path="/users/:userId" element={<UserPosts />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
