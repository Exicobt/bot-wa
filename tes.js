const translate = require('translate-google');

// Tentukan bahasa sumber dan target
const sourceLang = 'en'; // Bahasa Inggris
const targetLang = 'id'; // Bahasa Indonesia

// Teks yang akan diterjemahkan
const textToTranslate = 'Hello, how are you?';

// Lakukan terjemahan
translate(textToTranslate, { from: sourceLang, to: targetLang })
  .then((translatedText) => {
    console.log(`Original Text: ${textToTranslate}`);
    console.log(`Translation: ${translatedText}`);
  })
  .catch((error) => {
    console.error('Error translating text:', error);
  });
