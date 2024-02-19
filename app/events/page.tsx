//Copyright (C) 2024  Vladimir Pasev
import React from 'react'
import AllEvents from './client'
import type { Metadata } from 'next'

export const maxDuration = 300;

export const metadata: Metadata = {
    title: 'Събития | Eventify',
    description: 'Какво ти се прави този уикенд? Ходи ти се на парти? Участва ти се в семинар? Намери възможности в Eventify!',
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