import { useState } from 'react';
import { CDN_ITEM } from '../constants/common';
import { useCart } from '../contexts/CartContext';

const formatPrice = (priceInPaise) => {
  if (priceInPaise == null) return '';
  return `₹${(priceInPaise / 100).toFixed(0)}`;
};

const RestaurantCategories = ({ category, showAllItems, setShowCategoryIndex }) => {
  const { addItem, items } = useCart();
  return (
    <div className=' border border-base-300 bg-base-100 shadow-sm'>
      <div
        className='px-5 py-4 flex items-center justify-between cursor-pointer'
        onClick={() => setShowCategoryIndex()}
      >
        <h2 className='text-lg font-semibold text-base-content'>{category.title}</h2>
        <span className='text-sm text-base-content/50'>{category.items.length} items ↓</span>
      </div>
      {showAllItems && (
        <div className='divide-y divide-base-300'>
          {category.items.map((item) => (
            <div key={item.id} className='px-5 py-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
              <div className='flex-1'>
                <div className='flex items-start justify-between gap-3'>
                  <h3 className='text-base font-semibold text-base-content'>{item.name}</h3>
                  <span className='text-sm font-semibold text-base-content'>
                    {formatPrice(item.price ?? item.defaultPrice)}
                  </span>
                </div>
                <p className='text-sm text-base-content/60 mt-1'>{item.description}</p>
                <div className='flex flex-wrap gap-2 mt-2 text-xs text-base-content/50'>
                  <span className='badge badge-sm badge-outline'>{item.category}</span>
                  <span className='badge badge-sm badge-outline'>Serves 1</span>
                </div>
              </div>
              {item.imageId ? (
                <div className='w-24 h-24 rounded-xl overflow-hidden bg-base-200 shrink-0'>
                  <img src={`${CDN_ITEM}/${item.imageId}`} alt={item.name} className='w-full h-full object-cover' />
                </div>
              ) : null}
              <button onClick={() => addItem(item)} className='btn btn-sm btn-outline self-start md:self-center'>
                {items.some((i) => i.id === item.id) ? 'ADDED' : 'ADD'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantCategories;
