import '@testing-library/jest-dom/vitest';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation resources directly (avoid side-effect init from i18n/index)
import fiCommon from './i18n/locales/fi/common.json';
import fiHome from './i18n/locales/fi/home.json';
import fiFeatures from './i18n/locales/fi/features.json';
import fiSolutions from './i18n/locales/fi/solutions.json';
import fiSecurity from './i18n/locales/fi/security.json';
import fiStart from './i18n/locales/fi/start.json';
import fiContact from './i18n/locales/fi/contact.json';

// Initialize i18n for tests with Finnish resources
void i18n.use(initReactI18next).init({
  lng: 'fi',
  fallbackLng: 'fi',
  defaultNS: 'common',
  ns: ['common', 'home', 'features', 'solutions', 'security', 'start', 'contact'],
  resources: {
    fi: {
      common: fiCommon,
      home: fiHome,
      features: fiFeatures,
      solutions: fiSolutions,
      security: fiSecurity,
      start: fiStart,
      contact: fiContact,
    },
  },
  interpolation: { escapeValue: false },
});

// Mock window.matchMedia for jsdom (used by use-reduced-motion hook)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock IntersectionObserver for jsdom (used by motion whileInView)
class MockIntersectionObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});
