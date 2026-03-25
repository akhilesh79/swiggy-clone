import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { foodI } from '../assets/index.js';
import useOnlineStatus from '../hooks/useOnlineStatus.js';
import { useTheme } from '../contexts/ThemeContext.js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clearUser } from '../store/slices/userSlice/index.js';
import { API_BASE_URL } from '../constants/common.js';
import { ShoppingBasket } from 'lucide-react';

const Header = () => {
  const isOnline = useOnlineStatus();
  const [showBackOnline, setShowBackOnline] = useState(false);
  const hasBeenOffline = useRef(false);
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(API_BASE_URL + '/auth/logout', {}, { withCredentials: true });
      dispatch(clearUser());
      navigate('/');
      toast.success(res.data?.message || 'Logged out successfully!');
    } catch {
      dispatch(clearUser());
      navigate('/');
      toast.info('Logged out.');
    }
  };

  useEffect(() => {
    let timeout;

    if (!isOnline) {
      hasBeenOffline.current = true;
      setShowBackOnline(false);
    } else if (hasBeenOffline.current) {
      setShowBackOnline(true);
      timeout = setTimeout(() => setShowBackOnline(false), 2200);
    } else {
      setShowBackOnline(false);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isOnline]);

  const statusMessage = !isOnline
    ? 'You are offline. Check your network connection.'
    : showBackOnline
      ? 'Back online! Connection restored.'
      : '';

  const statusVisible = !isOnline || showBackOnline;

  return (
    <div className='relative'>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out text-sm font-medium text-white shadow-md ${
          statusVisible ? 'h-12 opacity-100' : 'h-0 opacity-0'
        }`}
        style={{
          overflow: 'hidden',
          backgroundColor: !isOnline ? '#dc2626' : showBackOnline ? '#059669' : 'transparent',
          border: statusVisible ? '1px solid rgba(255,255,255,0.2)' : 'none',
        }}
      >
        <div className={`h-full flex items-center justify-center px-4 ${statusVisible ? 'py-2' : 'py-0'}`}>
          {statusMessage}
        </div>
      </div>

      <div className='navbar bg-base-100' style={{ marginTop: statusVisible ? '3rem' : '0' }}>
        <div className='flex-1 items-center'>
          <div className='btn btn-ghost text-xl pr-2 pl-0'>
            <img src={foodI} height={50} width={40} alt='logo' />
            Namaste Food
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <button onClick={toggleTheme} className='btn btn-ghost btn-circle'>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <div className='list'>
            <ul className='menu menu-horizontal px-1'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/contact'>Contact</Link>
              </li>
              <li>
                <Link to='/cart' className='flex items-center gap-1 relative'>
                  Cart <ShoppingBasket size={20} />
                  {totalItems > 0 && (
                    <span className='badge badge-sm badge-primary bg-red-600 text-white absolute -top-2 -right-2'>
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
          {user ? (
            <div className='dropdown dropdown-end'>
              <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <img
                    alt={user.firstName}
                    src={
                      user.profileImage || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';
                    }}
                  />
                </div>
              </div>
              <ul
                tabIndex='-1'
                className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-56 p-2 shadow'
              >
                <li className='menu-title px-2 py-1'>
                  <span className='font-semibold text-base-content'>
                    {user.firstName} {user.lastName}
                  </span>
                  <span className='text-xs text-base-content/50 font-normal'>{user.emailId}</span>
                </li>
                <div className='divider my-0.5' />
                <li>
                  <Link to='/profile' className='justify-between'>
                    My Profile
                    <span className='badge badge-sm bg-orange-500 text-white border-none'>Edit</span>
                  </Link>
                </li>
                <div className='divider my-0.5' />
                <li>
                  <button onClick={handleLogout} className='text-error hover:bg-error/10'>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to='/login' className='btn btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none'>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
