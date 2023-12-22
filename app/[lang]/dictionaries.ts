import 'server-only'
 
const dictionaries = {
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
  bg: () => import('../../dictionaries/bg.json').then((module) => module.default),
}
//@ts-ignore
export const getDictionary = async (locale) => dictionaries[locale]()