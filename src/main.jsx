import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {

  RouterProvider,
} from "react-router";
import { router } from './Component/Router.jsx';
import AuthProvider from './Component/Context/AuthProvider.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(

  <StrictMode>
      <QueryClientProvider client={queryClient}>
    <AuthProvider>
   <RouterProvider router={router}></RouterProvider>
   </AuthProvider>
   </QueryClientProvider>
  </StrictMode>,
)
