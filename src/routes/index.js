import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../App';
import Body from '../components/Body';
import RestaurantMenu from '../components/RestaurantMenu';
import About from '../components/About';
import ContactUs from '../components/ContactUs';
import Cart from '../components/Cart';
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/restaurants/:resId',
        element: <RestaurantMenu />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <ContactUs />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
]);

export default router;
