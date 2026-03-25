import { useDispatch, useSelector } from 'react-redux';
import { CDN_ITEM } from '../constants/common';
import { addItem } from '../store/slices/cartSlice';

const formatPrice = (priceInPaise) => {
  if (priceInPaise == null) return '';
  return `₹${(priceInPaise / 100).toFixed(0)}`;
};

const RestaurantCategories = ({ category, showAllItems, setShowCategoryIndex }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.cart);

  return (
    <div className='border border-base-300 bg-base-100 shadow-sm rounded-xl overflow-hidden'>
      {/* Accordion header */}
      <button
        type='button'
        className='w-full px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-base-200/50 transition-colors'
        onClick={() => setShowCategoryIndex()}
      >
        <h2 className='text-lg font-semibold text-base-content text-left'>{category.title}</h2>
        <div className='flex items-center gap-2 text-sm text-base-content/50'>
          <span>{category.items.length} items</span>
          <span className={`transition-transform duration-200 ${showAllItems ? 'rotate-180' : ''}`}>▼</span>
        </div>
      </button>

      {/* Items list */}
      {showAllItems && (
        <div className='divide-y divide-base-300'>
          {category.items.map((item) => {
            const inCart = items.some((i) => i.id === item.id);
            const cartItem = items.find((i) => i.id === item.id);
            return (
              <div key={item.id} className='px-5 py-4 flex items-start gap-4'>
                {/* Text block */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between gap-2'>
                    <h3 className='text-base font-semibold text-base-content leading-snug'>{item.name}</h3>
                  </div>
                  <p className='text-sm text-base-content/60 mt-1 line-clamp-2'>{item.description}</p>
                  <div className='mt-2 flex items-center gap-3'>
                    <span className='text-sm font-bold text-base-content'>
                      {formatPrice(item.price ?? item.defaultPrice)}
                    </span>
                    {item.category && <span className='badge badge-sm badge-ghost'>{item.category}</span>}
                  </div>
                </div>

                {/* Image + Add button */}
                <div className='flex flex-col items-center gap-2 shrink-0'>
                  {item.imageId ? (
                    <div className='w-24 h-20 rounded-xl overflow-hidden bg-base-200'>
                      <img src={`${CDN_ITEM}/${item.imageId}`} alt={item.name} className='w-full h-full object-cover' />
                    </div>
                  ) : (
                    <div className='w-24 h-20 rounded-xl bg-base-200 flex items-center justify-center text-2xl'>🍽️</div>
                  )}
                  <button
                    onClick={() => dispatch(addItem(item))}
                    className={`btn btn-xs w-full font-bold tracking-wide ${
                      inCart
                        ? 'btn-success'
                        : 'btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:border-orange-500 hover:text-white'
                    }`}
                  >
                    {inCart ? `✓ ${cartItem?.quantity ?? 1}` : '+ ADD'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RestaurantCategories;
