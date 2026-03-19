import { useEffect, useState } from 'react';
import { searchIcon } from '../assets/index.js';
import useUserLocation from '../hooks/useUserLocation.js';

const SearchBar = ({ setFilteredRestaurants, restaurants }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useUserLocation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleResSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchTerm]);

  const handleResSearch = () => {
    const filteredRes = restaurants.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredRestaurants(filteredRes);
  };

  return (
    <div id='search-container' className='p-1 flex items-center justify-end gap-2'>
      <div className='flex flex-1 items-center gap-2 border-2 border-primary p-1 rounded-xl'>
        <input
          type='text'
          placeholder='Search for Restaurants...'
          className='flex-1 p-0.5 px-2 focus:outline-none focus:ring-0 bg-base-100'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='px-2 flex items-center gap-1 cursor-pointer' onClick={() => handleResSearch()}>
          <img src={searchIcon} height={20} width={20} alt='Search' />
        </button>
      </div>
      <div>
        <div className='flex items-center gap-3 rounded-lg px-3 py-1 bg-base-100 shadow-sm'>
          <span
            className='cursor-pointer'
            onClick={() => {
              if (location && location !== 'Detecting location...' && location !== 'Unknown location') {
                const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
                window.open(url, '_blank');
              }
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-primary shrink-0'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z' />
            </svg>
          </span>

          <div className='flex flex-col min-w-0'>
            <span
              className='text-sm font-medium truncate max-w-xs text-base-content'
              title={location}
              aria-live='polite'
            >
              {location}
            </span>
            <span className='text-xs text-base-content/50'>Deliver to</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
