import SearchBar from './SearchBar';
import RestaurantCard from './RestaurantCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Body = () => {
  const [showTopRated, setShowTopRated] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const response = await fetch('https://corsproxy.io/?url=https://namastedev.com/api/v1/listRestaurants');
    const data = await response.json();
    console.log(data);
    const restaurantData = data.data.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setRestaurants(restaurantData);
    setFilteredRestaurants(restaurantData);
  };

  return (
    <>
      <SearchBar setFilteredRestaurants={setFilteredRestaurants} restaurants={restaurants} />
      {/* Restaurants */}
      <div className='px-2'>
        <div className='text-2xl font-bold mb-4 font-sans flex items-center justify-between gap-2 py-2'>
          <div>Restaurants</div>
          {/* filter of top rated restaurants - star icon */}
          <div
            className='text-sm text-gray-500 flex items-center gap-1 cursor-pointer'
            onClick={() => {
              setShowTopRated(!showTopRated);
              if (showTopRated) {
                setFilteredRestaurants(restaurants);
              } else {
                const filteredRes = restaurants.filter((restaurant) => restaurant.info.avgRating > 4);
                setFilteredRestaurants(filteredRes);
              }
            }}
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
            <span>Top Rated</span>
          </div>
        </div>
        <div className='flex flex-wrap gap-4'>
          {filteredRestaurants.map((restaurant) => (
            <Link to={`/restaurants/${restaurant.info.id}`} key={restaurant.info.id}>
              <RestaurantCard restaurant={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Body;
