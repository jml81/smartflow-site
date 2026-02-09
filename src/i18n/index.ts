import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Finnish
import fiCommon from './locales/fi/common.json';
import fiHome from './locales/fi/home.json';
import fiFeatures from './locales/fi/features.json';
import fiSolutions from './locales/fi/solutions.json';
import fiSecurity from './locales/fi/security.json';
import fiStart from './locales/fi/start.json';
import fiContact from './locales/fi/contact.json';

// English
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enFeatures from './locales/en/features.json';
import enSolutions from './locales/en/solutions.json';
import enSecurity from './locales/en/security.json';
import enStart from './locales/en/start.json';
import enContact from './locales/en/contact.json';

const resources = {
  fi: {
    common: fiCommon,
    home: fiHome,
    features: fiFeatures,
    solutions: fiSolutions,
    security: fiSecurity,
    start: fiStart,
    contact: fiContact,
  },
  en: {
    common: enCommon,
    home: enHome,
    features: enFeatures,
    solutions: enSolutions,
    security: enSecurity,
    start: enStart,
    contact: enContact,
  },
} as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fi',
    defaultNS: 'common',
    ns: ['common', 'home', 'features', 'solutions', 'security', 'start', 'contact'],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      // URL path is primary — /fi/ or /en/
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
      lookupLocalStorage: 'brightflow-lang',
    },
  });

export default i18n;
export { resources };
