import Image from 'next/image'
import { getDictionary } from './dictionaries'

export default async function Home({ params: { lang } }:any) {
  const dict = await getDictionary(lang)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
  )
}
