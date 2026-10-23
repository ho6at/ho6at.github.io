// La Chambre Noire: a client's private page after their session, where they keep their favourite photos and
// choose each one's style (a live preview of the photographer's own Lightroom looks). The style names stay in
// French in every language, like the package names.

type Lang = 'fr' | 'en' | 'fa';

export const looks = ['naturel', 'noir', 'pellicule'] as const;
export type Look = (typeof looks)[number];

export const chambre: Record<Lang, Record<string, string>> = {
  fr: {
    kicker: 'Votre chambre noire',
    hello: 'Bonjour {name}. Voici votre séance du {date}.',
    intro: 'Gardez vos photos préférées et choisissez le style de chacune. Nous les retouchons ensuite à la main, dans Lightroom.',
    demo: 'Démonstration : une séance d’exemple.',
    quota: '{n} / {total} photos incluses',
    extra: '+{n} en supplément · {price}',
    intensity: 'Intensité',
    keep: 'Garder',
    kept: 'Gardée',
    hold: 'Maintenez la photo pour voir l’original',
    note: 'Une remarque sur cette photo (facultatif)',
    honest: 'L’aperçu montre la couleur et l’ambiance. Les finitions (peau, détails, passants) sont faites à la main.',
    tap: 'Touchez une photo pour la voir en grand.',
    send: 'Envoyer à la chambre noire',
    letUs: 'Laisser le photographe choisir',
    subject: 'La Chambre Noire — sélection de {name}',
    mailIntro: 'Bonjour Luminoor,\n\nVoici ma sélection :',
    mailLetUs: 'Bonjour Luminoor,\n\nJe vous laisse choisir les photos et leur style.',
    close: 'Fermer',
    prev: 'Photo précédente',
    next: 'Photo suivante',
  },
  en: {
    kicker: 'Your darkroom',
    hello: 'Hello {name}. Here is your session from {date}.',
    intro: 'Keep your favourite photos and choose a style for each one. We then edit them by hand, in Lightroom.',
    demo: 'Demo: a sample session.',
    quota: '{n} of {total} photos included',
    extra: '+{n} extra · {price}',
    intensity: 'Strength',
    keep: 'Keep',
    kept: 'Kept',
    hold: 'Press and hold the photo to see the original',
    note: 'A note on this photo (optional)',
    honest: 'The preview shows colour and mood. Finishing touches (skin, details, passers-by) are done by hand.',
    tap: 'Tap a photo to see it full screen.',
    send: 'Send to the darkroom',
    letUs: 'Let the photographer choose',
    subject: 'La Chambre Noire — {name}’s selection',
    mailIntro: 'Hello Luminoor,\n\nHere is my selection:',
    mailLetUs: 'Hello Luminoor,\n\nI’ll let you choose the photos and their style.',
    close: 'Close',
    prev: 'Previous photo',
    next: 'Next photo',
  },
  fa: {
    kicker: 'تاریکخانه‌ی شما',
    hello: 'سلام {name}. این عکس‌های جلسه‌ی {date} شماست.',
    intro: 'عکس‌های محبوبتان را نگه دارید و برای هر کدام سبکی انتخاب کنید. بعد ما آن‌ها را با دست، در لایت‌روم، ادیت می‌کنیم.',
    demo: 'نسخه‌ی نمایشی: یک جلسه‌ی نمونه.',
    quota: '{n} از {total} عکسِ پکیج',
    extra: '{n} عکس اضافه · {price}',
    intensity: 'شدت',
    keep: 'نگه‌داشتن',
    kept: 'انتخاب شد',
    hold: 'برای دیدن نسخه‌ی اصلی، انگشتتان را روی عکس نگه دارید',
    note: 'یادداشتی برای این عکس (اختیاری)',
    honest: 'پیش‌نمایش رنگ و حال‌وهوا را نشان می‌دهد. جزئیات نهایی (پوست، ریزه‌کاری‌ها، رهگذرها) با دست انجام می‌شود.',
    tap: 'برای دیدن عکس در اندازه‌ی کامل، رویش بزنید.',
    send: 'ارسال به تاریکخانه',
    letUs: 'انتخاب با عکاس',
    subject: 'La Chambre Noire — انتخاب‌های {name}',
    mailIntro: 'سلام،\n\nانتخاب‌های من:',
    mailLetUs: 'سلام،\n\nانتخاب عکس‌ها و سبکشان را به خودتان می‌سپارم.',
    close: 'بستن',
    prev: 'عکس قبلی',
    next: 'عکس بعدی',
  },
};

export const lookText: Record<Lang, Record<Look, { name: string; text: string }>> = {
  fr: {
    naturel: { name: 'Naturel', text: 'Fidèle à la lumière du jour' },
    noir: { name: 'Noir', text: 'Notre noir et blanc' },
    pellicule: { name: 'Pellicule', text: 'La douceur d’un film' },
  },
  en: {
    naturel: { name: 'Naturel', text: 'True to the light of the day' },
    noir: { name: 'Noir', text: 'Our black and white' },
    pellicule: { name: 'Pellicule', text: 'The softness of film' },
  },
  fa: {
    naturel: { name: 'Naturel', text: 'وفادار به نور روز' },
    noir: { name: 'Noir', text: 'سیاه‌وسفیدِ امضای ما' },
    pellicule: { name: 'Pellicule', text: 'لطافت فیلم آنالوگ' },
  },
};

/** A sample session for the demo page; real sessions will come from the photographer's uploads. */
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
