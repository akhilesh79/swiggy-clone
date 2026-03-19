import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './src/routes';
import { ThemeProvider } from './src/contexts/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>,
);
