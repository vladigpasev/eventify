import Image from 'next/image'
import { getDictionary } from './dictionaries'
import Link from 'next/link';

export default async function Home({ params: { lang } }: any) {
  const dict = await getDictionary(lang);
  return (
    <main>
      <section
        style={{ backgroundImage: `url(/images/background.jpg)` }}
        className="py-36 md:py-72 w-full  relative bg-center bg-cover"
        id='home'
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative w-full">
          <div className="text-center">
            <h4 className="text-white lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative px-10">
              {dict.home.title}
            </h4>
            <p className="text-white opacity-50 mb-0 max-w-2xl text-lg mx-auto px-10">
              {dict.home.description}
            </p>

            <div className='flex items-center justify-center w-full py-10'>
              <div className='max-w-[650px] w-full mx-10'>
                <form>
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                    <textarea id="default-search" className="resize-y block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-24" placeholder={dict.home.ai_search_placeholder} required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="about" className='py-10'>
        <div className='flex lg:flex-row flex-col gap-6 p-5 items-center sm:px-6 lg:px-52 lg:gap-20'>
          <img src="/images/about.jpg" alt="About Image" className='rounded-lg shadow-2xl max-w-sm w-[90%]' />
          <div>
            <p className='text-lg font-semibold text-blue-700 mb-3'>WHO WE ARE ?</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">About Us</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </section>

      <section id='services' className='bg-white py-10'>
        <div className='px-6 lg:px-52 lg:gap-20'>
          <div className='flex lg:flex-row flex-col lg:items-center lg:justify-between'>
            <div>
              <p className='text-lg font-semibold text-blue-700 mb-3'>WHAT WE DO ?</p>
              <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold'>Find Local Events and Activities</h2>
            </div>
            <div>
              <p>Discover events that match your passions or create your own.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
            {[
              {
                title: "Discover Events",
                Icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2V3a1 1 0 011-1zm2 3a1 1 0 100 2 1 1 0 000-2zm5 0a1 1 0 100 2 1 1 0 000-2zM4 8h12v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8z" clipRule="evenodd" />
                  </svg>
                ),
                subtext: "Find local events that align with your interests and schedule.",
              },
              {
                title: "Create Events",
                Icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 012 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5z" clipRule="evenodd" />
                  </svg>
                ),
                subtext: "Host and organize your own events and activities in the community.",
              },
              {
                title: "Connect with Others",
                Icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                    <path d="M18 8c0 1.1-0.9 2-2 2h-4.1c0.1 0.3 0.1 0.7 0.1 1s0 0.7-0.1 1H16a2 2 0 002-2V8h-2zM4 10c-1.1 0-2-0.9-2-2V6h2v1h4V6h2v2c0 1.1-0.9 2-2 2H4zm9-2V6h3v2h-3zm-4 0V6h3v2H9zM5 12h4v2H5v-2zm6 0h4v2h-4v-2z" />
                    <path fillRule="evenodd" d="M4 15.5c0-0.3 0-0.5 0.1-0.8 0.4-1.3 1.8-2.2 3.4-2.2h5c1.6 0 3 0.9 3.4 2.2 0.1 0.3 0.1 0.5 0.1 0.8v0.5H4v-0.5z" clipRule="evenodd" />
                  </svg>
                ),
                subtext: "Meet and connect with people who share your interests.",
              },
              {
                title: "Real-Time Updates",
                Icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                    <path d="M10 18a2 2 0 002-2H8a2 2 0 002 2z" />
                    <path fillRule="evenodd" d="M10 4a6 6 0 00-6 6v3.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5V10a6 6 0 00-6-6z" clipRule="evenodd" />
                  </svg>
                ),
                subtext: "Stay informed with the latest event details and announcements.",
              },
              {
                title: "Easy Management",
                Icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M11.3 1.046a1 1 0 00-2.6 0l-1.45 2.9a1 1 0 01-.75.546l-3.2.464a1 1 0 00-.554 1.705l2.312 2.252a1 1 0 01.29.884l-.546 3.193a1 1 0 001.45 1.054L10 13.433l2.863 1.505a1 1 0 001.45-1.054l-.546-3.193a1 1 0 01.29-.884l2.312-2.252a1 1 0 00-.554-1.705l-3.2-.464a1 1 0 01-.75-.546l-1.45-2.9zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                ),
                subtext: "Easily manage your events and track attendance.",
              },
              {
                title: "Support & Safety",
                Icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M10 18.364V2a2 2 0 012 2v11.536a2 2 0 01-.293.707l-5.414 5.414A1 1 0 015 19.05V4a2 2 0 012-2v16.364a1 1 0 001.293.95l5.414-5.414A2 2 0 0110 18.364z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M15.707 4.707a1 1 0 00-1.414-1.414L10 7.586 8.707 6.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
                  </svg>
                ),
                subtext: "Dedicated support and safety measures for a worry-free experience.",
              },
            ].map((item, key) => (
              <div
                key={key}
                className={`features p-6 ${key % 2 === 0
                  ? "hover:shadow-xl hover:shadow-slate-100 dark:hover:shadow-slate-800"
                  : "shadow-xl shadow-slate-100 dark:shadow-slate-800"
                  } transition duration-500 rounded-3xl mt-8`}
              >
                <div className="w-20 h-20 bg-accent/5 text-accent rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm">
                  {item.Icon}
                </div>

                <div className="content mt-7">
                  <a
                    href="#"
                    className="text-lg hover:text-accent transition-all duration-500 ease-in-out font-medium"
                  >
                    {item.title}
                  </a>
                  <p className="text-slate-400 mt-3">{item.subtext}</p>

                  <a href="#" className="mt-5 flex flex-row font-semibold items-center gap-3 hover:text-accent after:bg-accent transition duration-500">
                    <span>
                      Read More
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
                      <path fillRule="evenodd" clipRule="evenodd" d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236H-0.001v1h21.884z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='container mx-auto px-4 lg:px-20 pt-10'>
          <div className='text-center mb-12'>
            <p className='text-lg font-semibold text-blue-700 mb-3'>WORK PROCESS</p>
            <h2 className='text-3xl lg:text-4xl font-bold'>Our Work Process</h2>
            <p className='text-md mt-3 text-gray-600'>Understand the steps from event creation to participation</p>
          </div>

          <div className='space-y-12 md:space-y-0 px-6'>
            <div className='flex flex-col md:grid md:grid-cols-12 gap-6 items-center'>
              <div className='md:col-span-5'>
                <img src="/images/svg/undraw_create_re_57a3.svg" alt="Create Event Illustration" className='w-full max-w-md mx-auto' />
              </div>
              <div className='md:col-span-7'>
                <h3 className='text-lg font-semibold mb-3'>The Organizer Creates an Event</h3>
                <p className='text-gray-600'>Event organizers can easily set up events, providing all necessary details and images to attract users.</p>
              </div>
            </div>

            <div className='flex flex-col md:grid md:grid-cols-12 gap-6 items-center'>
              <div className='md:col-span-7 md:order-1 order-2'>
                <h3 className='text-lg font-semibold mb-3'>The User Finds the Event and Pays for It</h3>
                <p className='text-gray-600'>Users browse through a variety of events, select the ones they're interested in, and make secure payments to confirm their participation.</p>
              </div>
              <div className='md:col-span-5 md:order-2 order-1'>
                <img src="/images/svg/undraw_searching_re_3ra9.svg" alt="Search Event Illustration" className='w-full max-w-md mx-auto' />
              </div>
            </div>

            <div className='flex flex-col md:grid md:grid-cols-12 gap-6 items-center'>
              <div className='md:col-span-5'>
                <img src="/images/svg/undraw_stripe_payments_re_chlm.svg" alt="Payment Illustration" className='w-full max-w-md mx-auto' />
              </div>
              <div className='md:col-span-7'>
                <h3 className='text-lg font-semibold mb-3'>The Organizer Gets Paid for the Event</h3>
                <p className='text-gray-600'>Once the event is successfully conducted, organizers receive their payments promptly, ensuring a smooth and reliable transaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
