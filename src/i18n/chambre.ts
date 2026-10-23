// La Chambre Noire: a client's private pages after their session.
// 1. The contact sheet: unfinished proofs, the client circles favourites like on a film contact sheet and picks a
//    direction for each (colour, black and white, or the photographer's choice). Nothing is edited on the page:
//    the editing stays the photographer's handwork, in Lightroom.
// 2. The révélation: the finished photos, appearing like a print in the developer, signed.
// Direction names stay in French in every language, like the package names.

type Lang = 'fr' | 'en' | 'fa';

export const directions = ['couleur', 'noir', 'libre'] as const;
export type Direction = (typeof directions)[number];

export const chambre: Record<Lang, Record<string, string>> = {
  fr: {
    enter: 'Vous entrez dans la chambre noire.',
    lights: 'Allumer la table lumineuse',
    kicker: 'Votre chambre noire',
    hello: 'Bonjour {name}. Voici votre séance du {date}.',
    intro: 'Voici vos épreuves, telles qu’elles sortent de l’appareil. Entourez vos préférées et dites-nous dans quelle direction les emmener. Le reste se fait à la main.',
    craft: 'Chaque photo choisie, c’est environ vingt minutes de retouche à la main dans Lightroom : la lumière, la peau, les passants, la couleur.',
    demo: 'Démonstration : une séance d’exemple.',
    directionsTitle: 'Les directions',
    proof: 'Épreuve',
    frame: 'Vue',
    tap: 'Touchez un négatif pour le développer.',
    mark: 'Entourer',
    marked: 'Entourée',
    note: 'Une remarque sur cette photo (facultatif)',
    quota: '{n} / {total} photos incluses',
    extra: '+{n} en supplément · {price}',
    send: 'Envoyer à la chambre noire',
    letUs: 'Laisser le photographe choisir',
    subject: 'La Chambre Noire — sélection de {name}',
    mailIntro: 'Bonjour Luminoor,\n\nVoici ma sélection :',
    mailLetUs: 'Bonjour Luminoor,\n\nJe vous laisse choisir les photos et leur direction.',
    close: 'Fermer',
    prev: 'Photo précédente',
    next: 'Photo suivante',
    revealLink: 'Voir à quoi ressemble la livraison',
    revealKicker: 'Révélation',
    revealTitle: '{name}, vos photos sont prêtes.',
    revealText: 'Développées une par une, à la main.',
    signed: 'Retouchée à la main par Hojjat',
    back: 'Retour aux épreuves',
  },
  en: {
    enter: 'You are entering the darkroom.',
    lights: 'Turn on the light table',
    kicker: 'Your darkroom',
    hello: 'Hello {name}. Here is your session from {date}.',
    intro: 'These are your proofs, just as they came out of the camera. Circle your favourites and tell us which direction to take them in. The rest is done by hand.',
    craft: 'Each photo you choose is about twenty minutes of hand editing in Lightroom: the light, the skin, the passers-by, the colour.',
    demo: 'Demo: a sample session.',
    directionsTitle: 'The directions',
    proof: 'Proof',
    frame: 'Frame',
    tap: 'Tap a negative to develop it.',
    mark: 'Circle it',
    marked: 'Circled',
    note: 'A note on this photo (optional)',
    quota: '{n} of {total} photos included',
    extra: '+{n} extra · {price}',
    send: 'Send to the darkroom',
    letUs: 'Let the photographer choose',
    subject: 'La Chambre Noire — {name}’s selection',
    mailIntro: 'Hello Luminoor,\n\nHere is my selection:',
    mailLetUs: 'Hello Luminoor,\n\nI’ll let you choose the photos and their direction.',
    close: 'Close',
    prev: 'Previous photo',
    next: 'Next photo',
    revealLink: 'See what the delivery looks like',
    revealKicker: 'Révélation',
    revealTitle: '{name}, your photos are ready.',
    revealText: 'Developed one by one, by hand.',
    signed: 'Edited by hand by Hojjat',
    back: 'Back to the proofs',
  },
  fa: {
    enter: 'وارد تاریکخانه می‌شوید.',
    lights: 'روشن کردن میز نور',
    kicker: 'تاریکخانه‌ی شما',
    hello: 'سلام {name}. این عکس‌های جلسه‌ی {date} شماست.',
    intro: 'این‌ها نسخه‌های آزمایشی عکس‌های شماست، همان‌طور که از دوربین بیرون آمده‌اند. دور عکس‌های محبوبتان خط بکشید و بگویید هر کدام را به چه سمتی ببریم. بقیه‌اش کار دست ماست.',
    craft: 'هر عکسی که انتخاب می‌کنید، حدود بیست دقیقه ادیت دستی در لایت‌روم است: نور، پوست، رهگذرها، رنگ.',
    demo: 'نسخه‌ی نمایشی: یک جلسه‌ی نمونه.',
    directionsTitle: 'جهت‌ها',
    proof: 'Épreuve',
    frame: 'فریم',
    tap: 'روی هر نگاتیو بزنید تا ظاهر شود.',
    mark: 'خط دور عکس',
    marked: 'انتخاب شد',
    note: 'یادداشتی برای این عکس (اختیاری)',
    quota: '{n} از {total} عکسِ پکیج',
    extra: '{n} عکس اضافه · {price}',
    send: 'ارسال به تاریکخانه',
    letUs: 'انتخاب با عکاس',
    subject: 'La Chambre Noire — انتخاب‌های {name}',
    mailIntro: 'سلام،\n\nانتخاب‌های من:',
    mailLetUs: 'سلام،\n\nانتخاب عکس‌ها و جهتشان را به خودتان می‌سپارم.',
    close: 'بستن',
    prev: 'عکس قبلی',
    next: 'عکس بعدی',
    revealLink: 'ببینید تحویل نهایی چه شکلی است',
    revealKicker: 'Révélation',
    revealTitle: '{name}، عکس‌هایتان آماده‌اند.',
    revealText: 'یکی‌یکی، با دست، ظاهر شده‌اند.',
    signed: 'ادیت دستیِ حجت',
    back: 'بازگشت به نسخه‌های آزمایشی',
  },
};

export const directionText: Record<Lang, Record<Direction, { name: string; text: string }>> = {
  fr: {
    couleur: { name: 'Couleur', text: 'Nos couleurs de Paris, chaudes et douces' },
    noir: { name: 'Noir', text: 'Notre noir et blanc, contrasté' },
    libre: { name: 'Libre', text: 'Le photographe choisit' },
  },
  en: {
    couleur: { name: 'Couleur', text: 'Our Paris colours, warm and soft' },
    noir: { name: 'Noir', text: 'Our black and white, with contrast' },
    libre: { name: 'Libre', text: 'The photographer decides' },
  },
  fa: {
    couleur: { name: 'Couleur', text: 'رنگ‌های پاریسیِ ما، گرم و نرم' },
    noir: { name: 'Noir', text: 'سیاه‌وسفیدِ ما، پرکنتراست' },
    libre: { name: 'Libre', text: 'انتخاب با عکاس' },
  },
};

/** A finished example of each direction, from the portfolio (photos in public/photos) */
export const directionExample: Record<Direction, string> = {
  couleur: '/photos/night-hat-480.webp',
  noir: '/photos/couple-night-run-480.webp',
  libre: '/photos/regrattier-480.webp',
};

/** A sample session for the demo pages; real sessions will come from the photographer's uploads. */
export const demoSession = {
  id: 'demo',
  name: 'Sara',
  date: '2026-10-18',
  quota: 3,
  photos: [
    { id: 'cafe', file: 'DSC_4990', w: 4032, h: 6048 },
    { id: 'mist', file: 'DSC_3366', w: 4032, h: 6048 },
    { id: 'lamp', file: 'DSC_2799', w: 3522, h: 5283 },
    { id: 'window', file: 'D912EE8F', w: 1536, h: 2304 },
    { id: 'eiffel', file: '7B062862', w: 941, h: 1672 },
  ],
};
