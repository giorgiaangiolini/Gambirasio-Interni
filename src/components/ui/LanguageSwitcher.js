import { PrismicLink } from '@prismicio/react'
import { linkResolver } from '../../../prismicio'

const LangIcon = ({ lang }) => {
  const code = lang.substring(0,2).toLowerCase()
  return <span className={`uppercase`}>{code}</span>
}


export const LanguageSwitcher = ({ altLangs = [] }) => {

  return (
    <ul className='lang_switcher flex gap-1'>
      {altLangs[0].lang == "it-it" ? (
        <li className='lang-disabled'>EN</li>
      ): (
        <li className='lang-disabled'>IT</li>
      )}
      {altLangs.map((altLang) => {
        return (
          <li className='active' key={altLang.lang}>
            <PrismicLink
              href={linkResolver(altLang)}
              locale={altLang.lang}
            >
             <LangIcon lang={altLang.lang} />
            </PrismicLink>
          </li>
        )
      })}
    </ul>
  )
}

export default LanguageSwitcher