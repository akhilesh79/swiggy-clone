import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartI, foodI } from '../assets/index.js';
import useOnlineStatus from '../hooks/useOnlineStatus.js';

const Header = () => {
  const isOnline = useOnlineStatus();
  const [showBackOnline, setShowBackOnline] = useState(false);
  const hasBeenOffline = useRef(false);

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
                <Link to='/cart' className='flex items-center gap-1'>
                  Cart <img src={cartI} height={20} width={20} alt='cart' />
                </Link>
              </li>
            </ul>
          </div>
          <div className='dropdown dropdown-end'>
            <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <img
                  alt='Tailwind CSS Navbar component'
                  src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                />
              </div>
            </div>
            <ul
              tabIndex='-1'
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              <li>
                <a className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
