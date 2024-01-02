import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/Navbar'
import { getDictionary } from './dictionaries'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eventify',
  description: 'Случвало ли ви се е да имате свободно време, но да не знаете какво ви се прави? Планувате интересен уикенд с приятели, но се чудите къде да отидете? Eventify е решението на този проблем. Eventify е платформа, предназначена за организация и откриване на събития, партита и социални мероприятия. Ако и вие често изпадате в дилема, кои са алтернативите пред това да стоите вкъщи пред телевизора, Eventify е вашето спасение. Ако пък оргнанизирате интересни събития, вече сте само на няколко клика от това хората да разберат за тях. Намерете ни на eventify.bg, както и в App Store и Google Play.',
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: {
    lang: string
  }
}) {
  const dict = await getDictionary(params.lang)
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <Navbar locale={params.lang} home={dict.navbar.home} about={dict.navbar.about} services={dict.navbar.services} review={dict.navbar.review} pricing={dict.navbar.pricing} blog={dict.navbar.blog} contact={dict.navbar.contact} sign_up={dict.home.sign_up}/>
        {children}
      </body>
    </html>
  )
}