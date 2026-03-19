import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CDN_ITEM, CDN_RESTAURANT } from '../constants/common';
import RestaurantCategories from './RestaurantCategories';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [loading, setLoading] = useState(true);
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showCategoryIndex, setShowCategoryIndex] = useState(0);

  useEffect(() => {
    getRestaurantMenu();
  }, [resId]);

  const getRestaurantMenu = async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://corsproxy.io/https://namastedev.com/api/v1/listRestaurantMenu/${resId}`);
      const json = await response.json();

      const cards = json?.data?.cards ?? [];
      const info = cards[2]?.card?.card?.info ?? null;
      const regularCards = cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? [];

      const categoryCards = regularCards
        .map((c) => c?.card?.card)
        .filter((card) => card && card['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory');

      const parsedCategories = categoryCards.map((category) => ({
        title: category.title,
        items: (category.itemCards ?? []).map((itemCard) => itemCard?.card?.info).filter(Boolean),
      }));

      setRestaurantInfo(info);
      setCategories(parsedCategories);
    } catch (error) {
      console.error('Failed to load menu', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='py-20 flex justify-center items-center'>
        <div className='loader ease-linear rounded-full border-4 border-t-4 border-base-300 h-12 w-12'></div>
      </div>
    );
  }

  if (!restaurantInfo) {
    return (
      <div className='p-8'>
        <p className='text-center text-base-content/60'>Could not load restaurant details.</p>
        <div className='text-center mt-4'>
          <Link to='/' className='btn btn-sm btn-primary'>
            Back to list
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = `${CDN_RESTAURANT}/${restaurantInfo.cloudinaryImageId}`;

  return (
    <div className='max-w-5xl mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
        <div className='flex items-start gap-4'>
          <img src={imageUrl} alt={restaurantInfo.name} className='w-24 h-24 rounded-xl object-cover shadow-lg' />
          <div>
            <h1 className='text-2xl font-bold text-base-content'>{restaurantInfo.name}</h1>
            <p className='text-sm text-base-content/60 mt-1'>
              {restaurantInfo.cuisines?.join(', ')} • {restaurantInfo.locality} • {restaurantInfo.areaName}
            </p>
            <div className='mt-2 flex flex-wrap gap-3 text-sm text-base-content'>
              <span className='inline-flex items-center gap-1 bg-success/10 text-success px-2 py-1 rounded-full'>
                ⭐ {restaurantInfo.avgRatingString || restaurantInfo.avgRating}
              </span>
              <span className='inline-flex items-center gap-1 bg-base-200 px-2 py-1 rounded-full'>
                {restaurantInfo.totalRatingsString}
              </span>
              <span className='inline-flex items-center gap-1 bg-base-200 px-2 py-1 rounded-full'>
                {restaurantInfo.costForTwo}
              </span>
              <span className='inline-flex items-center gap-1 bg-base-200 px-2 py-1 rounded-full'>
                {restaurantInfo.sla?.slaString || `${restaurantInfo.sla?.deliveryTime} mins`}
              </span>
            </div>
          </div>
        </div>

        <div className='flex gap-3'>
          <Link to='/' className='btn btn-sm btn-ghost'>
            ← Back
          </Link>
        </div>
      </div>

      <div className='mt-10 space-y-4 bg-base-200'>
        {categories.map((category, index) => (
          <RestaurantCategories
            key={category.title}
            category={category}
            showAllItems={index === showCategoryIndex}
            setShowCategoryIndex={() => {
              if (index != showCategoryIndex) {
                setShowCategoryIndex(index);
              } else {
                setShowCategoryIndex(null);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
