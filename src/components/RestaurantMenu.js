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
      <div className='max-w-5xl mx-auto px-4 py-8 animate-pulse'>
        <div className='flex gap-4 mb-8'>
          <div className='w-24 h-24 rounded-xl bg-base-300 shrink-0' />
          <div className='flex-1 space-y-3'>
            <div className='h-6 bg-base-300 rounded w-1/2' />
            <div className='h-4 bg-base-300 rounded w-2/3' />
            <div className='flex gap-2'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='h-6 w-20 bg-base-300 rounded-full' />
              ))}
            </div>
          </div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className='mb-3 bg-base-100 rounded-xl border border-base-300 p-4'>
            <div className='h-5 bg-base-300 rounded w-1/3 mb-2' />
            <div className='h-3 bg-base-300 rounded w-1/6' />
          </div>
        ))}
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
    <div className='max-w-5xl mx-auto px-4 py-6 sm:py-8'>
      {/* Hero card */}
      <div className='bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-sm mb-8'>
        <div className='relative h-32 sm:h-44 bg-base-200 overflow-hidden'>
          <img src={imageUrl} alt={restaurantInfo.name} className='w-full h-full object-cover opacity-40' />
          <div className='absolute inset-0 bg-gradient from-base-100 via-transparent to-transparent' />
        </div>
        <div className='px-5 pb-5 -mt-10 relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
          <div className='flex items-end gap-4'>
            <img
              src={imageUrl}
              alt={restaurantInfo.name}
              className='w-20 h-20 rounded-xl object-cover shadow-lg border-2 border-base-100 shrink-0'
            />
            <div className='pb-1'>
              <h1 className='text-xl sm:text-2xl font-bold text-base-content leading-tight'>{restaurantInfo.name}</h1>
              <p className='text-sm text-base-content/60 mt-0.5 line-clamp-1'>{restaurantInfo.cuisines?.join(', ')}</p>
              <p className='text-xs text-base-content/50'>
                {restaurantInfo.locality}, {restaurantInfo.areaName}
              </p>
            </div>
          </div>
          <Link to='/' className='btn btn-sm btn-ghost self-start sm:self-auto shrink-0'>
            ← Back
          </Link>
        </div>
        <div className='px-5 pb-4 flex flex-wrap gap-2 text-xs'>
          <span className='inline-flex items-center gap-1 bg-success/10 text-success px-2.5 py-1 rounded-full font-medium'>
            ⭐ {restaurantInfo.avgRatingString || restaurantInfo.avgRating}
          </span>
          <span className='inline-flex items-center gap-1 bg-base-200 text-base-content/70 px-2.5 py-1 rounded-full'>
            {restaurantInfo.totalRatingsString}
          </span>
          <span className='inline-flex items-center gap-1 bg-base-200 text-base-content/70 px-2.5 py-1 rounded-full'>
            {restaurantInfo.costForTwo}
          </span>
          <span className='inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-medium'>
            🕐 {restaurantInfo.sla?.slaString || `${restaurantInfo.sla?.deliveryTime} mins`}
          </span>
        </div>
      </div>

      <div className='space-y-3'>
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
