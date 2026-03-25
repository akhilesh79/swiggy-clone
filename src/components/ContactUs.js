import { Component } from 'react';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
      submitted: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, submitted: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true, name: '', email: '', subject: '', message: '' });
  };

  render() {
    const { name, email, subject, message, submitted } = this.state;

    return (
      <div className='min-h-full bg-base-200 py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-5xl mx-auto'>
          <div className='card bg-base-100 shadow-xl border border-base-300 overflow-hidden'>
            <div className='flex flex-col lg:flex-row'>
              {/* Left — contact info panel */}
              <div className='lg:w-2/5 bg-linear-to-br from-orange-500 to-rose-600 p-8 flex flex-col items-center justify-center text-white'>
                <img
                  src='https://avatars.githubusercontent.com/u/128993309?v=4'
                  alt='akhilesh79 avatar'
                  className='w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full object-cover border-4 border-white/30 shadow-xl mb-5'
                />
                <h2 className='text-2xl sm:text-3xl font-bold text-center mb-1'>Akhilesh Kumar Mishra</h2>
                <p className='text-white/80 text-sm mb-8 text-center'>Professional Inquiries</p>

                <div className='space-y-5 w-full max-w-xs'>
                  {[
                    { icon: '📧', label: 'Email', value: 'makmishra.99@gmail.com' },
                    { icon: '📱', label: 'Phone', value: '+91 8765120746' },
                    { icon: '💼', label: 'Availability', value: 'Open for projects' },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className='flex items-center gap-4'>
                      <div className='w-11 h-11 bg-white/15 rounded-full flex items-center justify-center shrink-0'>
                        <span className='text-xl'>{icon}</span>
                      </div>
                      <div>
                        <p className='font-semibold text-sm'>{label}</p>
                        <p className='text-white/70 text-sm'>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — contact form */}
              <div className='lg:w-3/5 p-6 sm:p-8'>
                <h1 className='text-3xl sm:text-4xl font-bold text-base-content mb-1'>Contact Us</h1>
                <p className='text-base-content/60 mb-6 text-sm'>
                  We’d love to hear from you. Send us a message and we’ll respond as soon as possible.
                </p>

                {submitted && (
                  <div className='alert alert-success mb-6'>
                    <span>✓ Message sent! We’ll get back to you within 24 hours.</span>
                  </div>
                )}

                <form onSubmit={this.handleSubmit} className='space-y-4'>
                  <div className='grid sm:grid-cols-2 gap-4'>
                    <div className='form-control'>
                      <label className='label py-1'>
                        <span className='label-text font-medium'>Full Name</span>
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        onChange={this.handleInputChange}
                        required
                        className='input input-bordered w-full'
                        placeholder='John Doe'
                      />
                    </div>
                    <div className='form-control'>
                      <label className='label py-1'>
                        <span className='label-text font-medium'>Email</span>
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={this.handleInputChange}
                        required
                        className='input input-bordered w-full'
                        placeholder='john@example.com'
                      />
                    </div>
                  </div>

                  <div className='form-control'>
                    <label className='label py-1'>
                      <span className='label-text font-medium'>Subject</span>
                    </label>
                    <input
                      type='text'
                      id='subject'
                      name='subject'
                      value={subject}
                      onChange={this.handleInputChange}
                      required
                      className='input input-bordered w-full'
                      placeholder='How can we help?'
                    />
                  </div>

                  <div className='form-control'>
                    <label className='label py-1'>
                      <span className='label-text font-medium'>Message</span>
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      value={message}
                      onChange={this.handleInputChange}
                      required
                      rows={5}
                      className='textarea textarea-bordered w-full resize-none'
                      placeholder='Tell us more about your project or inquiry...'
                    />
                  </div>

                  <button
                    type='submit'
                    className='btn w-full sm:w-auto px-8 bg-orange-500 hover:bg-orange-600 text-white border-none'
                  >
                    Send Message
                  </button>
                </form>

                <p className='mt-6 text-xs text-base-content/40'>We typically respond within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
