import { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className='min-h-full bg-base-200 py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-5xl mx-auto'>
          {/* Hero card */}
          <div className='card bg-base-100 shadow-xl border border-base-300 overflow-hidden'>
            <div className='flex flex-col lg:flex-row'>
              {/* Left — profile panel */}
              <div className='lg:w-2/5 bg-linear-to-br from-orange-500 to-rose-600 p-8 flex flex-col items-center justify-center text-white'>
                <img
                  src='https://avatars.githubusercontent.com/u/128993309?v=4'
                  alt='akhilesh79 avatar'
                  className='w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full object-cover border-4 border-white/30 shadow-xl'
                />
                <h2 className='mt-5 text-2xl sm:text-3xl font-bold text-center'>
                  <a
                    href='https://github.com/akhilesh79'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:underline'
                  >
                    akhilesh79
                  </a>
                </h2>
                <p className='mt-1 text-white/80 text-sm sm:text-base text-center'>Full Stack Web Developer</p>
                <p className='mt-4 text-white/70 text-sm text-center leading-relaxed max-w-xs'>
                  Building scalable, user-centric web applications with clean architecture and modern UI principles.
                </p>
                <div className='mt-6 flex gap-3'>
                  <a
                    href='https://github.com/akhilesh79'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-sm bg-white/20 hover:bg-white/30 text-white border-white/30'
                  >
                    GitHub
                  </a>
                  <a
                    href='mailto:makmishra.99@gmail.com'
                    className='btn btn-sm bg-white/20 hover:bg-white/30 text-white border-white/30'
                  >
                    Email
                  </a>
                </div>
              </div>

              {/* Right — content */}
              <div className='lg:w-3/5 p-6 sm:p-8'>
                <h1 className='text-3xl sm:text-4xl font-bold text-base-content mb-2'>About Us</h1>
                <div className='divider my-3' />

                <div className='space-y-4 text-base-content/70'>
                  <p className='text-base sm:text-lg leading-relaxed'>
                    Welcome to <strong className='text-base-content'>Namaste Food</strong> — a demonstration of modern
                    web development built with React, Tailwind CSS, and a passion for great user experiences.
                  </p>
                  <p className='leading-relaxed'>
                    As a full-stack developer, I strive to create applications that are not only functional but also
                    beautiful and responsive across all devices.
                  </p>

                  <div className='bg-base-200 p-4 rounded-xl border border-base-300'>
                    <h3 className='font-semibold text-base-content mb-3 text-sm uppercase tracking-wider'>
                      Tech Stack
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {[
                        'React 19',
                        'Tailwind CSS v4',
                        'DaisyUI',
                        'Redux Toolkit',
                        'React Router',
                        'Parcel',
                        'Axios',
                      ].map((t) => (
                        <span key={t} className='badge badge-outline badge-md'>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className='leading-relaxed'>
                    Thank you for exploring this project. Feel free to reach out for collaborations or feedback!
                  </p>
                </div>

                <div className='mt-6 pt-6 border-t border-base-300 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
                  <div className='flex items-center gap-2 text-base-content/60'>
                    <span>📧</span> makmishra.99@gmail.com
                  </div>
                  <div className='flex items-center gap-2 text-base-content/60'>
                    <span>💼</span> Full Stack Developer
                  </div>
                  <div className='flex items-center gap-2 text-base-content/60'>
                    <span>🌟</span> Open to collaborations
                  </div>
                  <div className='flex items-center gap-2 text-base-content/60'>
                    <span>📍</span> India
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6'>
            {[
              { label: 'Restaurants', value: '500+' },
              { label: 'Cuisines', value: '30+' },
              { label: 'Cities', value: '20+' },
              { label: 'Happy Users', value: '10K+' },
            ].map(({ label, value }) => (
              <div key={label} className='card bg-base-100 border border-base-300 p-4 text-center'>
                <div className='text-2xl sm:text-3xl font-bold text-orange-500'>{value}</div>
                <div className='text-xs sm:text-sm text-base-content/60 mt-1'>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default About;
