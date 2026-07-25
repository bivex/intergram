export const translations = {
  en: {
    titleClosed: 'Click to chat!',
    titleOpen: 'Let\'s chat!',
    introMessage: 'Hello! How can we help you?',
    autoResponse: 'Looking for the first available admin (it might take a minute)...',
    autoNoResponse: 'It seems no one is available right now. Please leave your contact details and we will get back to you soon!',
    placeholderText: 'Send a message...',
    visitorPronoun: 'You'
  },
  uk: {
    titleClosed: 'Чат з нами',
    titleOpen: 'Напишіть нам!',
    introMessage: 'Вітаємо! Чим ми можемо вам допомогти?',
    autoResponse: 'Шукаємо вільного оператора (це може зайняти хвилину)...',
    autoNoResponse: 'Зараз всі оператори зайняті. Залиште ваші контакти, і ми зв’яжемося з вами найближчим часом!',
    placeholderText: 'Напишіть повідомлення...',
    visitorPronoun: 'Ви'
  },
  ru: {
    titleClosed: 'Написать нам',
    titleOpen: 'Чат поддержки',
    introMessage: 'Здравствуйте! Чем мы можем вам помочь?',
    autoResponse: 'Ищем свободного оператора (это может занять минуту)...',
    autoNoResponse: 'Сейчас все операторы заняты. Оставьте ваши контакты, и мы свяжемся с вами в ближайшее время!',
    placeholderText: 'Введите сообщение...',
    visitorPronoun: 'Вы'
  },
  es: {
    titleClosed: '¡Haz clic para chatear!',
    titleOpen: '¡Hablemos!',
    introMessage: '¡Hola! ¿En qué podemos ayudarte?',
    autoResponse: 'Buscando un agente disponible...',
    autoNoResponse: 'Parece que no hay nadie disponible en este momento. Déjanos tus datos de contacto.',
    placeholderText: 'Escribe un mensaje...',
    visitorPronoun: 'Tú'
  },
  de: {
    titleClosed: 'Chat starten!',
    titleOpen: 'Lass uns chatten!',
    introMessage: 'Hallo! Wie können wir Ihnen helfen?',
    autoResponse: 'Suche nach einem verfügbaren Mitarbeiter...',
    autoNoResponse: 'Im Moment ist niemand verfügbar. Bitte hinterlassen Sie Ihre Kontaktdaten!',
    placeholderText: 'Nachricht schreiben...',
    visitorPronoun: 'Sie'
  }
};

export function getI18nConfiguration(customizations = {}) {
  const lang = customizations.lang || 'en';
  const pack = translations[lang] || translations.en;
  return {
    ...pack,
    ...customizations
  };
}
