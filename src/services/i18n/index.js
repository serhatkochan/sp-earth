import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from 'locales/enUS';
import trTR from 'locales/trTR';
i18n.use(initReactI18next).init({
  resources: {
    enUS: {
      translation: { ...enUS },
    },
    trTR: {
      translation: { ...trTR },
    },
  },
  // debug: true,
  lng: localStorage.getItem('lng') ? localStorage.getItem('lng') : 'trTR',
  loadPath: 'locales/{{lng}}/{{ns}}.json',
});

export default i18n;
