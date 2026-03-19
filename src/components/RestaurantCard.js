import { CDN_RESTAURANT } from '../constants/common';

const RestaurantCard = ({ restaurant }) => {
  const info = restaurant.info;
  const imageUrl = `${CDN_RESTAURANT}/${info.cloudinaryImageId}`;

  return (
    <div className='card w-56 bg-base-100 border border-transparent hover:border-base-content/20 transition-all duration-300 cursor-pointer'>
      <figure className='relative h-32'>
        <img src={imageUrl} alt={info.name} className='object-cover w-full h-full rounded-t-lg' />
        {info.aggregatedDiscountInfoV3 && (
          <div className='absolute top-2 left-2 bg-success text-success-content px-2 py-1 rounded text-xs font-semibold'>
            {info.aggregatedDiscountInfoV3.header}
          </div>
        )}
      </figure>
      <div className='card-body p-2'>
        <h2 className='card-title text-lg font-semibold truncate mb-1 text-base-content'>{info.name}</h2>
        <p className='text-sm text-base-content/60 truncate mb-2'>{info.cuisines.join(', ')}</p>
        <div className='flex justify-between items-center mb-1'>
          <span className='text-sm font-medium flex items-center gap-1 text-base-content'>
            <span className='text-warning'>⭐</span> {info.avgRating}
          </span>
          <span className='text-sm text-base-content/50'>{info.costForTwo}</span>
        </div>
        <p className='text-xs text-base-content/50'>{info.sla.deliveryTime} mins</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
