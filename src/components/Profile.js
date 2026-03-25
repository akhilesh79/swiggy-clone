import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setUser } from '../store/slices/userSlice';
import { API_BASE_URL } from '../constants/common';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    profileImage: '',
    age: '',
    gender: '',
    about: '',
    skills: [],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      profileImage: user.profileImage || '',
      age: user.age || '',
      gender: user.gender || '',
      about: user.about || '',
      skills: user.skills || [],
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.profileImage.trim()) errs.profileImage = 'Profile image URL is required';
    if (!form.age) errs.age = 'Age is required';
    else if (Number(form.age) < 18) errs.age = 'Must be at least 18 years old';
    if (!form.gender) errs.gender = 'Gender is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(API_BASE_URL + '/profile/edit', form, { withCredentials: true });
      dispatch(setUser(res.data.data));
      toast.success(res.data.message || 'Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const avatarFallback = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';

  return (
    <div className='bg-base-200 min-h-full p-4 sm:p-6 lg:p-8'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 items-start'>
        {/* ── Live Preview ── */}
        <div className='lg:col-span-2 lg:sticky lg:top-6'>
          <p className='text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-3'>Live Preview</p>
          <div className='card bg-base-100 shadow-xl overflow-hidden border border-base-300'>
            {/* Banner */}
            <div className='relative h-32 bg-gradient from-orange-500 to-red-500 overflow-hidden'>
              {form.profileImage && (
                <img
                  src={form.profileImage}
                  alt='banner'
                  className='w-full h-full object-cover opacity-30'
                  onError={(e) => (e.target.style.display = 'none')}
                />
              )}
            </div>

            {/* Avatar */}
            <div className='flex justify-center -mt-12 px-4'>
              <div className='avatar'>
                <div className='w-24 h-24 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2 bg-gradient from-orange-400 to-red-500'>
                  {form.profileImage ? (
                    <img
                      src={form.profileImage}
                      alt='avatar'
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = avatarFallback;
                      }}
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-white text-3xl font-bold'>
                      {(form.firstName[0] || '?').toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='card-body pt-3 text-center'>
              <h2 className='card-title justify-center text-xl'>
                {form.firstName || 'First'} {form.lastName || 'Last'}
              </h2>
              {(form.age || form.gender) && (
                <p className='text-base-content/60 text-sm'>
                  {form.age ? `${form.age} yrs` : ''}
                  {form.age && form.gender ? ' · ' : ''}
                  {form.gender || ''}
                </p>
              )}
              {form.about && (
                <p className='text-base-content/70 text-sm text-left mt-2 leading-relaxed'>{form.about}</p>
              )}
              {form.skills.length > 0 && (
                <div className='flex flex-wrap gap-1.5 justify-center mt-3'>
                  {form.skills.map((s) => (
                    <span key={s} className='badge badge-outline badge-sm'>
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Edit Form ── */}
        <div className='lg:col-span-3'>
          <div className='card bg-base-100 shadow-xl border border-base-300'>
            <div className='card-body p-6 sm:p-8'>
              <h2 className='text-2xl font-bold mb-1'>Edit Profile</h2>
              <p className='text-base-content/60 text-sm mb-6'>
                Update your info. The preview on the left updates live.
              </p>

              <form onSubmit={handleSubmit} className='space-y-5'>
                {/* Name */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='form-control'>
                    <label className='label py-1'>
                      <span className='label-text font-semibold'>First Name</span>
                    </label>
                    <input
                      name='firstName'
                      type='text'
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder='John'
                      className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`}
                    />
                    {errors.firstName && (
                      <label className='label py-0.5'>
                        <span className='label-text-alt text-error'>{errors.firstName}</span>
                      </label>
                    )}
                  </div>
                  <div className='form-control'>
                    <label className='label py-1'>
                      <span className='label-text font-semibold'>Last Name</span>
                    </label>
                    <input
                      name='lastName'
                      type='text'
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder='Doe'
                      className={`input input-bordered w-full ${errors.lastName ? 'input-error' : ''}`}
                    />
                    {errors.lastName && (
                      <label className='label py-0.5'>
                        <span className='label-text-alt text-error'>{errors.lastName}</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Profile Image */}
                <div className='form-control'>
                  <label className='label py-1'>
                    <span className='label-text font-semibold'>Profile Image URL</span>
                  </label>
                  <input
                    name='profileImage'
                    type='text'
                    value={form.profileImage}
                    onChange={handleChange}
                    placeholder='https://example.com/photo.jpg'
                    className={`input input-bordered w-full ${errors.profileImage ? 'input-error' : ''}`}
                  />
                  {errors.profileImage && (
                    <label className='label py-0.5'>
                      <span className='label-text-alt text-error'>{errors.profileImage}</span>
                    </label>
                  )}
                </div>

                {/* Age & Gender */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='form-control'>
                    <label className='label py-1'>
                      <span className='label-text font-semibold'>Age</span>
                    </label>
                    <input
                      name='age'
                      type='number'
                      value={form.age}
                      onChange={handleChange}
                      placeholder='25'
                      min='18'
                      max='100'
                      className={`input input-bordered w-full ${errors.age ? 'input-error' : ''}`}
                    />
                    {errors.age && (
                      <label className='label py-0.5'>
                        <span className='label-text-alt text-error'>{errors.age}</span>
                      </label>
                    )}
                  </div>
                  <div className='form-control'>
                    <label className='label py-1'>
                      <span className='label-text font-semibold'>Gender</span>
                    </label>
                    <select
                      name='gender'
                      value={form.gender}
                      onChange={handleChange}
                      className={`select select-bordered w-full ${errors.gender ? 'select-error' : ''}`}
                    >
                      <option value=''>Select gender</option>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                      <option value='other'>Other</option>
                    </select>
                    {errors.gender && (
                      <label className='label py-0.5'>
                        <span className='label-text-alt text-error'>{errors.gender}</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* About */}
                <div className='form-control'>
                  <label className='label py-1'>
                    <span className='label-text font-semibold'>About</span>
                    <span className='label-text-alt text-base-content/40'>{form.about.length}/500</span>
                  </label>
                  <textarea
                    name='about'
                    value={form.about}
                    onChange={handleChange}
                    placeholder='Tell others about yourself...'
                    maxLength='500'
                    rows='3'
                    className='textarea textarea-bordered w-full resize-none'
                  />
                </div>

                <div className='pt-4 border-t border-base-300'>
                  <button
                    type='submit'
                    disabled={loading}
                    className='btn w-full sm:w-auto px-8 bg-orange-500 hover:bg-orange-600 text-white border-none'
                  >
                    {loading ? <span className='loading loading-spinner loading-sm' /> : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
