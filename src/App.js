import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from './constants/common';
import { setUser } from './store/slices/userSlice';

const AppLayout = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(API_BASE_URL + '/profile/view', { withCredentials: true });
        if (res.data) dispatch(setUser(res.data));
      } catch {
        // User is not logged in — silent, no redirect
      }
    };
    if (!user) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1 overflow-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
