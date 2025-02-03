import { PrismicLink } from '@prismicio/react'
import { linkResolver } from '../../../prismicio'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

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
    <ul className="lang_switcher flex gap-1">
      {altLangs.map((altLang) => (
        <li key={altLang.lang}>
          <PrismicLink
            href={linkResolver(altLang)}
            locale={altLang.lang}
            className={altLang.lang === currentLang ? 'underline' : ''}
          >
            <LangIcon lang={altLang.lang} />
          </PrismicLink>
        </li>
      ))}
    </ul>
  )
}

export default LanguageSwitcher