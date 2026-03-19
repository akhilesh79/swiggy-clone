import { Component } from 'react';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', this.state);
    alert('Thank you for your message! We will get back to you soon.');
    this.setState({ name: '', email: '', subject: '', message: '' });
  };

  render() {
    const { name, email, subject, message } = this.state;

    return (
      <div className='bg-base-200 flex items-center justify-center p-6'>
        <div className='w-full mx-auto bg-base-100 shadow-sm rounded-none border border-base-300'>
          <div className='md:flex'>
            {/* Left side - Contact Info */}
            <div className='md:w-1/2 bg-base-content p-8 flex items-center justify-center'>
              <div className='text-center w-full text-base-100'>
                <img
                  src='https://avatars.githubusercontent.com/u/128993309?v=4'
                  alt='akhilesh79 avatar'
                  className='w-32 h-32 mx-auto rounded-full object-cover border-4 border-base-300 shadow-lg mb-6'
                />
                <h2 className='text-3xl font-bold mb-2'>Akhilesh Kumar Mishra</h2>
                <p className='text-lg mb-8 text-base-200'>Professional Inquiries</p>

                <div className='space-y-6 text-left max-w-sm mx-auto'>
                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 bg-base-100/20 rounded-full flex items-center justify-center'>
                      <span className='text-xl'>📧</span>
                    </div>
                    <div>
                      <p className='font-semibold'>Email</p>
                      <p className='text-base-200'>akhilesh79@example.com</p>
                    </div>
                  </div>

                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 bg-base-100/10 rounded-full flex items-center justify-center'>
                      <span className='text-xl'>📱</span>
                    </div>
                    <div>
                      <p className='font-semibold'>Phone</p>
                      <p className='text-base-200'>+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 bg-base-100/20 rounded-full flex items-center justify-center'>
                      <span className='text-xl'>📍</span>
                    </div>
                    <div>
                      <p className='font-semibold'>Location</p>
                      <p className='text-base-200'>Remote / Worldwide</p>
                    </div>
                  </div>

                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 bg-base-100/20 rounded-full flex items-center justify-center'>
                      <span className='text-xl'>💼</span>
                    </div>
                    <div>
                      <p className='font-semibold'>Availability</p>
                      <p className='text-base-200'>Open for projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className='md:w-1/2 p-8 flex items-center justify-center'>
              <div className='w-full max-w-lg'>
                <h1 className='text-3xl md:text-4xl font-bold text-base-content mb-2'>Contact Us</h1>
                <p className='text-base-content/60 mb-8'>
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>

                <form onSubmit={this.handleSubmit} className='space-y-6'>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <label htmlFor='name' className='block text-sm font-medium text-base-content mb-2'>
                        Full Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        onChange={this.handleInputChange}
                        required
                        className='w-full px-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-base-100 text-base-content'
                        placeholder='Your name'
                      />
                    </div>
                    <div>
                      <label htmlFor='email' className='block text-sm font-medium text-base-content mb-2'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={this.handleInputChange}
                        required
                        className='w-full px-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-base-100 text-base-content'
                        placeholder='your@email.com'
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='subject' className='block text-sm font-medium text-base-content mb-2'>
                      Subject
                    </label>
                    <input
                      type='text'
                      id='subject'
                      name='subject'
                      value={subject}
                      onChange={this.handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-base-100 text-base-content'
                      placeholder='How can we help?'
                    />
                  </div>

                  <div>
                    <label htmlFor='message' className='block text-sm font-medium text-base-content mb-2'>
                      Message
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      value={message}
                      onChange={this.handleInputChange}
                      required
                      rows={6}
                      className='w-full px-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none bg-base-100 text-base-content'
                      placeholder='Tell us more about your project or inquiry...'
                    />
                  </div>

                  <button
                    type='submit'
                    className='w-full bg-base-content text-base-100 py-3 px-6 rounded-lg font-semibold hover:bg-base-content/80 transition-all duration-300 transform hover:scale-[1.01] shadow-lg'
                  >
                    Send Message
                  </button>
                </form>

                <div className='mt-8 text-center'>
                  <p className='text-sm text-base-content/50'>We typically respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
