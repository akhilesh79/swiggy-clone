import { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className='bg-slate-50 flex items-center justify-center p-6'>
        <div className='w-full mx-auto bg-white shadow-sm border border-slate-200'>
          <div className='md:flex'>
            {/* Left side - Profile */}
            <div className='md:w-1/2 bg-slate-900 p-8 flex items-center justify-center'>
              <div className='text-center w-full'>
                <img
                  src='https://avatars.githubusercontent.com/u/128993309?v=4'
                  alt='akhilesh79 avatar'
                  className='w-36 h-36 mx-auto rounded-full object-cover border-4 border-slate-300 shadow-lg'
                />
                <h2 className='mt-5 text-3xl font-bold text-white'>akhilesh79</h2>
                <p className='mt-2 text-base md:text-lg text-slate-200'>Full Stack Web Developer</p>
                <p className='px-6 mt-4 text-sm text-slate-200'>
                  Building scalable, user-centric web applications with clean architecture and modern UI principles.
                </p>
              </div>
            </div>

            {/* Right side - Content */}
            <div className='md:w-1/2 p-8'>
              <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-6'>About Us</h1>

              <div className='space-y-4 text-gray-600'>
                <p className='text-lg leading-relaxed'>
                  Welcome to our Swiggy Clone! This project is a demonstration of modern web development techniques,
                  built with React, Tailwind CSS, and passion for great user experiences.
                </p>

                <p className='leading-relaxed'>
                  As a full-stack developer, I strive to create applications that are not only functional but also
                  beautiful and responsive across all devices. This clone showcases food delivery app features with a
                  clean, intuitive interface.
                </p>

                <div className='bg-slate-100 p-4 rounded-lg border border-slate-200'>
                  <h3 className='font-semibold text-slate-800 mb-2'>Tech Stack Used:</h3>
                  <div className='flex flex-wrap gap-2'>
                    <span className='bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm'>React</span>
                    <span className='bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm'>Tailwind CSS</span>
                    <span className='bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm'>JavaScript</span>
                    <span className='bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm'>Parcel</span>
                  </div>
                </div>

                <p className='leading-relaxed'>
                  Thank you for exploring this project. Feel free to reach out for collaborations or feedback!
                </p>
              </div>

              {/* Contact Info */}
              <div className='mt-8 pt-6 border-t border-gray-200'>
                <h3 className='font-semibold text-gray-800 mb-3'>Get in Touch</h3>
                <div className='space-y-2 text-sm text-gray-600'>
                  <p>📧 akhilesh79@example.com</p>
                  <p>💼 Full Stack Developer</p>
                  <p>🌟 Passionate about creating amazing web experiences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
