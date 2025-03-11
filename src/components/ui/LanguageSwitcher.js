import { PrismicLink } from '@prismicio/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { linkResolver } from '../../../prismicio'
import Link from 'next/link'
const LangIcon = ({ lang }) => {
  const code = lang.substring(0,2).toLowerCase()
  return <span className={`uppercase`}>{code}</span>
}

export const LanguageSwitcher = ({ altLangs = [] }) => {
  const [currentLang, setCurrentLang] = useState('')
  const router = useRouter()

  useEffect(() => {
    setCurrentLang(router.locale);
  }, [router.locale])

  return (
    <ul className="lang_switcher flex gap-1 md:text-base text-[23px]">
      {altLangs.map((altLang) => (
        <li key={`${altLang.lang}`}>
          <Link
            href={altLang.url || (altLang.lang === 'it-it' ? '/' : `/${altLang.lang}`)}
            locale={altLang.lang}
            className={altLang.lang === currentLang ? 'opacity-100' : 'opacity-50 hover:opacity-100 transition-all duration-300 cursor-pointer'}
          >
            <LangIcon lang={altLang.lang} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default LanguageSwitcher