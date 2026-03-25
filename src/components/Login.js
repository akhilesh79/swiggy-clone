import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';
import { API_BASE_URL } from '../constants/common';

const Login = () => {
  const [isLoginFlow, setIsLoginFlow] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    ...(isLoginFlow
      ? {}
      : {
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
        }),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { firstName: '', lastName: '', email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isLoginFlow) {
          const res = await axios.post(
            API_BASE_URL + '/auth/login',
            { emailId: values.email, password: values.password },
            { withCredentials: true },
          );
          dispatch(setUser(res.data.data));
          toast.success(res.data.message || 'Logged in successfully!');
          navigate('/');
        } else {
          const res = await axios.post(
            API_BASE_URL + '/auth/signup',
            {
              firstName: values.firstName,
              lastName: values.lastName,
              emailId: values.email,
              password: values.password,
            },
            { withCredentials: true },
          );
          dispatch(setUser(res.data.data));
          toast.success(res.data.message || 'Account created!');
          navigate('/profile');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
      }
    },
  });

  const switchFlow = () => {
    setIsLoginFlow((prev) => !prev);
    formik.resetForm();
  };

  return (
    <div className='min-h-full flex flex-col md:flex-row'>
      {/* Left — Branding panel (hidden on mobile) */}
      <div className='hidden md:flex flex-col justify-center items-center flex-1 bg-gradient from-orange-500 via-red-500 to-rose-600 p-12 relative overflow-hidden'>
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className='absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl' />
        <div className='absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl' />
        <div className='relative z-10 text-center max-w-sm'>
          <div className='text-7xl mb-6'>🍱</div>
          <h1 className='text-5xl font-bold text-white mb-4'>Namaste Food</h1>
          <p className='text-white/80 text-lg leading-relaxed mb-8'>
            Delicious meals from the best restaurants, delivered straight to your door.
          </p>
          <div className='flex flex-wrap justify-center gap-2'>
            {['🍕 Pizza', '🍔 Burgers', '🍜 Noodles', '🍣 Sushi', '🥗 Salads', '🍛 Curry'].map((item) => (
              <span
                key={item}
                className='px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white text-sm rounded-full border border-white/20 font-medium'
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form panel */}
      <div className='flex-1 flex items-center justify-center p-6 py-10 bg-base-200'>
        <div className='card w-full max-w-md bg-base-100 shadow-2xl'>
          <div className='card-body p-8'>
            {/* Mobile logo */}
            <div className='md:hidden flex items-center justify-center gap-2 mb-4'>
              <span className='text-3xl'>🍱</span>
              <span className='text-xl font-bold text-orange-500'>Namaste Food</span>
            </div>

            <h2 className='text-2xl font-bold mb-1'>{isLoginFlow ? 'Welcome back! 👋' : 'Join us today 🎉'}</h2>
            <p className='text-base-content/60 text-sm mb-6'>
              {isLoginFlow ? 'Sign in to order your favourite food.' : 'Create your account and start ordering.'}
            </p>

            <form onSubmit={formik.handleSubmit} className='space-y-4'>
              {/* Signup-only name fields */}
              {!isLoginFlow && (
                <div className='grid grid-cols-2 gap-3'>
                  <div className='form-control'>
                    <label className='label py-1'>
                      <span className='label-text font-medium text-xs uppercase tracking-wide'>First Name</span>
                    </label>
                    <input
                      id='firstName'
                      type='text'
                      {...formik.getFieldProps('firstName')}
                      placeholder='John'
                      className={`input input-bordered w-full h-11 ${
                        formik.touched.firstName && formik.errors.firstName ? 'input-error' : ''
                      }`}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <label className='label py-0.5'>
                        <span className='label-text-alt text-error'>{formik.errors.firstName}</span>
                      </label>
                    )}
                  </div>
                  <div className='form-control'>
                    <label className='label py-1'>
                      <span className='label-text font-medium text-xs uppercase tracking-wide'>Last Name</span>
                    </label>
                    <input
                      id='lastName'
                      type='text'
                      {...formik.getFieldProps('lastName')}
                      placeholder='Doe'
                      className={`input input-bordered w-full h-11 ${
                        formik.touched.lastName && formik.errors.lastName ? 'input-error' : ''
                      }`}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <label className='label py-0.5'>
                        <span className='label-text-alt text-error'>{formik.errors.lastName}</span>
                      </label>
                    )}
                  </div>
                </div>
              )}

              {/* Email */}
              <div className='form-control'>
                <label className='label py-1'>
                  <span className='label-text font-medium text-xs uppercase tracking-wide'>Email Address</span>
                </label>
                <input
                  id='email'
                  type='email'
                  {...formik.getFieldProps('email')}
                  placeholder='john@example.com'
                  className={`input input-bordered w-full h-11 ${
                    formik.touched.email && formik.errors.email ? 'input-error' : ''
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <label className='label py-0.5'>
                    <span className='label-text-alt text-error'>{formik.errors.email}</span>
                  </label>
                )}
              </div>

              {/* Password */}
              <div className='form-control'>
                <label className='label py-1'>
                  <span className='label-text font-medium text-xs uppercase tracking-wide'>Password</span>
                </label>
                <div className='relative'>
                  <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    {...formik.getFieldProps('password')}
                    placeholder='Min. 6 characters'
                    className={`input input-bordered w-full h-11 pr-12 ${
                      formik.touched.password && formik.errors.password ? 'input-error' : ''
                    }`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((v) => !v)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content text-lg'
                    aria-label='Toggle password visibility'
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <label className='label py-0.5'>
                    <span className='label-text-alt text-error'>{formik.errors.password}</span>
                  </label>
                )}
              </div>

              <button
                type='submit'
                disabled={formik.isSubmitting}
                className='btn w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white border-none'
              >
                {formik.isSubmitting ? (
                  <span className='loading loading-spinner loading-sm' />
                ) : isLoginFlow ? (
                  'Sign In →'
                ) : (
                  'Create Account →'
                )}
              </button>
            </form>

            <div className='divider text-xs text-base-content/40 my-4'>or</div>

            <p className='text-center text-sm text-base-content/60'>
              {isLoginFlow ? "Don't have an account?" : 'Already have an account?'}
              <button
                type='button'
                onClick={switchFlow}
                className='btn btn-link btn-sm p-0 ml-1 font-semibold text-orange-500 no-underline hover:underline'
              >
                {isLoginFlow ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
