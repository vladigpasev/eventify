import React from "react";
import Link from "next/link";
//@ts-ignore
export default function Pricing() {
    const pricing = [
        {
            id: 1,
            title: "Hobby",
            price: 0,
            description: "Perfect for event participators and hobby event creators.",
            features: [
                { text: "Participate in all events", type: "included" },
                { text: "Create up to 5 events per month", type: "included" },
                { text: "Event advertising as add-on", type: "partially-included" },
                { text: "30% commission per event", type: "partially-included" },
                { text: "Basic and Premium event features disabled", type: "not-included" }
            ],
        },
        {
            id: 2,
            title: "Basic",
            price: 12,
            description: "Perfect for event organizers with up to 20 events/month.",
            features: [
                { text: "Everything included in Hobby", type: "included" },
                { text: "Create up to 20 events per month", type: "included" },
                { text: "Basic event features enabled", type: "included" },
                { text: "Event advertising as add-on with 20% discount", type: "partially-included" },
                { text: "10% commission per event", type: "partially-included" },
            ],
        },
        {
            id: 3,
            title: "Premium",
            price: 28,
            description: "Perfect for event organizers with lots of events.",
            features: [
                { text: "Everything included in Basic", type: "included" },
                { text: "Create unlimited events per month", type: "included" },
                { text: "Premium event features enabled", type: "included" },
                { text: "All event advertising features are enabled", type: "included" },
                { text: "3% commission per event", type: "partially-included" }
            ],
        },
    ];

    const TickSvg = () => (
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
            <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );

    const XSvg = () => (
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
            <path d="M8 8l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <path d="M16 8l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
    );

    const PartialSvg = () => (
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );


    return (
        <>
            {/* Start */}

            <section className="py-10 px-6 lg:px-52" id="pricing">
                <div >
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h6 className="text-lg font-semibold text-blue-700 mb-3">
                        PRICING
                        </h6>
                        <h3 className="mb-4 text-3xl lg:text-4xl font-bold">
                        Packages
                        </h3>

                        <p className="text-slate-400 dark:text-slate-300 max-w-xl mx-auto">
                        Start creating events without the need for a large budget. Participate in all events.
                        </p>
                    </div>

                    <div className="flex flex-wrap">
                        {pricing.map((item, key) => (
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-0 md:px-3 mt-8"
                                key={key}
                            >
                                <div className="flex flex-col pt-8 pb-8 bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-black rounded-md shadow shadow-slate-200 dark:shadow-slate-700 transition duration-500">
                                    <div className="px-8 pb-8">
                                        <h3 className="mb-6 text-lg md:text-xl font-semibold dark:text-white">
                                            {item.title}
                                        </h3>
                                        <div className="mb-6 dark:text-white/70">
                                            <span className="relative -top-5 text-2xl">$</span>
                                            <span className="text-5xl font-semibold dark:text-white">
                                                {item.price}
                                            </span>
                                            <span className="inline-block ms-1">/ month</span>
                                        </div>
                                        <p className="mb-6 text-slate-430 dark:text-slate-300">
                                            {item.description}
                                        </p>
                                        <Link
                                            href={`https://organize.eventify.bg/`}
                                            className="btn bg-primary border-primary text-white rounded-md w-full"
                                        >
                                            Start organising
                                        </Link>
                                    </div>
                                    <div className="border-b border-slate-200 dark:border-slate-700"></div>
                                    <ul className="self-start px-8 pt-8">
                                        {item.features.map((subitem, index) => (
                                            <li
                                                className="flex items-center my-1 text-slate-400 dark:text-slate-300"
                                                key={index}
                                            >
                                                <div className="flex flex-row gap-3 items-center">
                                                    {/* Conditional rendering based on the feature type */}
                                                    <div className={`${subitem.type === "included"
                                                        ? "text-success"
                                                        : subitem.type === "not-included"
                                                            ? "text-error"
                                                            : "text-slate-400"
                                                    } dark:text-slate-300`}>
                                                        {subitem.type === "included" && <TickSvg />}
                                                        {subitem.type === "not-included" && <XSvg />}
                                                        {subitem.type === "partially-included" && <PartialSvg />}
                                                    </div>
                                                    <span>{subitem.text}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center text-slate-400 dark:text-slate-300 mt-2">
                        <span className="text-primary">*</span>No credit card required
                    </div>
                </div>
            </section>
        </>
    );
}
