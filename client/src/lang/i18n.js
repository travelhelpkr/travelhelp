import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from "i18next-browser-languagedetector";
import Cache from 'i18next-localstorage-cache';

import translationEn from './translation.en';
import translationZh from './translation.zh';
import translationJa from './translation.ja';

const resources = {
    en: {
        translation: translationEn
    },
    zh: {
        translation: translationZh
    },
    ja: {
      translation: translationJa
  }
};

i18n
    .use(initReactI18next)
    .use(detector)
    .use(Cache)
    .init({
        resources,
        // lng: "en",
        fallbackLng: 'en',
        keySeparator: false, 
        interpolation: {
            escapeValue: false
        },
        Cache: {
          enabled: false,
          prefix: 'translation_',
          expirationTime: Infinity,
          Version: {},
          // defaultVersion: '',
        }
    });

export default i18n;