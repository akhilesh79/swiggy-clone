import { CDN_RESTAURANT } from '../constants/common';

const RestaurantCard = ({ restaurant }) => {
  const info = restaurant.info;
  const imageUrl = `${CDN_RESTAURANT}/${info.cloudinaryImageId}`;

  return (
    <div className='card w-full bg-base-100 border border-transparent hover:border-base-content/20 hover:shadow-md transition-all duration-200 cursor-pointer group'>
      <figure className='relative h-36 sm:h-40 overflow-hidden'>
        <img
          src={imageUrl}
          alt={info.name}
          className='object-cover w-full h-full rounded-t-2xl group-hover:scale-105 transition-transform duration-300'
        />
        {info.aggregatedDiscountInfoV3 && (
          <div className='absolute bottom-2 left-2 bg-base-content text-base-100 px-2 py-0.5 rounded text-xs font-bold tracking-wide'>
            {info.aggregatedDiscountInfoV3.header}
          </div>
        )}
      </figure>
      <div className='card-body p-2.5 gap-1'>
        <h2 className='font-semibold text-sm sm:text-base leading-tight line-clamp-1 text-base-content'>{info.name}</h2>
        <p className='text-xs text-base-content/50 line-clamp-1'>{info.cuisines.join(', ')}</p>
        <div className='flex items-center justify-between mt-0.5'>
          <span className='text-xs font-medium flex items-center gap-0.5 text-base-content'>
            <span className='text-warning'>⭐</span> {info.avgRating}
          </span>
          <span className='text-xs text-base-content/40'>{info.sla.deliveryTime} min</span>
        </div>
        <p className='text-xs text-base-content/40'>{info.costForTwo}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
