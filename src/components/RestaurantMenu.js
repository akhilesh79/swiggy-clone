import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CDN_ITEM, CDN_RESTAURANT } from '../constants/common';

const formatPrice = (priceInPaise) => {
  if (priceInPaise == null) return '';
  return `₹${(priceInPaise / 100).toFixed(0)}`;
};

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [loading, setLoading] = useState(true);
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [categories, setCategories] = useState([]);

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
        <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12'></div>
      </div>
    );
  }

  if (!restaurantInfo) {
    return (
      <div className='p-8'>
        <p className='text-center text-gray-600'>Could not load restaurant details.</p>
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
            <h1 className='text-2xl font-bold'>{restaurantInfo.name}</h1>
            <p className='text-sm text-gray-600 mt-1'>
              {restaurantInfo.cuisines?.join(', ')} • {restaurantInfo.locality} • {restaurantInfo.areaName}
            </p>
            <div className='mt-2 flex flex-wrap gap-3 text-sm text-gray-700'>
              <span className='inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full'>
                ⭐ {restaurantInfo.avgRatingString || restaurantInfo.avgRating}
              </span>
              <span className='inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full'>
                {restaurantInfo.totalRatingsString}
              </span>
              <span className='inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full'>
                {restaurantInfo.costForTwo}
              </span>
              <span className='inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full'>
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

      <div className='mt-10 space-y-10'>
        {categories.map((category) => (
          <section key={category.title} className='rounded-xl border border-gray-200 bg-white shadow-sm'>
            <div className='px-5 py-4 flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>{category.title}</h2>
              <span className='text-sm text-gray-500'>{category.items.length} items</span>
            </div>
            <div className='divide-y divide-gray-100'>
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className='px-5 py-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4'
                >
                  <div className='flex-1'>
                    <div className='flex items-start justify-between gap-3'>
                      <h3 className='text-base font-semibold'>{item.name}</h3>
                      <span className='text-sm font-semibold text-gray-800'>
                        {formatPrice(item.price ?? item.defaultPrice)}
                      </span>
                    </div>
                    <p className='text-sm text-gray-600 mt-1'>{item.description}</p>
                    <div className='flex flex-wrap gap-2 mt-2 text-xs text-gray-500'>
                      <span className='badge badge-sm badge-outline'>{item.category}</span>
                      <span className='badge badge-sm badge-outline'>Serves 1</span>
                    </div>
                  </div>
                  {item.imageId ? (
                    <div className='w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0'>
                      <img src={`${CDN_ITEM}/${item.imageId}`} alt={item.name} className='w-full h-full object-cover' />
                    </div>
                  ) : null}
                  <button className='btn btn-sm btn-outline self-start md:self-center'>ADD</button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
