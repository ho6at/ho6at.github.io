// Dedicated pages for the main searches: Paris photoshoot, street style, proposal, Eiffel Tower, couples.
// Each topic exists in French, English and Persian; `slug` is the page's address under its language.
// Facts (packages, prices, FAQ answers, places) match the home page.

export type LandingId = 'paris' | 'street' | 'proposal' | 'eiffel' | 'couple';
type Lang = 'fr' | 'en' | 'fa';

export interface Landing {
  slug: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  points: { t: string; d: string }[];
  spotsTitle: string;
  spots: { name: string; when: string; note: string }[];
  packages: string[]; // package ids from i18n/<lang>.ts, shown with their real prices
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
}

export const landingUi: Record<Lang, Record<string, string>> = {
  fr: {
    home: 'Accueil',
    book: 'Réserver une séance',
    bookShort: 'Réserver',
    packagesTitle: 'Les formules conseillées',
    choose: 'Choisir cette formule',
    faqTitle: 'Questions fréquentes',
    guides: 'Séances photo à Paris',
    allPackages: 'Voir toutes les formules',
  },
  en: {
    home: 'Home',
    book: 'Book a session',
    bookShort: 'Book',
    packagesTitle: 'Recommended packages',
    choose: 'Choose this package',
    faqTitle: 'Questions',
    guides: 'Photoshoots in Paris',
    allPackages: 'See all packages',
  },
  fa: {
    home: 'خانه',
    book: 'رزرو عکاسی',
    bookShort: 'رزرو',
    packagesTitle: 'پکیج‌های پیشنهادی',
    choose: 'انتخاب این پکیج',
    faqTitle: 'پرسش‌های پرتکرار',
    guides: 'عکاسی در پاریس',
    allPackages: 'دیدن همه‌ی پکیج‌ها',
  },
};

export const landings: Record<LandingId, Record<Lang, Landing>> = {
  paris: {
    fr: {
      slug: 'shooting-photo-paris',
      title: 'Shooting photo à Paris — Photographe pour votre séjour | Luminoor',
      description:
        'Shooting photo à Paris avec un photographe local : les plus beaux lieux, la bonne lumière et des poses guidées. Seul, à deux ou entre amis. Dès 220 €.',
      h1: 'Shooting photo à Paris',
      lead: 'De passage à Paris ? Rapportez autre chose que des selfies : un photographe local, les plus beaux lieux de la ville et la lumière qui va avec.',
      points: [
        { t: 'Un photographe qui connaît Paris', d: 'On choisit les lieux et l’heure selon la lumière, pour des photos qui ne ressemblent pas à celles de tout le monde.' },
        { t: 'Seul, à deux ou entre amis', d: 'Portrait de voyage, couple, famille ou amis : la séance s’adapte à vous.' },
        { t: 'De une à cinq heures', d: 'Une heure pour quelques images fortes, jusqu’à cinq heures pour un vrai reportage de votre séjour.' },
        { t: 'En français, anglais ou persan', d: 'On vous guide dans votre langue, du premier message à la dernière photo.' },
      ],
      spotsTitle: 'Nos lieux à Paris',
      spots: [
        { name: 'Trocadéro', when: 'Lever du soleil', note: 'La tour Eiffel sans la foule.' },
        { name: 'Palais-Royal', when: 'En journée', note: 'Colonnes de Buren et arcades, un décor graphique.' },
        { name: 'Pont Alexandre III', when: 'Heure dorée', note: 'Dorures, Seine et Invalides en fond.' },
        { name: 'Montmartre', when: 'Heure bleue', note: 'Ruelles pavées et Paris qui s’allume en contrebas.' },
      ],
      packages: ['minimal', 'classic', 'signature'],
      faq: [
        { q: 'Je ne sais pas poser.', a: 'Presque personne ne sait. On vous dit quoi faire, où regarder et quand marcher.' },
        { q: 'Comment se passe le paiement ?', a: 'Un acompte de 30 % réserve la date. Le reste est réglé le jour de la séance.' },
        { q: 'Que se passe-t-il s’il pleut ?', a: 'On déplace la séance gratuitement à une autre date de votre séjour, ou on vous propose des lieux couverts.' },
      ],
      ctaTitle: 'Gardez un souvenir de Paris',
      ctaText: 'Dites-nous vos dates et ce que vous aimeriez. On vous répond sous 24 heures.',
    },
    en: {
      slug: 'paris-photoshoot',
      title: 'Paris Photoshoot — Vacation Photographer in Paris | Luminoor',
      description:
        'Paris photoshoot with a local photographer: the most beautiful spots, the right light and guided posing. Solo, couples or friends. From €220.',
      h1: 'Paris photoshoot',
      lead: 'Visiting Paris? Take home more than selfies: a local photographer, the city’s most beautiful places, and the light to match.',
      points: [
        { t: 'A photographer who knows Paris', d: 'We choose the places and the time by the light, for photos that don’t look like everyone else’s.' },
        { t: 'Solo, couples or friends', d: 'Travel portraits, couples, family or friends: the session adapts to you.' },
        { t: 'One to five hours', d: 'One hour for a few strong images, up to five hours for a real story of your trip.' },
        { t: 'In English, French or Persian', d: 'We guide you in your language, from the first message to the last photo.' },
      ],
      spotsTitle: 'Our places in Paris',
      spots: [
        { name: 'Trocadéro', when: 'Sunrise', note: 'The Eiffel Tower without the crowds.' },
        { name: 'Palais-Royal', when: 'Daytime', note: 'Buren columns and arcades, a graphic backdrop.' },
        { name: 'Pont Alexandre III', when: 'Golden hour', note: 'Gilded statues, the Seine and Les Invalides behind.' },
        { name: 'Montmartre', when: 'Blue hour', note: 'Cobbled lanes and Paris lighting up below.' },
      ],
      packages: ['minimal', 'classic', 'signature'],
      faq: [
        { q: 'I don’t know how to pose.', a: 'Almost nobody does. We tell you what to do, where to look and when to walk.' },
        { q: 'How does payment work?', a: 'A 30% deposit holds the date. The rest is paid on the day of the shoot.' },
        { q: 'What if it rains?', a: 'We move the session to another day of your trip for free, or suggest covered locations.' },
      ],
      ctaTitle: 'Keep a piece of Paris',
      ctaText: 'Send us your dates and what you have in mind. We reply within 24 hours.',
    },
    fa: {
      slug: 'akasi-dar-paris',
      title: 'عکاسی در پاریس | عکاس فارسی‌زبان برای سفر | لومینور',
      description:
        'عکاسی در پاریس با عکاس فارسی‌زبان: زیباترین لوکیشن‌ها، بهترین نور و راهنمایی در ژست‌ها. تنها، دونفره یا با دوستان. از ۲۲۰ یورو.',
      h1: 'عکاسی در پاریس',
      lead: 'سفر پاریس دارید؟ به‌جای سلفی، با عکس‌هایی برگردید که یک عکاس محلی در زیباترین جاهای شهر و در بهترین نور گرفته.',
      points: [
        { t: 'عکاسی که پاریس را می‌شناسد', d: 'لوکیشن و ساعت را بر اساس نور انتخاب می‌کنیم، برای عکس‌هایی که شبیه عکس‌های همه نیست.' },
        { t: 'تنها، دونفره یا با دوستان', d: 'پرتره‌ی سفر، زوج، خانواده یا دوستان؛ جلسه با شما هماهنگ می‌شود.' },
        { t: 'از یک تا پنج ساعت', d: 'یک ساعت برای چند عکس ماندگار، تا پنج ساعت برای روایت کامل سفرتان.' },
        { t: 'به فارسی', d: 'از اولین پیام تا آخرین عکس، به زبان خودتان راهنمایی‌تان می‌کنیم.' },
      ],
      spotsTitle: 'لوکیشن‌های ما در پاریس',
      spots: [
        { name: 'تروکادرو', when: 'طلوع', note: 'برج ایفل بدون شلوغی.' },
        { name: 'پاله‌رویال', when: 'روز', note: 'ستون‌های بورن و طاق‌ها؛ پس‌زمینه‌ای گرافیکی.' },
        { name: 'پل الکساندر سوم', when: 'ساعت طلایی', note: 'مجسمه‌های طلایی، رود سن و انولید در پس‌زمینه.' },
        { name: 'مونمارتر', when: 'ساعت آبی', note: 'کوچه‌های سنگ‌فرش و پاریسی که پایین تپه روشن می‌شود.' },
      ],
      packages: ['minimal', 'classic', 'signature'],
      faq: [
        { q: 'اصلاً بلد نیستم ژست بگیرم.', a: 'نگران نباشید؛ کمتر کسی بلد است. قدم‌به‌قدم می‌گوییم کجا بایستید، کجا را نگاه کنید و کی راه بروید.' },
        { q: 'پرداخت چطور انجام می‌شود؟', a: 'با پرداخت ۳۰٪ بیعانه، روزتان رزرو می‌شود و باقی مبلغ را روز عکاسی پرداخت می‌کنید.' },
        { q: 'اگر هوا بارانی باشد چه؟', a: 'جلسه را بی‌هیچ هزینه‌ای به روز دیگری از سفرتان منتقل می‌کنیم، یا لوکیشن‌های سرپوشیده پیشنهاد می‌دهیم.' },
      ],
      ctaTitle: 'یک یادگاری از پاریس',
      ctaText: 'تاریخ سفر و ایده‌هایتان را بفرستید؛ تا ۲۴ ساعت آینده پاسخ می‌دهیم.',
    },
  },

  street: {
    fr: {
      slug: 'photographe-street-style-paris',
      title: 'Séance photo street style à Paris — Photographe | Luminoor',
      description:
        'Séance photo street style à Paris : cafés, ruelles et coins historiques, en noir et blanc, en couleur ou en style cinéma. Portraits naturels, dès 220 €.',
      h1: 'Séance photo street style à Paris',
      lead: 'Chaque rue a son rythme. On marche avec vous dans les cafés, les ruelles et les coins historiques, et on cadre ce qui est vrai.',
      points: [
        { t: 'Monochrome Moments', d: 'Des portraits en noir et blanc, suspendus dans le temps, entre lumière, mouvement et émotion.' },
        { t: 'Chromatic Walks', d: 'La ville devient votre podium : votre style, en couleur, sur les décors iconiques de Paris.' },
        { t: 'Cinematic Echoes', d: 'Chaque image composée comme une scène de film : ambiance, couleurs et mouvement.' },
        { t: 'Timeless Portraits', d: 'Une lumière naturelle et un rythme plus lent, pour des portraits à l’élégance des vieux films.' },
      ],
      spotsTitle: 'Nos rues préférées',
      spots: [
        { name: 'Le Marais', when: 'Le matin', note: 'Ruelles, petites places et cafés à l’angle.' },
        { name: 'Saint-Germain', when: 'L’après-midi', note: 'Terrasses de café et façades parisiennes.' },
        { name: 'Palais-Royal', when: 'En journée', note: 'Arcades et colonnes de Buren, idéal pour un look affirmé.' },
        { name: 'Montmartre', when: 'Heure bleue', note: 'Escaliers, pavés et lampadaires.' },
      ],
      packages: ['minimal', 'signature'],
      faq: [
        { q: 'Faut-il avoir un style particulier ?', a: 'Non. On part de vos tenues et de votre allure, et on choisit les rues qui leur vont.' },
        { q: 'Je ne sais pas poser.', a: 'Presque personne ne sait. On vous dit quoi faire, où regarder et quand marcher.' },
        { q: 'Que se passe-t-il s’il pleut ?', a: 'On déplace la séance gratuitement à une autre date de votre séjour, ou on vous propose des lieux couverts.' },
      ],
      ctaTitle: 'Faites de Paris votre podium',
      ctaText: 'Dites-nous la date et le style qui vous ressemble. On vous répond sous 24 heures.',
    },
    en: {
      slug: 'paris-street-style-photoshoot',
      title: 'Paris Street Style Photoshoot — Street Photographer | Luminoor',
      description:
        'Street style photoshoot in Paris: cafés, side streets and historic corners, in black and white, colour or cinematic style. Natural portraits from €220.',
      h1: 'Street style photoshoot in Paris',
      lead: 'Every street has a rhythm. We walk with you through cafés, side streets and historic corners, and frame what is real.',
      points: [
        { t: 'Monochrome Moments', d: 'Black and white portraits, suspended in time, made of light, motion and emotion.' },
        { t: 'Chromatic Walks', d: 'The city becomes your runway: your style, in colour, against the icons of Paris.' },
        { t: 'Cinematic Echoes', d: 'Every frame composed like a film scene: mood, colour and subtle motion.' },
        { t: 'Timeless Portraits', d: 'Natural light and a slower rhythm, for portraits with the elegance of old films.' },
      ],
      spotsTitle: 'Our favourite streets',
      spots: [
        { name: 'Le Marais', when: 'Morning', note: 'Side streets, small squares and corner cafés.' },
        { name: 'Saint-Germain', when: 'Afternoon', note: 'Café terraces and Paris façades.' },
        { name: 'Palais-Royal', when: 'Daytime', note: 'Arcades and Buren columns, ideal for a bold look.' },
        { name: 'Montmartre', when: 'Blue hour', note: 'Stairways, cobblestones and street lamps.' },
      ],
      packages: ['minimal', 'signature'],
      faq: [
        { q: 'Do I need a particular style?', a: 'No. We start from your outfits and the way you carry them, and choose the streets that suit them.' },
        { q: 'I don’t know how to pose.', a: 'Almost nobody does. We tell you what to do, where to look and when to walk.' },
        { q: 'What if it rains?', a: 'We move the session to another day of your trip for free, or suggest covered locations.' },
      ],
      ctaTitle: 'Make Paris your runway',
      ctaText: 'Send us the date and the style that feels like you. We reply within 24 hours.',
    },
    fa: {
      slug: 'akasi-khiabani-paris',
      title: 'عکاسی خیابانی در پاریس | استریت‌استایل | لومینور',
      description:
        'عکاسی خیابانی و استریت‌استایل در پاریس: کافه‌ها، کوچه‌ها و گوشه‌های تاریخی، سیاه‌وسفید، رنگی یا سینمایی. پرتره‌های طبیعی، از ۲۲۰ یورو.',
      h1: 'عکاسی خیابانی در پاریس',
      lead: 'هر خیابان ریتم خودش را دارد. در کافه‌ها، کوچه‌ها و گوشه‌های تاریخی کنارتان قدم می‌زنیم و لحظه‌های واقعی را قاب می‌گیریم.',
      points: [
        { t: 'Monochrome Moments', d: 'پرتره‌های سیاه‌وسفید، معلق در زمان، از جنس نور، حرکت و احساس.' },
        { t: 'Chromatic Walks', d: 'شهر می‌شود سکوی نمایش شما: استایل‌تان، رنگی، در قاب نمادهای پاریس.' },
        { t: 'Cinematic Echoes', d: 'هر قاب مثل یک صحنه‌ی فیلم: فضا، رنگ و حرکت.' },
        { t: 'Timeless Portraits', d: 'نور طبیعی و ریتمی آرام‌تر، برای پرتره‌هایی به ظرافت فیلم‌های قدیمی.' },
      ],
      spotsTitle: 'خیابان‌های محبوب ما',
      spots: [
        { name: 'له‌ماره', when: 'صبح', note: 'کوچه‌ها، میدان‌های کوچک و کافه‌های سر کوچه.' },
        { name: 'سن‌ژرمن', when: 'بعدازظهر', note: 'تراس کافه‌ها و نماهای پاریسی.' },
        { name: 'پاله‌رویال', when: 'روز', note: 'طاق‌ها و ستون‌های بورن، عالی برای استایل‌های جسورانه.' },
        { name: 'مونمارتر', when: 'ساعت آبی', note: 'پله‌ها، سنگ‌فرش‌ها و چراغ‌های خیابان.' },
      ],
      packages: ['minimal', 'signature'],
      faq: [
        { q: 'باید استایل خاصی داشته باشم؟', a: 'نه. از لباس‌ها و حال‌وهوای خودتان شروع می‌کنیم و خیابان‌هایی را انتخاب می‌کنیم که به آن بیاید.' },
        { q: 'اصلاً بلد نیستم ژست بگیرم.', a: 'نگران نباشید؛ کمتر کسی بلد است. قدم‌به‌قدم می‌گوییم کجا بایستید، کجا را نگاه کنید و کی راه بروید.' },
        { q: 'اگر هوا بارانی باشد چه؟', a: 'جلسه را بی‌هیچ هزینه‌ای به روز دیگری از سفرتان منتقل می‌کنیم، یا لوکیشن‌های سرپوشیده پیشنهاد می‌دهیم.' },
      ],
      ctaTitle: 'پاریس را سکوی نمایش خودتان کنید',
      ctaText: 'تاریخ و استایلی که به شما می‌آید را بفرستید؛ تا ۲۴ ساعت آینده پاسخ می‌دهیم.',
    },
  },

  proposal: {
    fr: {
      slug: 'photographe-demande-en-mariage-paris',
      title: 'Photographe demande en mariage à Paris — Photos surprise | Luminoor',
      description:
        'Photographe pour votre demande en mariage à Paris : on choisit le lieu avec vous, on reste discrets et on capture le moment, puis une séance à deux.',
      h1: 'Photographe pour votre demande en mariage à Paris',
      lead: 'Vous posez la question, on s’occupe du reste : le lieu, la lumière, et des photos du moment exact où votre partenaire dit oui.',
      points: [
        { t: 'Tout est préparé avant', d: 'Un appel pour choisir ensemble le lieu, l’heure et le signal. Le jour venu, chacun sait où se placer.' },
        { t: 'On reste invisibles', d: 'Le photographe se fond parmi les passants jusqu’au moment de la demande.' },
        { t: 'Le moment, puis la séance', d: 'On capture la surprise, puis on enchaîne avec une séance à deux dans les rues autour.' },
        { t: 'Des photos et un film', d: 'Avec la formule Cinéstyle, vous recevez aussi une vidéo cinématographique d’une minute.' },
      ],
      spotsTitle: 'Où faire sa demande à Paris',
      spots: [
        { name: 'Trocadéro', when: 'Au lever du soleil', note: 'La tour Eiffel en face, sans la foule de la journée.' },
        { name: 'Pont Alexandre III', when: 'Heure dorée', note: 'Dorures, Seine et Invalides : le décor le plus romantique de Paris.' },
        { name: 'Montmartre', when: 'Heure bleue', note: 'Des ruelles calmes et tout Paris qui s’allume en contrebas.' },
        { name: 'Square du Vert-Galant', when: 'Fin d’après-midi', note: 'La pointe de l’île de la Cité, au ras de l’eau, plus intime.' },
      ],
      packages: ['signature', 'cinestyle'],
      faq: [
        {
          q: 'Comment se passe la surprise ?',
          a: 'On fixe ensemble un point de rendez-vous et un signal. Le photographe est déjà sur place, discret, et commence à photographier dès votre arrivée.',
        },
        {
          q: 'Et s’il pleut ce jour-là ?',
          a: 'On prévoit un lieu couvert de secours, comme les arcades du Palais-Royal, et on décide ensemble le matin même.',
        },
        {
          q: 'Combien de temps faut-il prévoir ?',
          a: 'Comptez quatre à cinq heures avec les formules Signature et Cinéstyle : l’installation sur place, la demande, puis la séance à deux.',
        },
      ],
      ctaTitle: 'Racontez-nous votre projet',
      ctaText: 'Dites-nous la date et le lieu dont vous rêvez. On vous répond sous 24 heures.',
    },
    en: {
      slug: 'paris-proposal-photographer',
      title: 'Paris Proposal Photographer — Surprise Proposal Photos | Luminoor',
      description:
        'Proposal photographer in Paris: we choose the spot with you, stay out of sight and capture the moment, then a couple session right after.',
      h1: 'Proposal photographer in Paris',
      lead: 'You ask the question, we take care of the rest: the place, the light, and photos of the exact moment your partner says yes.',
      points: [
        { t: 'Planned in advance', d: 'One call to choose the spot, the time and the signal together. On the day, everyone knows where to stand.' },
        { t: 'Out of sight', d: 'The photographer blends in with passers-by until the moment you ask.' },
        { t: 'The moment, then the session', d: 'We capture the surprise, then carry on with a couple session in the streets around.' },
        { t: 'Photos and a film', d: 'With the Cinéstyle package, you also get a one-minute cinematic video.' },
      ],
      spotsTitle: 'Where to propose in Paris',
      spots: [
        { name: 'Trocadéro', when: 'At sunrise', note: 'The Eiffel Tower in front of you, without the daytime crowds.' },
        { name: 'Pont Alexandre III', when: 'Golden hour', note: 'Gilded statues, the Seine and Les Invalides: the most romantic setting in Paris.' },
        { name: 'Montmartre', when: 'Blue hour', note: 'Quiet lanes, and all of Paris lighting up below.' },
        { name: 'Square du Vert-Galant', when: 'Late afternoon', note: 'The tip of the Île de la Cité, right by the water, more intimate.' },
      ],
      packages: ['signature', 'cinestyle'],
      faq: [
        {
          q: 'How does the surprise work?',
          a: 'We agree on a meeting point and a signal. The photographer is already there, out of sight, and starts shooting as soon as you arrive.',
        },
        {
          q: 'What if it rains that day?',
          a: 'We plan a covered backup spot, such as the Palais-Royal arcades, and decide together that morning.',
        },
        {
          q: 'How much time should we plan?',
          a: 'Four to five hours with the Signature and Cinéstyle packages: setting up on site, the proposal, then the couple session.',
        },
      ],
      ctaTitle: 'Tell us about your plan',
      ctaText: 'Send us the date and the place you have in mind. We reply within 24 hours.',
    },
    fa: {
      slug: 'akas-khastegari-paris',
      title: 'عکاس خواستگاری در پاریس | عکاسی غافلگیرانه | لومینور',
      description:
        'عکاس خواستگاری در پاریس: لوکیشن را با هم انتخاب می‌کنیم، دور از چشم می‌مانیم و لحظه‌ی «بله» را ثبت می‌کنیم؛ بعد هم یک جلسه‌ی عکاسی دونفره.',
      h1: 'عکاس خواستگاری در پاریس',
      lead: 'شما فقط سؤال را بپرسید؛ بقیه با ما: لوکیشن، نور، و عکس‌هایی از همان لحظه‌ای که «بله» را می‌شنوید.',
      points: [
        { t: 'همه‌چیز از قبل آماده است', d: 'در یک تماس، لوکیشن، ساعت و علامت را با هم مشخص می‌کنیم. روز موعود هرکس می‌داند کجا بایستد.' },
        { t: 'دور از چشم', d: 'عکاس تا لحظه‌ی خواستگاری بین رهگذرها گم می‌شود.' },
        { t: 'اول آن لحظه، بعد جلسه‌ی عکاسی', d: 'غافلگیری را ثبت می‌کنیم و بعد در خیابان‌های اطراف یک جلسه‌ی عکاسی دونفره ادامه می‌دهیم.' },
        { t: 'عکس و فیلم', d: 'با پکیج Cinéstyle، یک ویدیوی سینمایی یک‌دقیقه‌ای هم هدیه می‌گیرید.' },
      ],
      spotsTitle: 'کجای پاریس خواستگاری کنیم؟',
      spots: [
        { name: 'تروکادرو', when: 'هنگام طلوع', note: 'برج ایفل روبه‌روی شما، بدون شلوغی روز.' },
        { name: 'پل الکساندر سوم', when: 'ساعت طلایی', note: 'مجسمه‌های طلایی، رود سن و گنبد انولید؛ رمانتیک‌ترین قاب پاریس.' },
        { name: 'مونمارتر', when: 'ساعت آبی', note: 'کوچه‌های آرام و پاریسی که پایین تپه روشن می‌شود.' },
        { name: 'میدان ور-گالان', when: 'عصر', note: 'نوک جزیره‌ی سیته، کنار آب؛ دنج‌تر و خصوصی‌تر.' },
      ],
      packages: ['signature', 'cinestyle'],
      faq: [
        {
          q: 'غافلگیری چطور انجام می‌شود؟',
          a: 'یک محل قرار و یک علامت را با هم مشخص می‌کنیم. عکاس از قبل آنجاست، دور از چشم، و از لحظه‌ی رسیدن شما عکاسی را شروع می‌کند.',
        },
        {
          q: 'اگر آن روز باران ببارد چه؟',
          a: 'یک لوکیشن سرپوشیده‌ی جایگزین، مثل طاق‌های پاله‌رویال، در نظر می‌گیریم و صبح همان روز با هم تصمیم می‌گیریم.',
        },
        {
          q: 'چقدر زمان لازم است؟',
          a: 'با پکیج‌های Signature و Cinéstyle چهار تا پنج ساعت: آماده شدن در محل، خواستگاری، و بعد جلسه‌ی عکاسی دونفره.',
        },
      ],
      ctaTitle: 'از برنامه‌تان برایمان بگویید',
      ctaText: 'تاریخ و جایی که در ذهن دارید را بفرستید؛ تا ۲۴ ساعت آینده پاسخ می‌دهیم.',
    },
  },

  eiffel: {
    fr: {
      slug: 'seance-photo-tour-eiffel',
      title: 'Séance photo Tour Eiffel — Photographe à Paris | Luminoor',
      description:
        'Séance photo devant la Tour Eiffel avec un photographe à Paris : Trocadéro au lever du soleil, Bir-Hakeim, rue de l’Université. Dès 220 €.',
      h1: 'Séance photo à la Tour Eiffel',
      lead: 'Les plus beaux points de vue sur la tour, à la bonne heure, avec un photographe qui vous guide pour chaque pose.',
      points: [
        { t: 'Sans la foule', d: 'On commence tôt : au lever du soleil, le Trocadéro est presque vide.' },
        { t: 'Plus qu’une carte postale', d: 'Rues haussmanniennes, ponts et cafés avec la tour en fond : des images bien à vous.' },
        { t: 'Guidés du début à la fin', d: 'On vous dit où vous placer, où regarder et quand marcher. Aucune expérience nécessaire.' },
        { t: 'Toutes les photos', d: 'Photos retouchées et toutes les photos brutes, livrées en galerie privée.' },
      ],
      spotsTitle: 'Les meilleurs points de vue',
      spots: [
        { name: 'Trocadéro', when: 'Lever du soleil', note: 'La vue classique, face à la tour, avant l’arrivée des visiteurs.' },
        { name: 'Pont de Bir-Hakeim', when: 'Heure dorée', note: 'Colonnes de métal et métro aérien, la tour à quelques pas.' },
        { name: 'Rue de l’Université', when: 'Le matin', note: 'La tour au bout d’une rue parisienne, l’une des photos les plus recherchées.' },
        { name: 'Champ-de-Mars', when: 'Le soir', note: 'Après la tombée de la nuit, la tour scintille cinq minutes à chaque heure pile.' },
      ],
      packages: ['classic', 'signature'],
      faq: [
        {
          q: 'Quelle est la meilleure heure ?',
          a: 'Le lever du soleil, pour la lumière douce et l’absence de foule. L’heure dorée, en fin de journée, est le deuxième meilleur choix.',
        },
        { q: 'Je ne sais pas poser.', a: 'Presque personne ne sait. On vous dit quoi faire, où regarder et quand marcher.' },
        {
          q: 'Que se passe-t-il s’il pleut ?',
          a: 'On déplace la séance gratuitement à une autre date de votre séjour, ou on vous propose des lieux couverts.',
        },
      ],
      ctaTitle: 'Choisissez votre matin à Paris',
      ctaText: 'Dites-nous vos dates de séjour. On vous répond sous 24 heures avec les meilleures heures de lumière.',
    },
    en: {
      slug: 'eiffel-tower-photoshoot',
      title: 'Eiffel Tower Photoshoot — Paris Photographer | Luminoor',
      description:
        'Eiffel Tower photoshoot with a Paris photographer: Trocadéro at sunrise, Bir-Hakeim, Rue de l’Université. Guided posing, from €220.',
      h1: 'Eiffel Tower photoshoot',
      lead: 'The best views of the tower, at the right hour, with a photographer who guides you through every pose.',
      points: [
        { t: 'Without the crowds', d: 'We start early: at sunrise, the Trocadéro is almost empty.' },
        { t: 'More than a postcard', d: 'Haussmann streets, bridges and cafés with the tower behind you: pictures that are truly yours.' },
        { t: 'Guided all the way', d: 'We tell you where to stand, where to look and when to walk. No experience needed.' },
        { t: 'Every photo', d: 'Edited photos and all raw photos, delivered in a private gallery.' },
      ],
      spotsTitle: 'The best viewpoints',
      spots: [
        { name: 'Trocadéro', when: 'Sunrise', note: 'The classic view, facing the tower, before the visitors arrive.' },
        { name: 'Pont de Bir-Hakeim', when: 'Golden hour', note: 'Iron columns and the elevated metro, with the tower close by.' },
        { name: 'Rue de l’Université', when: 'Morning', note: 'The tower at the end of a Paris street, one of the most sought-after shots.' },
        { name: 'Champ de Mars', when: 'Evening', note: 'After dark, the tower sparkles for five minutes at the top of every hour.' },
      ],
      packages: ['classic', 'signature'],
      faq: [
        {
          q: 'What is the best time?',
          a: 'Sunrise, for soft light and no crowds. Golden hour, at the end of the day, is the second best choice.',
        },
        { q: 'I don’t know how to pose.', a: 'Almost nobody does. We tell you what to do, where to look and when to walk.' },
        { q: 'What if it rains?', a: 'We move the session to another day of your trip for free, or suggest covered locations.' },
      ],
      ctaTitle: 'Pick your morning in Paris',
      ctaText: 'Send us the dates of your trip. We reply within 24 hours with the best hours of light.',
    },
    fa: {
      slug: 'akasi-borj-eiffel',
      title: 'عکاسی با برج ایفل | عکاس در پاریس | لومینور',
      description:
        'عکاسی با برج ایفل همراه عکاس فارسی‌زبان در پاریس: تروکادرو هنگام طلوع، پل بیر-حکیم، خیابان اونیورسیته. ژست‌ها را با هم پیدا می‌کنیم. از ۲۲۰ یورو.',
      h1: 'عکاسی با برج ایفل',
      lead: 'بهترین زاویه‌های برج، در بهترین ساعت، با عکاسی که در هر ژست راهنمایی‌تان می‌کند.',
      points: [
        { t: 'بدون شلوغی', d: 'زود شروع می‌کنیم: هنگام طلوع، تروکادرو تقریباً خالی است.' },
        { t: 'فراتر از کارت‌پستال', d: 'خیابان‌های هوسمانی، پل‌ها و کافه‌ها با برج در پس‌زمینه؛ عکس‌هایی که فقط مال شماست.' },
        { t: 'از اول تا آخر کنارتان', d: 'می‌گوییم کجا بایستید، کجا را نگاه کنید و کی راه بروید. تجربه‌ی قبلی لازم نیست.' },
        { t: 'همه‌ی عکس‌ها', d: 'عکس‌های ادیت‌شده و همه‌ی عکس‌های خام، در گالری خصوصی.' },
      ],
      spotsTitle: 'بهترین زاویه‌ها',
      spots: [
        { name: 'تروکادرو', when: 'طلوع', note: 'قاب کلاسیک روبه‌روی برج، پیش از رسیدن جمعیت.' },
        { name: 'پل بیر-حکیم', when: 'ساعت طلایی', note: 'ستون‌های فلزی و مترو روی پل، با برج در چند قدمی.' },
        { name: 'خیابان اونیورسیته', when: 'صبح', note: 'برج در انتهای یک خیابان پاریسی؛ از پرطرفدارترین عکس‌ها.' },
        { name: 'شان دو مارس', when: 'شب', note: 'بعد از تاریکی هوا، برج سر هر ساعت پنج دقیقه چشمک می‌زند.' },
      ],
      packages: ['classic', 'signature'],
      faq: [
        {
          q: 'بهترین ساعت کی است؟',
          a: 'هنگام طلوع، برای نور نرم و خلوتی. ساعت طلایی در پایان روز، انتخاب دوم است.',
        },
        { q: 'اصلاً بلد نیستم ژست بگیرم.', a: 'نگران نباشید؛ کمتر کسی بلد است. قدم‌به‌قدم می‌گوییم کجا بایستید، کجا را نگاه کنید و کی راه بروید.' },
        { q: 'اگر هوا بارانی باشد چه؟', a: 'جلسه را بی‌هیچ هزینه‌ای به روز دیگری از سفرتان منتقل می‌کنیم، یا لوکیشن‌های سرپوشیده پیشنهاد می‌دهیم.' },
      ],
      ctaTitle: 'صبحِ پاریسیِ خودتان را انتخاب کنید',
      ctaText: 'تاریخ سفرتان را بفرستید؛ تا ۲۴ ساعت آینده با بهترین ساعت‌های نور پاسخ می‌دهیم.',
    },
  },

  couple: {
    fr: {
      slug: 'photographe-couple-paris',
      title: 'Photographe couple à Paris — Séance photo à deux | Luminoor',
      description:
        'Séance photo de couple à Paris : Montmartre, le Marais, les quais de Seine, un café. Des photos naturelles, guidées sans être figées. Dès 220 €.',
      h1: 'Séance photo de couple à Paris',
      lead: 'Une promenade à deux dans Paris, et un photographe qui saisit vos gestes, vos regards et vos éclats de rire.',
      points: [
        { t: 'Naturel avant tout', d: 'On vous guide juste assez pour être à l’aise, puis on laisse faire le moment.' },
        { t: 'Votre Paris', d: 'On construit l’itinéraire selon vos envies : quartiers, cafés, lieux qui comptent pour vous.' },
        { t: 'Pour toutes les occasions', d: 'Voyage de noces, anniversaire, fiançailles, ou simplement un week-end à Paris.' },
        { t: 'Toutes les photos', d: 'Photos retouchées et toutes les photos brutes, livrées en galerie privée.' },
      ],
      spotsTitle: 'Nos quartiers préférés à deux',
      spots: [
        { name: 'Montmartre', when: 'Heure bleue', note: 'Ruelles pavées, escaliers et vue sur tout Paris.' },
        { name: 'Le Marais', when: 'Le matin', note: 'Petites places, façades anciennes et cafés à l’angle.' },
        { name: 'Quais de Seine', when: 'Heure dorée', note: 'Marcher au bord de l’eau, avec les ponts en toile de fond.' },
        { name: 'Palais-Royal', when: 'En journée', note: 'Colonnes de Buren et arcades, calme et élégant.' },
      ],
      packages: ['classic', 'signature'],
      faq: [
        {
          q: 'Combien de temps faut-il prévoir ?',
          a: 'D’une heure (Minimal) à cinq heures (Cinéstyle). Pour un couple, la formule Classic de deux heures laisse le temps de changer de quartier.',
        },
        { q: 'Je ne sais pas poser.', a: 'Presque personne ne sait. On vous dit quoi faire, où regarder et quand marcher.' },
        {
          q: 'Que se passe-t-il s’il pleut ?',
          a: 'On déplace la séance gratuitement à une autre date de votre séjour, ou on vous propose des lieux couverts.',
        },
      ],
      ctaTitle: 'Votre balade à deux commence ici',
      ctaText: 'Dites-nous la date et ce qui vous ressemble. On vous répond sous 24 heures.',
    },
    en: {
      slug: 'paris-couple-photoshoot',
      title: 'Paris Couple Photoshoot — Photographer for Two | Luminoor',
      description:
        'Couple photoshoot in Paris: Montmartre, Le Marais, the Seine, a café. Natural photos, guided without feeling posed. From €220.',
      h1: 'Couple photoshoot in Paris',
      lead: 'A walk for two through Paris, and a photographer who catches your gestures, your glances and your laughter.',
      points: [
        { t: 'Natural first', d: 'We guide you just enough to feel at ease, then let the moment happen.' },
        { t: 'Your Paris', d: 'We plan the route around you: neighbourhoods, cafés, places that mean something to you.' },
        { t: 'For every occasion', d: 'Honeymoon, anniversary, engagement, or simply a weekend in Paris.' },
        { t: 'Every photo', d: 'Edited photos and all raw photos, delivered in a private gallery.' },
      ],
      spotsTitle: 'Our favourite neighbourhoods for two',
      spots: [
        { name: 'Montmartre', when: 'Blue hour', note: 'Cobbled lanes, stairways and a view over all of Paris.' },
        { name: 'Le Marais', when: 'Morning', note: 'Small squares, old façades and corner cafés.' },
        { name: 'The Seine', when: 'Golden hour', note: 'Walking by the water, with the bridges behind you.' },
        { name: 'Palais-Royal', when: 'Daytime', note: 'Buren columns and arcades, calm and elegant.' },
      ],
      packages: ['classic', 'signature'],
      faq: [
        {
          q: 'How much time should we plan?',
          a: 'From one hour (Minimal) to five hours (Cinéstyle). For a couple, the two-hour Classic package leaves time to change neighbourhood.',
        },
        { q: 'We don’t know how to pose.', a: 'Almost nobody does. We tell you what to do, where to look and when to walk.' },
        { q: 'What if it rains?', a: 'We move the session to another day of your trip for free, or suggest covered locations.' },
      ],
      ctaTitle: 'Your walk for two starts here',
      ctaText: 'Send us the date and a little about you. We reply within 24 hours.',
    },
    fa: {
      slug: 'akasi-zoji-paris',
      title: 'عکاسی زوج در پاریس | عکاسی دونفره | لومینور',
      description:
        'عکاسی زوج در پاریس: مونمارتر، له‌ماره، کنار رود سن یا یک کافه. عکس‌های طبیعی، با راهنمایی ولی بدون ژست‌های خشک. از ۲۲۰ یورو.',
      h1: 'عکاسی زوج در پاریس',
      lead: 'یک قدم‌زدن دونفره در پاریس، و عکاسی که نگاه‌ها، حرکت‌ها و خنده‌هایتان را ثبت می‌کند.',
      points: [
        { t: 'اول از همه طبیعی', d: 'فقط به اندازه‌ای راهنمایی می‌کنیم که راحت باشید؛ بعد می‌گذاریم لحظه خودش پیش برود.' },
        { t: 'پاریسِ شما', d: 'مسیر را بر اساس سلیقه‌ی شما می‌چینیم: محله‌ها، کافه‌ها و جاهایی که برایتان معنا دارند.' },
        { t: 'برای هر مناسبتی', d: 'ماه عسل، سالگرد، نامزدی، یا فقط یک آخر هفته در پاریس.' },
        { t: 'همه‌ی عکس‌ها', d: 'عکس‌های ادیت‌شده و همه‌ی عکس‌های خام، در گالری خصوصی.' },
      ],
      spotsTitle: 'محله‌های محبوب ما برای عکاسی دونفره',
      spots: [
        { name: 'مونمارتر', when: 'ساعت آبی', note: 'کوچه‌های سنگ‌فرش، پله‌ها و منظره‌ی تمام پاریس.' },
        { name: 'له‌ماره', when: 'صبح', note: 'میدان‌های کوچک، نماهای قدیمی و کافه‌های سر کوچه.' },
        { name: 'کنار رود سن', when: 'ساعت طلایی', note: 'قدم‌زدن کنار آب، با پل‌ها در پس‌زمینه.' },
        { name: 'پاله‌رویال', when: 'روز', note: 'ستون‌های بورن و طاق‌ها؛ آرام و شیک.' },
      ],
      packages: ['classic', 'signature'],
      faq: [
        {
          q: 'چقدر زمان لازم است؟',
          a: 'از یک ساعت (Minimal) تا پنج ساعت (Cinéstyle). برای زوج‌ها، پکیج دوساعته‌ی Classic فرصت عوض کردن محله را هم می‌دهد.',
        },
        { q: 'بلد نیستیم ژست بگیریم.', a: 'نگران نباشید؛ کمتر کسی بلد است. قدم‌به‌قدم می‌گوییم کجا بایستید، کجا را نگاه کنید و کی راه بروید.' },
        { q: 'اگر هوا بارانی باشد چه؟', a: 'جلسه را بی‌هیچ هزینه‌ای به روز دیگری از سفرتان منتقل می‌کنیم، یا لوکیشن‌های سرپوشیده پیشنهاد می‌دهیم.' },
      ],
      ctaTitle: 'قدم‌زدن دونفره‌تان از اینجا شروع می‌شود',
      ctaText: 'تاریخ و کمی از خودتان برایمان بنویسید؛ تا ۲۴ ساعت آینده پاسخ می‌دهیم.',
    },
  },
};

export const landingIds = Object.keys(landings) as LandingId[];

/** Address of a landing page in a given language. */
export const landingHref = (id: LandingId, lang: Lang) =>
  `${lang === 'fr' ? '/' : `/${lang}/`}${landings[id][lang].slug}/`;
