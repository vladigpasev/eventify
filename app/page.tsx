import Link from 'next/link';
import Pricing from '@/components/Pricing';
import Navbar from '@/components/Navbar';

export default async function Home({ params: { lang } }: any) {
  return (
    <main>
      <Navbar />
      <section
        style={{ backgroundImage: `url(/images/background.jpg)` }}
        className="py-36 md:py-72 w-full relative bg-center bg-cover"
        id='home'
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative w-full">
          <div className="text-center">
            <h4 className="text-white lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative px-10">
              What would you like to do today?
            </h4>
            <p className="text-white opacity-50 mb-0 max-w-2xl text-lg mx-auto px-10">
              You want to break free from the monotonous daily routine, but you don't know what you want to do? No problem, here you'll find all sorts of events in your area!
            </p>

            <div className='flex items-center justify-center w-full py-10'>
              <div className='max-w-[650px] w-full mx-10'>
                {/* <form>
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                    <textarea id="default-search" className="resize-y block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-24" placeholder="AI search: What would you like to do?" required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                  </div>
                </form> */}
                <Link href='/events' className='btn'>Explore events</Link>
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
            <p className="py-6">Eventify is a unique program for creating and discovering all kinds of events that can diversify our daily lives - from parties to scientific events and conferences.</p>
            <Link className="btn btn-primary" href={`/dashboard/register`}>Sign Up</Link>
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
              <p>Discover the perfect event for you. Organize events that will be discovered by the right audience.</p>
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
                subtext: "Find the perfect event for you in your area with just a few clicks and the help of Eventify AI.",
              },
              {
                title: "Create Events",
                Icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 012 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5z" clipRule="evenodd" />
                  </svg>
                ),
                subtext: "Host and organize your own events",
              },
              {
                title: "Connect with Others",
                Icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                    <path d="M18 8c0 1.1-0.9 2-2 2h-4.1c0.1 0.3 0.1 0.7 0.1 1s0 0.7-0.1 1H16a2 2 0 002-2V8h-2zM4 10c-1.1 0-2-0.9-2-2V6h2v1h4V6h2v2c0 1.1-0.9 2-2 2H4zm9-2V6h3v2h-3zm-4 0V6h3v2H9zM5 12h4v2H5v-2zm6 0h4v2h-4v-2z" />
                    <path fillRule="evenodd" d="M4 15.5c0-0.3 0-0.5 0.1-0.8 0.4-1.3 1.8-2.2 3.4-2.2h5c1.6 0 3 0.9 3.4 2.2 0.1 0.3 0.1 0.5 0.1 0.8v0.5H4v-0.5z" clipRule="evenodd" />
                  </svg>
                ),
                subtext: "Connect with people who share your interests.",
              },
              {
                title: "Real-Time Updates",
                Icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                    <path d="M10 18a2 2 0 002-2H8a2 2 0 002 2z" />
                    <path fillRule="evenodd" d="M10 4a6 6 0 00-6 6v3.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5V10a6 6 0 00-6-6z" clipRule="evenodd" />
                  </svg>
                ),
                subtext: "Stay informed about the latest updates and announcements for your events.",
              },
              {
                title: "Easy Management",
                Icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M11.3 1.046a1 1 0 00-2.6 0l-1.45 2.9a1 1 0 01-.75.546l-3.2.464a1 1 0 00-.554 1.705l2.312 2.252a1 1 0 01.29.884l-.546 3.193a1 1 0 001.45 1.054L10 13.433l2.863 1.505a1 1 0 001.45-1.054l-.546-3.193a1 1 0 01.29-.884l2.312-2.252a1 1 0 00-.554-1.705l-3.2-.464a1 1 0 01-.75-.546l-1.45-2.9zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                ),
                subtext: "Easily manage your events and track audience.",
              },
              {
                title: "Support & Safety",
                Icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M10 18.364V2a2 2 0 012 2v11.536a2 2 0 01-.293.707l-5.414 5.414A1 1 0 015 19.05V4a2 2 0 012-2v16.364a1 1 0 001.293.95l5.414-5.414A2 2 0 0110 18.364z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M15.707 4.707a1 1 0 00-1.414-1.414L10 7.586 8.707 6.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
                  </svg>
                ),
                subtext: "All events are constantly updated and verified by our team.",
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

                  <a href="#services" className="mt-5 flex flex-row font-semibold items-center gap-3 hover:text-accent after:bg-accent transition duration-500">
                    <span>
                      Read more
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
            {/* Step 1 */}
            <div className='flex flex-col md:grid md:grid-cols-12 gap-6 items-center'>
              <div className='md:col-span-5'>
                <img src="/images/svg/undraw_create_re_57a3.svg" alt="Create Event Illustration" className='w-full max-w-md mx-auto' />
              </div>
              <div className='md:col-span-7'>
                <h3 className='text-lg font-semibold mb-3'>The Organizer Creates an Event</h3>
                <p className='text-gray-600'>Event organizers can easily and intuitively create their events, providing all necessary details to attract users.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className='flex flex-col md:grid md:grid-cols-12 gap-6 items-center'>
              <div className='md:col-span-7 md:order-1 order-2'>
                <h3 className='text-lg font-semibold mb-3'>The User Finds the Event and Pays for It</h3>
                <p className='text-gray-600'>Users browse events specially suggested for them, choose the ones that interest them, and make secure payments to confirm their participation.</p>
              </div>
              <div className='md:col-span-5 md:order-2 order-1'>
                <img src="/images/svg/undraw_searching_re_3ra9.svg" alt="Search Event Illustration" className='w-full max-w-md mx-auto' />
              </div>
            </div>

            {/* Step 3 */}
            <div className='flex flex-col md:grid md:grid-cols-12 gap-6 items-center'>
              <div className='md:col-span-5'>
                <img src="/images/svg/undraw_stripe_payments_re_chlm.svg" alt="Payment Illustration" className='w-full max-w-md mx-auto' />
              </div>
              <div className='md:col-span-7'>
                <h3 className='text-lg font-semibold mb-3'>The Organizer Gets Paid for the Event</h3>
                <p className='text-gray-600'>After the event is successfully held, organizers receive their payments through bank transfer.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='reviews' className="bg-gray-100 py-10">
        <div className='text-center mb-12'>
          <p className='text-lg font-semibold text-blue-700 mb-3'>CLIENT REVIEWS</p>
          <h2 className='text-3xl lg:text-4xl font-bold'>What People Say About Us</h2>
        </div>
        <div className='flex flex-wrap justify-center gap-10 px-5 lg:px-52'>
          {[
            {
              name: "Nikolina Petrova",
              review: "The events are always of high quality, and the community is fantastic. I have never been disappointed!",
              stars: 5,
            },
            {
              name: "Zak Suters",
              review: "A great way to diversify your daily routine. There are always events on offer that are perfect for me!",
              stars: 5,
            },
            {
              name: "Genka Petakova",
              review: "A wide variety of events, intuitive UX, everything is just a click away, highly recommended!",
              stars: 5,
            },
          ].map((item, key) => (
            <div
              key={key}
              className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-center">
                  {[...Array(item.stars)].map((star, index) => (
                    <svg key={index} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-yellow-500" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.396-.956 1.555-.956 1.951 0l1.562 3.77 4.16.606c.68.1 1.007 1.028.487 1.542l-3.008 2.93.709 4.125c.115.668-.585 1.176-1.175.859l-3.707-1.948-3.707 1.948c-.59.317-1.29-.191-1.175-.859l.709-4.125-3.008-2.93c-.52-.514-.193-1.442.487-1.542l4.16-.606 1.562-3.77z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mt-2">{item.review}</p>
                <div className="mt-4">
                  <span className="text-blue-700 font-semibold">{item.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Pricing />
      <section id="contacts" className='bg-white py-10 px-6 lg:px-52 lg:gap-20'>
        <div>
          <div className="pb-8 text-center">
            <h6 className="text-lg font-semibold text-blue-700 mb-3">CONTACT US</h6>
            <h2 className="mb-4 text-3xl lg:text-4xl font-bold">Get In Touch</h2>

            <p className="text-slate-400 dark:text-slate-300 max-w-xl mx-auto">Connect with us through various channels, available 24/7.</p>
          </div>
          <div className='flex w-full justify-center '>
            <div className="mt-8 items-center gap-6 justify-center">
              <div>
                <div className="lg:ms-8">
                  {/* Phone Section */}
                  <div className="flex">
                    <div className="icons text-center mx-auto">
                      {/* Phone Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.128.94.361 1.87.7 2.78a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.31-1.31a2 2 0 0 1 2.11-.45c.91.339 1.84.572 2.78.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>

                    <div className="flex-1 ms-6">
                      <h5 className="text-lg dark:text-white mb-2 font-medium">Phone</h5>
                      <Link href="tel:+35924901990" className="text-slate-400">+359 2 490 1990</Link>
                    </div>
                  </div>

                  {/* Email Section */}
                  <div className="flex mt-4">
                    <div className="icons text-center mx-auto">
                      {/* Email Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                        <path d="M8 6l8 5 8-5" />
                      </svg>
                    </div>

                    <div className="flex-1 ms-6">
                      <h5 className="text-lg dark:text-white mb-2 font-medium">Email</h5>
                      <Link href="mailto:support@eventify.bg" className="text-slate-400">support@eventify.bg</Link>
                    </div>
                  </div>

                  {/* Location Section */}
                  <div className="flex mt-4">
                    <div className="icons text-center mx-auto">
                      {/* Location Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7.18-9 13-9 13s-9-5.82-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>

                    <div className="flex-1 ms-6">
                      <h5 className="text-lg dark:text-white mb-2 font-medium">Location</h5>
                      <p className="text-slate-400 mb-2">26 Pozitano str., Sofia, Bulgaria</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <footer className="footer p-10 bg-neutral text-neutral-content">
        <aside>
          <img src="/logo.png" alt="Eventify Logo" width={50} height={50} className='w-40' />
          <p>Eventify Ltd. <br /> All rights reserved 2023 ®</p>
        </aside>
        <nav>
          <header className="footer-title">SOCIAL</header>
          <div className="grid grid-flow-col gap-4">
            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
          </div>
        </nav>
      </footer>

    </main>
  )
}
