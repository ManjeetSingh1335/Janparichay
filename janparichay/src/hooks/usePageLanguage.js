import {useCallback, useEffect, useState} from 'react'
import {useLanguage} from '../context/LanguageContext'
import englishTranslations from '../locales/en.json'

export function usePageLanguage() {

  const {langCode, languages}=useLanguage();
  const [pageLangCode, setPageLangCode]=useState(langCode);
  const [translations, setTranslations]=useState(englishTranslations);

  useEffect(()=>{
    setPageLangCode(langCode);
  }, [langCode]);

  useEffect(()=>{
    let isCurrent=true
    import(`../locales/${pageLangCode}.json`)
      .then(module=>{
        if(isCurrent) setTranslations(module.default)
      })
      .catch(()=>{
        if(isCurrent) setTranslations(englishTranslations)
      })

    return()=>{
      isCurrent=false
    }
  }, [pageLangCode]);

  const t=useCallback(
    key=>translations[key] ?? englishTranslations[key] ?? key,
    [translations]
  );

  return {t, pageLangCode, setPageLangCode, languages};
}