import { CDN_RESTAURANT } from '../constants/common';

const RestaurantCard = ({ restaurant }) => {
  const info = restaurant.info;
  const imageUrl = `${CDN_RESTAURANT}/${info.cloudinaryImageId}`;

  return (
    <div className='card w-56 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer'>
      <figure className='relative h-32'>
        <img src={imageUrl} alt={info.name} className='object-cover w-full h-full rounded-t-lg' />
        {info.aggregatedDiscountInfoV3 && (
          <div className='absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold'>
            {info.aggregatedDiscountInfoV3.header}
          </div>
        )}
      </figure>
      <div className='card-body p-4'>
        <h2 className='card-title text-lg font-semibold truncate'>{info.name}</h2>
        <p className='text-sm text-gray-600 truncate'>{info.cuisines.join(', ')}</p>
        <div className='flex justify-between items-center mt-2'>
          <span className='text-sm font-medium flex items-center gap-1'>
            <span className='text-yellow-500'>⭐</span> {info.avgRating}
          </span>
          <span className='text-sm text-gray-500'>{info.costForTwo}</span>
        </div>
        <p className='text-xs text-gray-500 mt-1'>{info.sla.deliveryTime} mins</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
