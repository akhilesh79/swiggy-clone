import { Link } from 'react-router-dom';
import { cartI, foodI } from '../assets/index.js';

const Header = () => {
  return (
    <div className='navbar bg-base-100'>
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
          <ul tabIndex='-1' className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'>
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
  );
};

export default Header;
