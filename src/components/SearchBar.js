import { useEffect, useState } from 'react';
import useUserLocation from '../hooks/useUserLocation.js';
import { SearchIcon } from 'lucide-react';

const SearchBar = ({ setFilteredRestaurants, restaurants }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useUserLocation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') handleResSearch();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchTerm]);

  const handleResSearch = () => {
    const filteredRes = restaurants.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredRestaurants(filteredRes);
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilteredRestaurants(restaurants);
  };

  return (
    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 py-2'>
      {/* Search input */}
      <div className='flex flex-1 items-center gap-2 border-2 border-orange-400 focus-within:border-orange-500 rounded-xl px-3 py-1.5 bg-base-100 transition-colors'>
        <SearchIcon className='w-4 h-4 text-orange-500 shrink-0' />
        <input
          type='text'
          placeholder='Search for restaurants or cuisines...'
          className='flex-1 bg-transparent focus:outline-none text-sm text-base-content placeholder:text-base-content/40'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className='text-base-content/40 hover:text-base-content text-lg leading-none'
            aria-label='Clear search'
          >
            ×
          </button>
        )}
        <button
          onClick={handleResSearch}
          className='btn btn-xs bg-orange-500 hover:bg-orange-600 text-white border-none px-3 rounded-lg'
        >
          Search
        </button>
      </div>

      {/* Location chip */}
      <button
        className='flex items-center gap-2 rounded-xl px-3 py-2 bg-base-100 border border-base-300 hover:border-orange-400 transition-colors min-w-0'
        onClick={() => {
          if (location && location !== 'Detecting location...' && location !== 'Unknown location') {
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
          }
        }}
        title='View on Google Maps'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-4 h-4 text-orange-500 shrink-0'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z' />
        </svg>
        <div className='flex flex-col items-start min-w-0'>
          <span className='text-xs text-base-content/40 leading-none'>Deliver to</span>
          <span className='text-sm font-medium text-base-content truncate max-w-35' title={location}>
            {location}
          </span>
        </div>
      </button>
    </div>
  );
};

export default SearchBar;
