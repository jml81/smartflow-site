import { describe, it, expect } from 'vitest';
import {
  localePath,
  slugToRouteKey,
  switchLocalePath,
  isLocale,
  supportedLocales,
  defaultLocale,
} from './routes';

describe('routes', () => {
  describe('supportedLocales', () => {
    it('includes fi and en', () => {
      expect(supportedLocales).toContain('fi');
      expect(supportedLocales).toContain('en');
    });
  });

  describe('defaultLocale', () => {
    it('is fi', () => {
      expect(defaultLocale).toBe('fi');
    });
  });

  describe('isLocale', () => {
    it('returns true for supported locales', () => {
      expect(isLocale('fi')).toBe(true);
      expect(isLocale('en')).toBe(true);
    });

    it('returns false for unsupported locales', () => {
      expect(isLocale('de')).toBe(false);
      expect(isLocale('')).toBe(false);
    });
  });

  describe('localePath', () => {
    it('returns locale root for home route', () => {
      expect(localePath('fi', 'home')).toBe('/fi');
      expect(localePath('en', 'home')).toBe('/en');
    });

    it('returns Finnish slugs for fi locale', () => {
      expect(localePath('fi', 'features')).toBe('/fi/ominaisuudet');
      expect(localePath('fi', 'solutions')).toBe('/fi/ratkaisut');
      expect(localePath('fi', 'security')).toBe('/fi/turvallisuus-ja-saavutettavuus');
      expect(localePath('fi', 'start')).toBe('/fi/aloita');
      expect(localePath('fi', 'contact')).toBe('/fi/yhteystiedot');
    });

    it('returns English slugs for en locale', () => {
      expect(localePath('en', 'features')).toBe('/en/features');
      expect(localePath('en', 'solutions')).toBe('/en/solutions');
      expect(localePath('en', 'security')).toBe('/en/security-and-accessibility');
      expect(localePath('en', 'start')).toBe('/en/get-started');
      expect(localePath('en', 'contact')).toBe('/en/contact');
    });
  });

  describe('slugToRouteKey', () => {
    it('maps Finnish slugs to route keys', () => {
      expect(slugToRouteKey('ominaisuudet')).toBe('features');
      expect(slugToRouteKey('ratkaisut')).toBe('solutions');
      expect(slugToRouteKey('yhteystiedot')).toBe('contact');
    });

    it('maps English slugs to route keys', () => {
      expect(slugToRouteKey('features')).toBe('features');
      expect(slugToRouteKey('solutions')).toBe('solutions');
      expect(slugToRouteKey('contact')).toBe('contact');
    });

    it('maps empty string to home', () => {
      expect(slugToRouteKey('')).toBe('home');
    });

    it('returns undefined for unknown slugs', () => {
      expect(slugToRouteKey('unknown-page')).toBeUndefined();
    });
  });

  describe('switchLocalePath', () => {
    it('switches from Finnish to English', () => {
      expect(switchLocalePath('fi', 'en', 'ominaisuudet')).toBe('/en/features');
      expect(switchLocalePath('fi', 'en', 'ratkaisut')).toBe('/en/solutions');
    });

    it('switches from English to Finnish', () => {
      expect(switchLocalePath('en', 'fi', 'features')).toBe('/fi/ominaisuudet');
      expect(switchLocalePath('en', 'fi', 'solutions')).toBe('/fi/ratkaisut');
    });

    it('falls back to target locale root for unknown slugs', () => {
      expect(switchLocalePath('fi', 'en', 'unknown')).toBe('/en');
    });
  });
});
