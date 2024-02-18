import React from 'react'
import AllEvents from './client'
import type { Metadata } from 'next'

export const maxDuration = 300;

export const metadata: Metadata = {
    title: 'Events | Eventify',
    description: 'What do you want to do this weekend? Go to a party? Take part in a workshop? Find your opportunities at Eventify!',
    alternates: {
        canonical: `https://www.eventify.bg/events`,
    },
    openGraph: {
      images: `https://www.eventify.bg/images/opengraph.png`,
  }
}

function AllEventsPage() {
  return (
    <div>
        <AllEvents />
    </div>
  )
}

export default AllEventsPage