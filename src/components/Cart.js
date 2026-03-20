import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CDN_ITEM } from '../constants/common';

const formatPrice = (priceInPaise) => {
  if (priceInPaise == null) return '₹0';
  return `₹${(priceInPaise / 100).toFixed(2)}`;
};

const Cart = () => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20 px-4'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>🛒</div>
          <h2 className='text-2xl font-bold text-base-content mb-2'>Your Cart is Empty</h2>
          <p className='text-base-content/60 mb-6'>Add some delicious items to get started!</p>
          <Link to='/' className='btn btn-primary'>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='py-8 px-4'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-base-content mb-8'>Your Cart</h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-2'>
            <div className='bg-base-100 rounded-lg shadow-sm border border-base-300 overflow-hidden'>
              <div className='divide-y divide-base-300'>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className='p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
                  >
                    {/* Item Image and Details */}
                    <div className='flex gap-4 flex-1 min-w-0'>
                      {item.imageId ? (
                        <div className='w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-base-200 shrink-0'>
                          <img
                            src={`${CDN_ITEM}/${item.imageId}`}
                            alt={item.name}
                            className='w-full h-full object-cover'
                          />
                        </div>
                      ) : (
                        <div className='w-20 h-20 md:w-24 md:h-24 rounded-lg bg-base-300 shrink-0 flex items-center justify-center'>
                          🍖
                        </div>
                      )}

                      <div className='flex-1 min-w-0'>
                        <h3 className='text-base md:text-lg font-semibold text-base-content truncate'>{item.name}</h3>
                        <p className='text-sm text-base-content/60 mt-1 line-clamp-2'>{item.description}</p>
                        <div className='mt-2'>
                          <span className='text-base md:text-lg font-bold text-primary'>{formatPrice(item.price)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className='flex items-center gap-4 justify-between md:justify-end md:flex-col md:gap-2'>
                      <div className='flex items-center gap-2 bg-base-200 rounded-lg p-1'>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className='btn btn-xs btn-ghost'
                        >
                          −
                        </button>
                        <span className='w-8 text-center font-semibold text-base-content'>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className='btn btn-xs btn-ghost'
                        >
                          +
                        </button>
                      </div>
                      <div className='text-right'>
                        <div className='text-sm text-base-content/60 mb-1'>Subtotal</div>
                        <div className='text-lg font-bold text-base-content'>
                          {formatPrice((item.price / 100) * item.quantity * 100)}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className='btn btn-xs btn-ghost btn-outline text-error hover:bg-error/10'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-base-100 rounded-lg shadow-sm border border-base-300 p-6 sticky top-20'>
              <h2 className='text-xl font-bold text-base-content mb-4'>Order Summary</h2>

              <div className='space-y-3 mb-6 pb-6 border-b border-base-300'>
                <div className='flex justify-between text-sm text-base-content/70'>
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm text-base-content/70'>
                  <span>Delivery</span>
                  <span className='text-success'>Free</span>
                </div>
                <div className='flex justify-between text-sm text-base-content/70'>
                  <span>Tax & Charges</span>
                  <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
                </div>
              </div>

              <div className='flex justify-between items-center mb-6'>
                <span className='text-lg font-bold text-base-content'>Total</span>
                <span className='text-2xl font-bold text-primary'>₹{(totalPrice * 1.05).toFixed(2)}</span>
              </div>

              <button className='btn btn-primary w-full mb-3'>Proceed to Checkout</button>

              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear the cart?')) {
                    clearCart();
                  }
                }}
                className='btn btn-ghost btn-sm w-full'
              >
                Clear Cart
              </button>

              <Link to='/' className='btn btn-outline btn-sm w-full mt-3'>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
