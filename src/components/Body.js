import SearchBar from './SearchBar';
import RestaurantCard from './RestaurantCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SkeletonCard = () => (
  <div className='card bg-base-100 border border-base-300 animate-pulse'>
    <div className='h-40 bg-base-300 rounded-t-2xl' />
    <div className='card-body p-3 gap-2'>
      <div className='h-4 bg-base-300 rounded w-3/4' />
      <div className='h-3 bg-base-300 rounded w-1/2' />
      <div className='h-3 bg-base-300 rounded w-1/3' />
    </div>
  </div>
);

const Body = () => {
  const [showTopRated, setShowTopRated] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://corsproxy.io/?url=https://namastedev.com/api/v1/listRestaurants');
      const data = await response.json();
      const restaurantData = data.data.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ?? [];
      setRestaurants(restaurantData);
      setFilteredRestaurants(restaurantData);
    } catch {
      setError('Failed to load restaurants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTopRated = () => {
    setShowTopRated((prev) => !prev);
    if (showTopRated) {
      setFilteredRestaurants(restaurants);
    } else {
      setFilteredRestaurants(restaurants.filter((r) => r.info.avgRating > 4));
    }
  };

  return (
    <div className='px-3 sm:px-6 lg:px-8 py-4 max-w-screen-2xl mx-auto'>
      <SearchBar setFilteredRestaurants={setFilteredRestaurants} restaurants={restaurants} />

      {/* Section header */}
      <div className='flex items-center justify-between gap-2 py-4 mt-2'>
        <div>
          <h2 className='text-xl sm:text-2xl font-bold text-base-content'>Restaurants near you</h2>
          {!loading && <p className='text-sm text-base-content/50 mt-0.5'>{filteredRestaurants.length} places found</p>}
        </div>
        <button
          onClick={handleTopRated}
          className={`btn btn-sm gap-1.5 ${showTopRated ? 'btn-warning' : 'btn-ghost border border-base-300'}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill={showTopRated ? 'currentColor' : 'none'}
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
            />
          </svg>
          Top Rated
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className='alert alert-error mb-4'>
          <span>{error}</span>
          <button className='btn btn-sm btn-ghost' onClick={fetchRestaurants}>
            Retry
          </button>
        </div>
      )}

      {/* Skeleton loading */}
      {loading && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4'>
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredRestaurants.length === 0 && (
        <div className='flex flex-col items-center justify-center py-24 text-center'>
          <div className='text-6xl mb-4'>🍽️</div>
          <h3 className='text-xl font-bold text-base-content mb-2'>No restaurants found</h3>
          <p className='text-base-content/50 mb-4'>Try a different search or clear the filter.</p>
          <button
            className='btn btn-sm btn-outline'
            onClick={() => {
              setShowTopRated(false);
              setFilteredRestaurants(restaurants);
            }}
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Restaurant grid */}
      {!loading && !error && filteredRestaurants.length > 0 && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4'>
          {filteredRestaurants.map((restaurant) => (
            <Link to={`/restaurants/${restaurant.info.id}`} key={restaurant.info.id}>
              <RestaurantCard restaurant={restaurant} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;
