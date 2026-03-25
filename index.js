import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './src/routes';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { Provider } from 'react-redux';
import store from './src/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position='bottom-right' />
    </Provider>
  </ThemeProvider>,
);
