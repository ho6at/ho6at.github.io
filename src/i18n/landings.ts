// Dedicated pages for the main searches. The flagship is the paparazzi photoshoot (Le Flâneur: you walk
// through Paris, we follow at a distance with a long lens); then Paris photoshoot, street style, proposal,
// Eiffel Tower and couples, each told in the same paparazzi style.
// Each topic exists in French, English and Persian; `slug` is the page's address under its language.
// Facts (packages, prices, FAQ answers, places) match the home page.

export type LandingId = 'paparazzi' | 'paris' | 'street' | 'proposal' | 'eiffel' | 'couple';
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
  paparazzi: {
    fr: {
      slug: 'shooting-paparazzi-paris',
      title: 'Shooting paparazzi à Paris — Photos volées façon star | Luminoor',
      description:
        'Shooting paparazzi à Paris : vous marchez, on vous suit au téléobjectif. Des photos volées comme celles des stars et de la Fashion Week. Dès 220 €.',
      h1: 'Shooting paparazzi à Paris',
      lead: 'Vous traversez une rue, vous prenez un café, vous riez. De l’autre côté du trottoir, un téléobjectif ne vous quitte pas. Les rues de Paris, votre scène.',
      points: [
        { t: 'Vous ne posez pas', d: 'Un itinéraire à suivre, une ou deux indications, rien de plus. Vous marchez, on s’occupe du reste.' },
        { t: 'Un photographe à distance', d: 'Il reste loin, fondu dans la foule. Vous l’oubliez vite, et c’est là que les vraies images arrivent.' },
        { t: 'L’allure d’une star', d: 'Des photos prises sur le vif, comme celles des magazines ou du street style de la Fashion Week.' },
        { t: 'Toutes les photos', d: 'Photos retouchées et toutes les photos brutes, livrées en galerie privée.' },
      ],
      spotsTitle: 'Nos rues pour un shooting paparazzi',
      spots: [
        { name: 'Saint-Germain', when: 'L’après-midi', note: 'Une terrasse, un café, un passage piéton : le décor parisien par excellence.' },
        { name: 'Le Marais', when: 'Le matin', note: 'Des rues étroites où l’on vous suit d’un trottoir à l’autre.' },
        { name: 'Palais-Royal', when: 'En journée', note: 'Les arcades, prises de loin, comme une sortie de défilé.' },
        { name: 'Pont Alexandre III', when: 'Heure dorée', note: 'Une traversée lente, la Seine derrière vous, la lumière dans le dos.' },
      ],
      packages: ['minimal', 'classic', 'signature'],
      faq: [
        {
          q: 'Qu’est-ce qu’un shooting paparazzi ?',
          a: 'Vous vous promenez dans Paris, naturellement. Le photographe vous suit à distance avec un téléobjectif et saisit les moments vrais, sans pose.',
        },
        { q: 'Je ne sais pas poser.', a: 'Tant mieux : ici, on ne pose pas. Vous marchez, on vous suit.' },
        {
          q: 'Quelle formule choisir ?',
          a: 'Le Café (1 heure, 1 lieu) pour une sortie courte. La Balade (2 heures, 2 lieux) pour changer de quartier. Le Tour (3 heures, 3 lieux) pour une vraie journée de star.',
        },
        { q: 'Comment se passe le paiement ?', a: 'Un acompte de 30 % réserve la date. Le reste est réglé le jour de la séance.' },
        { q: 'Que se passe-t-il s’il pleut ?', a: 'On déplace la séance gratuitement à une autre date de votre séjour, ou on choisit des lieux couverts.' },
      ],
      ctaTitle: 'Paris vous attend',
      ctaText: 'Dites-nous vos dates et le quartier qui vous attire. On vous répond sous 24 heures.',
    },
    en: {
      slug: 'paparazzi-photoshoot-paris',
      title: 'Paparazzi Photoshoot Paris — Candid Celebrity-Style Photos | Luminoor',
      description:
        'Paparazzi photoshoot in Paris: you walk, we follow with a long lens. Candid photos like celebrity shots and Fashion Week street style. From €220.',
      h1: 'Paparazzi photoshoot in Paris',
      lead: 'You cross a street, order a coffee, laugh. Across the pavement, a long lens never lets you go. The streets of Paris, your stage.',
      points: [
        { t: 'No posing', d: 'A route to walk, one or two directions, nothing more. You walk, we take care of the rest.' },
        { t: 'A photographer at a distance', d: 'Far away, lost in the crowd. You soon forget about us, and that is when the real pictures happen.' },
        { t: 'Star quality', d: 'Candid photos in the spirit of magazine paparazzi shots and Fashion Week street style.' },
        { t: 'Every photo', d: 'Edited photos and all raw photos, delivered in a private gallery.' },
      ],
      spotsTitle: 'Our streets for a paparazzi shoot',
      spots: [
        { name: 'Saint-Germain', when: 'Afternoon', note: 'A terrace, a coffee, a crossing: Paris at its most Parisian.' },
        { name: 'Le Marais', when: 'Morning', note: 'Narrow streets where we follow you from one pavement to the other.' },
        { name: 'Palais-Royal', when: 'Daytime', note: 'The arcades, shot from afar, like leaving a runway show.' },
        { name: 'Pont Alexandre III', when: 'Golden hour', note: 'A slow crossing, the Seine behind you, the light at your back.' },
      ],
      packages: ['minimal', 'classic', 'signature'],
      faq: [
        {
          q: 'What is a paparazzi photoshoot?',
          a: 'You stroll through Paris as you naturally would. The photographer follows at a distance with a long lens and catches the real moments, with no posing.',
        },
        { q: 'I don’t know how to pose.', a: 'Good: you don’t pose. You walk, we follow.' },
        {
          q: 'Which package should I choose?',
          a: 'Le Café (1 hour, 1 place) for a short outing. La Balade (2 hours, 2 places) to change neighbourhood. Le Tour (3 hours, 3 places) for a true star’s day out.',
        },
        { q: 'How does payment work?', a: 'A 30% deposit holds the date. The rest is paid on the day of the shoot.' },
        { q: 'What if it rains?', a: 'We move the session to another day of your trip for free, or choose covered places.' },
      ],
      ctaTitle: 'Paris is waiting',
      ctaText: 'Send us your dates and the neighbourhood that draws you. We reply within 24 hours.',
    },
    fa: {
      slug: 'akasi-paparazzi-paris',
      title: 'عکاسی پاپاراتزی در پاریس | عکس‌های بی‌ژست به سبک ستاره‌ها | لومینور',
      description:
        'عکاسی پاپاراتزی در پاریس: شما قدم می‌زنید و ما با لنز تله از دور دنبالتان می‌کنیم. عکس‌هایی مثل عکس ستاره‌ها و استریت‌استایل هفته‌ی مد. از ۲۲۰ یورو.',
      h1: 'عکاسی پاپاراتزی در پاریس',
      lead: 'از خیابان رد می‌شوید، قهوه‌ای سفارش می‌دهید، می‌خندید. آن‌طرف پیاده‌رو، یک لنز تله لحظه‌ای از شما چشم برنمی‌دارد. خیابان‌های پاریس، صحنه‌ی شما.',
      points: [
        { t: 'ژست نمی‌گیرید', d: 'یک مسیر برای قدم‌زدن و نهایتاً یکی‌دو اشاره؛ همین. شما راه می‌روید، بقیه‌اش با ما.' },
        { t: 'عکاس، از دور', d: 'عکاس دور می‌ماند و میان جمعیت گم می‌شود. خیلی زود فراموشش می‌کنید و درست همان‌جاست که عکس‌های واقعی شکل می‌گیرند.' },
        { t: 'مثل یک ستاره', d: 'عکس‌هایی بی‌خبر و طبیعی، به حال‌وهوای عکس‌های پاپاراتزی مجله‌ها و استریت‌استایل هفته‌ی مد پاریس.' },
        { t: 'همه‌ی عکس‌ها', d: 'عکس‌های ادیت‌شده و همه‌ی عکس‌های خام، در گالری خصوصی.' },
      ],
      spotsTitle: 'خیابان‌های ما برای عکاسی پاپاراتزی',
      spots: [
        { name: 'سن‌ژرمن', when: 'بعدازظهر', note: 'یک تراس، یک فنجان قهوه، یک خط عابر پیاده؛ پاریسی‌ترین قاب ممکن.' },
        { name: 'له‌ماره', when: 'صبح', note: 'کوچه‌های باریکی که از این پیاده‌رو تا آن پیاده‌رو دنبالتان می‌کنیم.' },
        { name: 'پاله‌رویال', when: 'روز', note: 'طاق‌ها، از فاصله‌ای دور؛ انگار تازه از یک شوی مد بیرون آمده‌اید.' },
        { name: 'پل الکساندر سوم', when: 'ساعت طلایی', note: 'عبوری آرام از پل، رود سن پشت سر و نور طلایی پشت شانه‌ها.' },
      ],
      packages: ['minimal', 'classic', 'signature'],
      faq: [
        {
          q: 'عکاسی پاپاراتزی یعنی چه؟',
          a: 'شما مثل همیشه در پاریس قدم می‌زنید. عکاس با لنز تله از فاصله‌ی دور دنبالتان می‌کند و لحظه‌های واقعی را، بی هیچ ژستی، ثبت می‌کند.',
        },
        { q: 'اصلاً بلد نیستم ژست بگیرم.', a: 'چه بهتر؛ اینجا کسی ژست نمی‌گیرد. شما راه می‌روید، ما دنبالتان می‌آییم.' },
        {
          q: 'کدام پکیج را انتخاب کنم؟',
          a: 'Le Café (یک ساعت، یک لوکیشن) برای یک گردش کوتاه. La Balade (دو ساعت، دو لوکیشن) برای عوض کردن محله. Le Tour (سه ساعت، سه لوکیشن) برای یک روز ستاره‌وار تمام‌عیار.',
        },
        { q: 'پرداخت چطور انجام می‌شود؟', a: 'با پرداخت ۳۰٪ بیعانه، روزتان رزرو می‌شود و باقی مبلغ را روز عکاسی پرداخت می‌کنید.' },
        { q: 'اگر هوا بارانی باشد چه؟', a: 'جلسه را بی‌هیچ هزینه‌ای به روز دیگری از سفرتان منتقل می‌کنیم، یا لوکیشن‌های سرپوشیده انتخاب می‌کنیم.' },
      ],
      ctaTitle: 'پاریس منتظر شماست',
      ctaText: 'تاریخ سفر و محله‌ای را که دوست دارید بفرستید؛ تا ۲۴ ساعت آینده پاسخ می‌دهیم.',
    },
  },

  paris: {
    fr: {
      slug: 'shooting-photo-paris',
      title: 'Shooting photo à Paris — Photographe façon paparazzi | Luminoor',
      description:
        'Shooting photo à Paris façon paparazzi : vous vous promenez, un photographe vous suit de loin et capte l’instant. Seul, à deux ou entre amis. Dès 220 €.',
      h1: 'Shooting photo à Paris',
      lead: 'De passage à Paris ? Rapportez autre chose que des selfies. Vous vivez la ville, on vous suit de loin, et Paris devient votre scène.',
      points: [
        { t: 'Un photographe qui connaît Paris', d: 'On trace l’itinéraire et on choisit l’heure selon la lumière. Vous n’avez plus qu’à marcher.' },
        { t: 'Seul, à deux ou entre amis', d: 'Une balade en solo, à deux ou en bande : on vous suit tels que vous êtes.' },
        { t: 'D’une heure à une demi-journée', d: 'Le Café pour une heure et un lieu, jusqu’à La Star : environ quatre heures et demie, quatre lieux et un film d’une minute.' },
        { t: 'En français, anglais ou persan', d: 'On vous accompagne dans votre langue, du premier message à la dernière photo.' },
      ],
      spotsTitle: 'Nos lieux à Paris',
      spots: [
        { name: 'Trocadéro', when: 'Lever du soleil', note: 'L’esplanade presque vide, la tour Eiffel au bout de vos pas.' },
        { name: 'Palais-Royal', when: 'En journée', note: 'Colonnes de Buren et arcades, à traverser sans se presser.' },
        { name: 'Pont Alexandre III', when: 'Heure dorée', note: 'Dorures, Seine et Invalides en fond, pour une traversée de star.' },
        { name: 'Montmartre', when: 'Heure bleue', note: 'Des ruelles pavées à descendre, et Paris qui s’allume en contrebas.' },
      ],
      packages: ['minimal', 'classic', 'signature'],
      faq: [
        { q: 'Je ne sais pas poser.', a: 'Vous n’aurez pas à le faire. Vous marchez, vous prenez un café, on vous suit à distance.' },
        { q: 'Comment se passe le paiement ?', a: 'Un acompte de 30 % réserve la date. Le reste est réglé le jour de la séance.' },
        { q: 'Que se passe-t-il s’il pleut ?', a: 'On déplace la séance gratuitement à une autre date de votre séjour, ou on choisit des lieux couverts.' },
      ],
      ctaTitle: 'Gardez un souvenir de Paris',
      ctaText: 'Dites-nous vos dates et ce que vous aimeriez vivre. On vous répond sous 24 heures.',
    },
    en: {
      slug: 'paris-photoshoot',
      title: 'Paris Photoshoot — Paparazzi-Style Vacation Photographer | Luminoor',
      description:
        'Paris photoshoot, paparazzi style: you stroll, a photographer follows from a distance and catches the moment. Solo, couples or friends. From €220.',
      h1: 'Paris photoshoot',
      lead: 'Visiting Paris? Take home more than selfies. You live the city, we follow from a distance, and Paris becomes your stage.',
      points: [
        { t: 'A photographer who knows Paris', d: 'We draw the route and pick the hour by the light. All you have to do is walk.' },
        { t: 'Solo, couples or friends', d: 'On your own, as two or as a group: we follow you as you are.' },
        { t: 'One hour to half a day', d: 'Le Café for one hour and one place, up to La Star: about four and a half hours, four places and a one-minute film.' },
        { t: 'In English, French or Persian', d: 'We look after you in your language, from the first message to the last photo.' },
      ],
      spotsTitle: 'Our places in Paris',
      spots: [
        { name: 'Trocadéro', when: 'Sunrise', note: 'An almost empty esplanade, the Eiffel Tower at the end of your steps.' },
        { name: 'Palais-Royal', when: 'Daytime', note: 'Buren columns and arcades, to cross without hurrying.' },
        { name: 'Pont Alexandre III', when: 'Golden hour', note: 'Gilded statues, the Seine and Les Invalides behind, for a star’s crossing.' },
        { name: 'Montmartre', when: 'Blue hour', note: 'Cobbled lanes to wander down, and Paris lighting up below.' },
      ],
      packages: ['minimal', 'classic', 'signature'],
      faq: [
        { q: 'I don’t know how to pose.', a: 'You won’t have to. You walk, you have a coffee, we follow from a distance.' },
        { q: 'How does payment work?', a: 'A 30% deposit holds the date. The rest is paid on the day of the shoot.' },
        { q: 'What if it rains?', a: 'We move the session to another day of your trip for free, or choose covered places.' },
      ],
      ctaTitle: 'Keep a piece of Paris',
      ctaText: 'Send us your dates and what you would like to live. We reply within 24 hours.',
    },
    fa: {
      slug: 'akasi-dar-paris',
      title: 'عکاسی در پاریس | عکاسی به سبک پاپاراتزی در سفر | لومینور',
      description:
        'عکاسی در پاریس به سبک پاپاراتزی: شما گردش می‌کنید و عکاس از دور دنبالتان می‌آید و لحظه را ثبت می‌کند. تنها، دونفره یا با دوستان. از ۲۲۰ یورو.',
      h1: 'عکاسی در پاریس',
      lead: 'سفر پاریس دارید؟ به‌جای سلفی، با عکس‌هایی برگردید که حس واقعی سفر را دارند. شما شهر را زندگی می‌کنید، ما از دور دنبالتان می‌کنیم و پاریس صحنه‌ی شما می‌شود.',
      points: [
        { t: 'عکاسی که پاریس را می‌شناسد', d: 'مسیر را می‌چینیم و ساعت را بر اساس نور انتخاب می‌کنیم. کار شما فقط قدم‌زدن است.' },
        { t: 'تنها، دونفره یا با دوستان', d: 'تنها، دونفره یا جمعی؛ همان‌طور که هستید دنبالتان می‌کنیم.' },
        { t: 'از یک ساعت تا نصف روز', d: 'از Le Café با یک ساعت و یک لوکیشن، تا La Star با حدود چهار ساعت و نیم، چهار لوکیشن و یک فیلم یک‌دقیقه‌ای.' },
        { t: 'به فارسی', d: 'از اولین پیام تا آخرین عکس، به زبان خودتان همراهتان هستیم.' },
      ],
      spotsTitle: 'لوکیشن‌های ما در پاریس',
      spots: [
        { name: 'تروکادرو', when: 'طلوع', note: 'میدانی تقریباً خالی، و برج ایفل در انتهای قدم‌هایتان.' },
        { name: 'پاله‌رویال', when: 'روز', note: 'ستون‌های بورن و طاق‌ها، برای قدم‌زدنی آرام و بی‌عجله.' },
        { name: 'پل الکساندر سوم', when: 'ساعت طلایی', note: 'مجسمه‌های طلایی، رود سن و انولید در پس‌زمینه؛ عبوری ستاره‌وار.' },
        { name: 'مونمارتر', when: 'ساعت آبی', note: 'کوچه‌های سنگ‌فرشی که پایین می‌روید، و پاریسی که زیر پایتان روشن می‌شود.' },
      ],
      packages: ['minimal', 'classic', 'signature'],
      faq: [
        { q: 'اصلاً بلد نیستم ژست بگیرم.', a: 'لازم هم نیست. شما قدم می‌زنید، قهوه می‌نوشید و ما از دور دنبالتان می‌کنیم.' },
        { q: 'پرداخت چطور انجام می‌شود؟', a: 'با پرداخت ۳۰٪ بیعانه، روزتان رزرو می‌شود و باقی مبلغ را روز عکاسی پرداخت می‌کنید.' },
        { q: 'اگر هوا بارانی باشد چه؟', a: 'جلسه را بی‌هیچ هزینه‌ای به روز دیگری از سفرتان منتقل می‌کنیم، یا لوکیشن‌های سرپوشیده انتخاب می‌کنیم.' },
      ],
      ctaTitle: 'یک یادگاری از پاریس',
      ctaText: 'تاریخ سفر و حال‌وهوایی که دوست دارید را بفرستید؛ تا ۲۴ ساعت آینده پاسخ می‌دهیم.',
    },
  },

  street: {
    fr: {
      slug: 'photographe-street-style-paris',
      title: 'Séance photo street style à Paris — Façon Fashion Week | Luminoor',
      description:
        'Séance photo street style à Paris, façon Fashion Week : vous marchez dans votre tenue, on vous suit au téléobjectif. Des photos prises sur le vif, dès 220 €.',
      h1: 'Séance photo street style à Paris',
      lead: 'Pendant la Fashion Week, les photographes attendent à la sortie des défilés. Ici, c’est vous qu’on attend. Vous marchez, on vous suit, Paris fait le décor.',
      points: [
        { t: 'Le regard de la Fashion Week', d: 'Des images de street style comme celles des sorties de défilé : prises de loin, en mouvement, sans pose.' },
        { t: 'Votre tenue en mouvement', d: 'Un manteau qui s’ouvre, un pas sur un passage piéton : on montre votre style tel qu’il vit.' },
        { t: 'Une ou deux indications, pas plus', d: 'On vous donne un itinéraire et le bon trottoir. Le reste vous appartient.' },
        { t: 'Une retouche éditoriale', d: 'Des couleurs justes et un rendu de magazine, avec toutes les photos brutes en plus.' },
      ],
      spotsTitle: 'Nos rues préférées',
      spots: [
        { name: 'Le Marais', when: 'Le matin', note: 'Ruelles, petites places et cafés à l’angle, à traverser d’un pas sûr.' },
        { name: 'Saint-Germain', when: 'L’après-midi', note: 'Terrasses et façades parisiennes : le podium naturel du street style.' },
        { name: 'Palais-Royal', when: 'En journée', note: 'Arcades et colonnes de Buren, idéal pour un look affirmé.' },
        { name: 'Montmartre', when: 'Heure bleue', note: 'Escaliers, pavés et lampadaires qui s’allument derrière vous.' },
      ],
      packages: ['minimal', 'signature'],
      faq: [
        { q: 'Faut-il avoir un style particulier ?', a: 'Non. On part de vos tenues et de votre allure, et on choisit les rues qui leur vont.' },
        { q: 'Je ne sais pas poser.', a: 'Personne ne pose à la sortie d’un défilé. Vous marchez, on vous suit à distance.' },
        { q: 'Que se passe-t-il s’il pleut ?', a: 'On déplace la séance gratuitement à une autre date de votre séjour, ou on choisit des lieux couverts.' },
      ],
      ctaTitle: 'Faites de Paris votre podium',
      ctaText: 'Dites-nous la date et le style qui vous ressemble. On vous répond sous 24 heures.',
    },
    en: {
      slug: 'paris-street-style-photoshoot',
      title: 'Paris Street Style Photoshoot — Fashion Week Look | Luminoor',
      description:
        'Street style photoshoot in Paris, Fashion Week style: you walk in your outfit, we follow with a long lens. Candid photos caught in motion, from €220.',
      h1: 'Street style photoshoot in Paris',
      lead: 'During Fashion Week, photographers wait outside the shows. Here, they are waiting for you. You walk, we follow, and Paris sets the scene.',
      points: [
        { t: 'The Fashion Week eye', d: 'Street style pictures like those outside the shows: shot from afar, in motion, never posed.' },
        { t: 'Your outfit in motion', d: 'A coat swinging open, a step onto a crossing: we show your style as it lives.' },
        { t: 'One or two directions, no more', d: 'We give you a route and the right side of the street. The rest is yours.' },
        { t: 'Editorial finish', d: 'True colours and a magazine feel, with every raw photo included.' },
      ],
      spotsTitle: 'Our favourite streets',
      spots: [
        { name: 'Le Marais', when: 'Morning', note: 'Side streets, small squares and corner cafés, to cross with confidence.' },
        { name: 'Saint-Germain', when: 'Afternoon', note: 'Café terraces and Paris façades: street style’s natural runway.' },
        { name: 'Palais-Royal', when: 'Daytime', note: 'Arcades and Buren columns, ideal for a bold look.' },
        { name: 'Montmartre', when: 'Blue hour', note: 'Stairways, cobblestones and street lamps coming on behind you.' },
      ],
      packages: ['minimal', 'signature'],
      faq: [
        { q: 'Do I need a particular style?', a: 'No. We start from your outfits and the way you carry them, and choose the streets that suit them.' },
        { q: 'I don’t know how to pose.', a: 'Nobody poses outside a show. You walk, we follow from a distance.' },
        { q: 'What if it rains?', a: 'We move the session to another day of your trip for free, or choose covered places.' },
      ],
      ctaTitle: 'Make Paris your runway',
      ctaText: 'Send us the date and the style that feels like you. We reply within 24 hours.',
    },
    fa: {
      slug: 'akasi-khiabani-paris',
      title: 'عکاسی خیابانی در پاریس | استریت‌استایل هفته‌ی مد | لومینور',
      description:
        'عکاسی استریت‌استایل در پاریس به سبک هفته‌ی مد: شما با لباس دلخواهتان راه می‌روید و ما با لنز تله دنبالتان می‌کنیم. عکس‌های طبیعی، از ۲۲۰ یورو.',
      h1: 'عکاسی خیابانی در پاریس',
      lead: 'در هفته‌ی مد، عکاس‌ها بیرون شوها منتظر می‌مانند. اینجا منتظر شما هستند. شما راه می‌روید، ما دنبالتان می‌کنیم و پاریس صحنه را می‌چیند.',
      points: [
        { t: 'نگاه هفته‌ی مد', d: 'عکس‌های استریت‌استایل مثل عکس‌های بیرون شوهای مد: از دور، در حرکت، بدون ژست.' },
        { t: 'استایل‌تان در حرکت', d: 'پالتویی که با باد باز می‌شود، قدمی روی خط عابر؛ استایل‌تان را همان‌طور که زنده است نشان می‌دهیم.' },
        { t: 'نهایتاً یکی‌دو اشاره', d: 'یک مسیر و سمت درست خیابان را می‌گوییم؛ بقیه‌اش مال شماست.' },
        { t: 'ادیت مجله‌ای', d: 'رنگ‌های درست و حال‌وهوای مجله‌های مد، همراه با همه‌ی عکس‌های خام.' },
      ],
      spotsTitle: 'خیابان‌های محبوب ما',
      spots: [
        { name: 'له‌ماره', when: 'صبح', note: 'کوچه‌ها، میدان‌های کوچک و کافه‌های سر کوچه، برای قدم‌هایی محکم.' },
        { name: 'سن‌ژرمن', when: 'بعدازظهر', note: 'تراس کافه‌ها و نماهای پاریسی؛ سکوی طبیعی استریت‌استایل.' },
        { name: 'پاله‌رویال', when: 'روز', note: 'طاق‌ها و ستون‌های بورن، عالی برای استایل‌های جسورانه.' },
        { name: 'مونمارتر', when: 'ساعت آبی', note: 'پله‌ها، سنگ‌فرش‌ها و چراغ‌هایی که پشت سرتان روشن می‌شوند.' },
      ],
      packages: ['minimal', 'signature'],
      faq: [
        { q: 'باید استایل خاصی داشته باشم؟', a: 'نه. از لباس‌ها و حال‌وهوای خودتان شروع می‌کنیم و خیابان‌هایی را انتخاب می‌کنیم که به آن بیاید.' },
        { q: 'اصلاً بلد نیستم ژست بگیرم.', a: 'بیرون شوهای مد هم کسی ژست نمی‌گیرد. شما راه می‌روید، ما از دور دنبالتان می‌کنیم.' },
        { q: 'اگر هوا بارانی باشد چه؟', a: 'جلسه را بی‌هیچ هزینه‌ای به روز دیگری از سفرتان منتقل می‌کنیم، یا لوکیشن‌های سرپوشیده انتخاب می‌کنیم.' },
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
        'Photographe pour votre demande en mariage à Paris : caché dans la foule comme un paparazzi, il capte le oui sans jamais trahir la surprise.',
      h1: 'Photographe pour votre demande en mariage à Paris',
      lead: 'Vous posez la question, on reste dans l’ombre. Caché parmi les passants comme un paparazzi, le photographe saisit le moment exact où votre partenaire dit oui.',
      points: [
        { t: 'Tout est préparé en secret', d: 'Avec l’option demande en mariage (+120 €), on choisit ensemble le lieu, l’heure et le signal. Le jour venu, rien n’est laissé au hasard.' },
        { t: 'Invisibles, comme des paparazzi', d: 'Au téléobjectif, de loin, au milieu des passants. Votre partenaire ne remarque rien.' },
        { t: 'Le oui, puis la balade', d: 'On capture la surprise, puis on vous suit dans les rues autour pendant que vous savourez le moment.' },
        { t: 'Des photos et un film', d: 'Avec La Star, vous recevez aussi un film cinématographique d’une minute.' },
      ],
      spotsTitle: 'Où faire sa demande à Paris',
      spots: [
        { name: 'Trocadéro', when: 'Au lever du soleil', note: 'La tour Eiffel en face, et assez de calme pour qu’on reste invisibles.' },
        { name: 'Pont Alexandre III', when: 'Heure dorée', note: 'Dorures, Seine et Invalides : on vous suit de la rive, sans être vus.' },
        { name: 'Montmartre', when: 'Heure bleue', note: 'Des ruelles calmes et tout Paris qui s’allume en contrebas.' },
        { name: 'Square du Vert-Galant', when: 'Fin d’après-midi', note: 'La pointe de l’île de la Cité, au ras de l’eau, photographiée depuis le pont.' },
      ],
      packages: ['signature', 'cinestyle'],
      faq: [
        {
          q: 'Comment se passe la surprise ?',
          a: 'On fixe ensemble un point de rendez-vous et un signal. Le photographe est déjà là, fondu dans la foule, et vous suit dès votre arrivée.',
        },
        {
          q: 'Et s’il pleut ce jour-là ?',
          a: 'On prévoit un lieu couvert de secours, comme les arcades du Palais-Royal, et on décide ensemble le matin même.',
        },
        {
          q: 'Combien de temps faut-il prévoir ?',
          a: 'Trois heures avec Le Tour, environ quatre heures et demie avec La Star : l’installation discrète, la demande, puis la balade à deux.',
        },
      ],
      ctaTitle: 'Racontez-nous votre projet',
      ctaText: 'Dites-nous la date et le lieu dont vous rêvez. On vous répond sous 24 heures.',
    },
    en: {
      slug: 'paris-proposal-photographer',
      title: 'Paris Proposal Photographer — Surprise Proposal Photos | Luminoor',
      description:
        'Proposal photographer in Paris: hidden in the crowd like a paparazzo, we catch the yes without ever giving the surprise away, then follow you both.',
      h1: 'Proposal photographer in Paris',
      lead: 'You ask the question, we stay in the shadows. Hidden among passers-by like a paparazzo, the photographer catches the exact moment your partner says yes.',
      points: [
        { t: 'Planned in secret', d: 'With the proposal add-on (+€120), we choose the spot, the time and the signal together. On the day, nothing is left to chance.' },
        { t: 'Invisible, like paparazzi', d: 'A long lens, from afar, among the passers-by. Your partner notices nothing.' },
        { t: 'The yes, then the walk', d: 'We capture the surprise, then follow you through the streets around while you take it all in.' },
        { t: 'Photos and a film', d: 'With La Star, you also receive a one-minute cinematic film.' },
      ],
      spotsTitle: 'Where to propose in Paris',
      spots: [
        { name: 'Trocadéro', when: 'At sunrise', note: 'The Eiffel Tower in front of you, and enough calm for us to stay unseen.' },
        { name: 'Pont Alexandre III', when: 'Golden hour', note: 'Gilded statues, the Seine and Les Invalides: we shoot from the bank, out of sight.' },
        { name: 'Montmartre', when: 'Blue hour', note: 'Quiet lanes, and all of Paris lighting up below.' },
        { name: 'Square du Vert-Galant', when: 'Late afternoon', note: 'The tip of the Île de la Cité, by the water, photographed from the bridge.' },
      ],
      packages: ['signature', 'cinestyle'],
      faq: [
        {
          q: 'How does the surprise work?',
          a: 'We agree on a meeting point and a signal. The photographer is already there, lost in the crowd, and follows you from the moment you arrive.',
        },
        {
          q: 'What if it rains that day?',
          a: 'We plan a covered backup spot, such as the Palais-Royal arcades, and decide together that morning.',
        },
        {
          q: 'How much time should we plan?',
          a: 'Three hours with Le Tour, about four and a half hours with La Star: a discreet set-up, the proposal, then your walk together.',
        },
      ],
      ctaTitle: 'Tell us about your plan',
      ctaText: 'Send us the date and the place you have in mind. We reply within 24 hours.',
    },
    fa: {
      slug: 'akas-khastegari-paris',
      title: 'عکاس خواستگاری در پاریس | عکاسی غافلگیرانه | لومینور',
      description:
        'عکاس خواستگاری در پاریس: مثل پاپاراتزی‌ها میان جمعیت پنهان می‌مانیم، لحظه‌ی «بله» را ثبت می‌کنیم و غافلگیری لو نمی‌رود؛ بعد هم دنبالتان می‌آییم.',
      h1: 'عکاس خواستگاری در پاریس',
      lead: 'شما سؤال را بپرسید، ما در سایه می‌مانیم. عکاس مثل یک پاپاراتزی میان رهگذرها پنهان است و همان لحظه‌ای را ثبت می‌کند که «بله» را می‌شنوید.',
      points: [
        { t: 'همه‌چیز مخفیانه آماده می‌شود', d: 'با گزینه‌ی خواستگاری (۱۲۰+ یورو)، لوکیشن، ساعت و علامت را با هم مشخص می‌کنیم. روز موعود، هیچ‌چیز به شانس سپرده نمی‌شود.' },
        { t: 'نامرئی، مثل پاپاراتزی‌ها', d: 'با لنز تله، از دور و میان رهگذرها. همسر آینده‌تان چیزی متوجه نمی‌شود.' },
        { t: 'اول «بله»، بعد قدم‌زدن', d: 'غافلگیری را ثبت می‌کنیم و بعد، وقتی در خیابان‌های اطراف حال آن لحظه را مزه می‌کنید، دنبالتان می‌آییم.' },
        { t: 'عکس و فیلم', d: 'با پکیج La Star، یک فیلم سینمایی یک‌دقیقه‌ای هم می‌گیرید.' },
      ],
      spotsTitle: 'کجای پاریس خواستگاری کنیم؟',
      spots: [
        { name: 'تروکادرو', when: 'هنگام طلوع', note: 'برج ایفل روبه‌رویتان، و آن‌قدر خلوت که ما دیده نشویم.' },
        { name: 'پل الکساندر سوم', when: 'ساعت طلایی', note: 'مجسمه‌های طلایی، رود سن و گنبد انولید؛ از ساحل رود و دور از چشم عکاسی می‌کنیم.' },
        { name: 'مونمارتر', when: 'ساعت آبی', note: 'کوچه‌های آرام و پاریسی که پایین تپه روشن می‌شود.' },
        { name: 'میدان ور-گالان', when: 'عصر', note: 'نوک جزیره‌ی سیته، کنار آب؛ از روی پل عکاسی می‌کنیم.' },
      ],
      packages: ['signature', 'cinestyle'],
      faq: [
        {
          q: 'غافلگیری چطور انجام می‌شود؟',
          a: 'یک محل قرار و یک علامت را با هم مشخص می‌کنیم. عکاس از قبل آنجاست، میان جمعیت گم شده، و از لحظه‌ی رسیدن شما دنبالتان می‌کند.',
        },
        {
          q: 'اگر آن روز باران ببارد چه؟',
          a: 'یک لوکیشن سرپوشیده‌ی جایگزین، مثل طاق‌های پاله‌رویال، در نظر می‌گیریم و صبح همان روز با هم تصمیم می‌گیریم.',
        },
        {
          q: 'چقدر زمان لازم است؟',
          a: 'با Le Tour سه ساعت و با La Star حدود چهار ساعت و نیم: آماده شدن بی‌سروصدا در محل، خواستگاری، و بعد قدم‌زدن دونفره.',
        },
      ],
      ctaTitle: 'از برنامه‌تان برایمان بگویید',
      ctaText: 'تاریخ و جایی که در ذهن دارید را بفرستید؛ تا ۲۴ ساعت آینده پاسخ می‌دهیم.',
    },
  },

  eiffel: {
    fr: {
      slug: 'seance-photo-tour-eiffel',
      title: 'Séance photo Tour Eiffel — Photographe façon paparazzi | Luminoor',
      description:
        'Séance photo à la Tour Eiffel façon paparazzi : Trocadéro au lever du soleil, Bir-Hakeim, rue de l’Université. Vous marchez, on vous suit. Dès 220 €.',
      h1: 'Séance photo à la Tour Eiffel',
      lead: 'Les plus beaux points de vue sur la tour, à la bonne heure. Vous marchez vers elle, on vous suit de loin, et la photo ne ressemble à aucune carte postale.',
      points: [
        { t: 'Sans la foule', d: 'On commence tôt : au lever du soleil, le Trocadéro est presque vide.' },
        { t: 'Plus qu’une carte postale', d: 'Une rue haussmannienne, un pont, un café, la tour en fond : vous dedans, en mouvement.' },
        { t: 'Aucune pose', d: 'Un itinéraire, une ou deux indications, et un téléobjectif qui vous suit. Aucune expérience nécessaire.' },
        { t: 'Toutes les photos', d: 'Photos retouchées et toutes les photos brutes, livrées en galerie privée.' },
      ],
      spotsTitle: 'Les meilleurs points de vue',
      spots: [
        { name: 'Trocadéro', when: 'Lever du soleil', note: 'Face à la tour, sur une esplanade encore vide, à traverser sans vous presser.' },
        { name: 'Pont de Bir-Hakeim', when: 'Heure dorée', note: 'Colonnes de métal et métro aérien, pris de loin, la tour à quelques pas.' },
        { name: 'Rue de l’Université', when: 'Le matin', note: 'La tour au bout de la rue, et vous qui traversez : la photo la plus recherchée.' },
        { name: 'Champ-de-Mars', when: 'Le soir', note: 'Après la tombée de la nuit, la tour scintille cinq minutes à chaque heure pile.' },
      ],
      packages: ['classic', 'signature'],
      faq: [
        {
          q: 'Quelle est la meilleure heure ?',
          a: 'Le lever du soleil, pour la lumière douce et l’absence de foule. L’heure dorée, en fin de journée, est le deuxième meilleur choix.',
        },
        { q: 'Je ne sais pas poser.', a: 'Vous n’aurez pas à le faire. Vous marchez vers la tour, on vous suit à distance.' },
        {
          q: 'Que se passe-t-il s’il pleut ?',
          a: 'On déplace la séance gratuitement à une autre date de votre séjour, ou on choisit des lieux couverts.',
        },
      ],
      ctaTitle: 'Choisissez votre matin à Paris',
      ctaText: 'Dites-nous vos dates de séjour. On vous répond sous 24 heures avec les meilleures heures de lumière.',
    },
    en: {
      slug: 'eiffel-tower-photoshoot',
      title: 'Eiffel Tower Photoshoot — Paparazzi-Style Photographer | Luminoor',
      description:
        'Eiffel Tower photoshoot, paparazzi style: Trocadéro at sunrise, Bir-Hakeim, Rue de l’Université. You walk, we follow with a long lens. From €220.',
      h1: 'Eiffel Tower photoshoot',
      lead: 'The best views of the tower, at the right hour. You walk towards it, we follow from afar, and the picture looks like no postcard.',
      points: [
        { t: 'Without the crowds', d: 'We start early: at sunrise, the Trocadéro is almost empty.' },
        { t: 'More than a postcard', d: 'A Haussmann street, a bridge, a café, the tower behind: you in the frame, in motion.' },
        { t: 'No posing', d: 'A route, one or two directions, and a long lens following you. No experience needed.' },
        { t: 'Every photo', d: 'Edited photos and all raw photos, delivered in a private gallery.' },
      ],
      spotsTitle: 'The best viewpoints',
      spots: [
        { name: 'Trocadéro', when: 'Sunrise', note: 'Facing the tower, on an esplanade still empty, to cross at your own pace.' },
        { name: 'Pont de Bir-Hakeim', when: 'Golden hour', note: 'Iron columns and the elevated metro, shot from afar, the tower close by.' },
        { name: 'Rue de l’Université', when: 'Morning', note: 'The tower at the end of the street, and you crossing it: the most sought-after shot.' },
        { name: 'Champ de Mars', when: 'Evening', note: 'After dark, the tower sparkles for five minutes at the top of every hour.' },
      ],
      packages: ['classic', 'signature'],
      faq: [
        {
          q: 'What is the best time?',
          a: 'Sunrise, for soft light and no crowds. Golden hour, at the end of the day, is the second best choice.',
        },
        { q: 'I don’t know how to pose.', a: 'You won’t have to. You walk towards the tower, we follow from a distance.' },
        { q: 'What if it rains?', a: 'We move the session to another day of your trip for free, or choose covered places.' },
      ],
      ctaTitle: 'Pick your morning in Paris',
      ctaText: 'Send us the dates of your trip. We reply within 24 hours with the best hours of light.',
    },
    fa: {
      slug: 'akasi-borj-eiffel',
      title: 'عکاسی با برج ایفل | عکاسی به سبک پاپاراتزی در پاریس | لومینور',
      description:
        'عکاسی با برج ایفل به سبک پاپاراتزی: تروکادرو هنگام طلوع، پل بیر-حکیم، خیابان اونیورسیته. شما قدم می‌زنید، ما دنبالتان می‌کنیم. از ۲۲۰ یورو.',
      h1: 'عکاسی با برج ایفل',
      lead: 'بهترین زاویه‌های برج، در بهترین ساعت. شما به سمتش قدم می‌زنید، ما از دور دنبالتان می‌کنیم و عکسی می‌ماند که شبیه هیچ کارت‌پستالی نیست.',
      points: [
        { t: 'بدون شلوغی', d: 'زود شروع می‌کنیم: هنگام طلوع، تروکادرو تقریباً خالی است.' },
        { t: 'فراتر از کارت‌پستال', d: 'یک خیابان هوسمانی، یک پل، یک کافه و برج در پس‌زمینه؛ و شما در قاب، در حرکت.' },
        { t: 'بدون ژست', d: 'یک مسیر، یکی‌دو اشاره و لنز تله‌ای که دنبالتان می‌کند. تجربه‌ی قبلی لازم نیست.' },
        { t: 'همه‌ی عکس‌ها', d: 'عکس‌های ادیت‌شده و همه‌ی عکس‌های خام، در گالری خصوصی.' },
      ],
      spotsTitle: 'بهترین زاویه‌ها',
      spots: [
        { name: 'تروکادرو', when: 'طلوع', note: 'روبه‌روی برج، در میدانی که هنوز خالی است؛ بی‌عجله از آن بگذرید.' },
        { name: 'پل بیر-حکیم', when: 'ساعت طلایی', note: 'ستون‌های فلزی و مترو روی پل، از دور، با برج در چند قدمی.' },
        { name: 'خیابان اونیورسیته', when: 'صبح', note: 'برج در انتهای خیابان و شما در حال عبور؛ از پرطرفدارترین عکس‌ها.' },
        { name: 'شان دو مارس', when: 'شب', note: 'بعد از تاریکی هوا، برج سر هر ساعت پنج دقیقه چشمک می‌زند.' },
      ],
      packages: ['classic', 'signature'],
      faq: [
        {
          q: 'بهترین ساعت کی است؟',
          a: 'هنگام طلوع، برای نور نرم و خلوتی. ساعت طلایی در پایان روز، انتخاب دوم است.',
        },
        { q: 'اصلاً بلد نیستم ژست بگیرم.', a: 'لازم هم نیست. شما به سمت برج قدم می‌زنید و ما از دور دنبالتان می‌کنیم.' },
        { q: 'اگر هوا بارانی باشد چه؟', a: 'جلسه را بی‌هیچ هزینه‌ای به روز دیگری از سفرتان منتقل می‌کنیم، یا لوکیشن‌های سرپوشیده انتخاب می‌کنیم.' },
      ],
      ctaTitle: 'صبحِ پاریسیِ خودتان را انتخاب کنید',
      ctaText: 'تاریخ سفرتان را بفرستید؛ تا ۲۴ ساعت آینده با بهترین ساعت‌های نور پاسخ می‌دهیم.',
    },
  },

  couple: {
    fr: {
      slug: 'photographe-couple-paris',
      title: 'Photographe couple à Paris — Séance à deux façon paparazzi | Luminoor',
      description:
        'Séance photo de couple à Paris façon paparazzi : Montmartre, le Marais, les quais, un café. Vous vous promenez, on vous suit de loin. Dès 220 €.',
      h1: 'Séance photo de couple à Paris',
      lead: 'Une promenade à deux dans Paris. Un café, une main qui se cherche, un éclat de rire. De loin, un photographe saisit tout, sans jamais vous interrompre.',
      points: [
        { t: 'Rien de figé', d: 'Pas de pose : vous restez l’un avec l’autre, on reste à distance.' },
        { t: 'Votre Paris', d: 'On trace l’itinéraire selon vos envies : quartiers, cafés, lieux qui comptent pour vous.' },
        { t: 'Pour toutes les occasions', d: 'Voyage de noces, anniversaire, fiançailles, ou simplement un week-end à Paris.' },
        { t: 'Toutes les photos', d: 'Photos retouchées et toutes les photos brutes, livrées en galerie privée.' },
      ],
      spotsTitle: 'Nos quartiers préférés à deux',
      spots: [
        { name: 'Montmartre', when: 'Heure bleue', note: 'Ruelles pavées et escaliers à descendre main dans la main.' },
        { name: 'Le Marais', when: 'Le matin', note: 'Un café en terrasse, puis les petites places à deux.' },
        { name: 'Quais de Seine', when: 'Heure dorée', note: 'Marcher au bord de l’eau, pris de loin depuis l’autre rive.' },
        { name: 'Palais-Royal', when: 'En journée', note: 'Colonnes de Buren et arcades, calme et élégant.' },
      ],
      packages: ['classic', 'signature'],
      faq: [
        {
          q: 'Combien de temps faut-il prévoir ?',
          a: 'D’une heure (Le Café) à environ quatre heures et demie (La Star). Pour un couple, La Balade, deux heures et deux lieux, laisse le temps de changer de quartier.',
        },
        { q: 'Nous ne savons pas poser.', a: 'Vous n’aurez pas à le faire. Vous vous promenez ensemble, on vous suit à distance.' },
        {
          q: 'Que se passe-t-il s’il pleut ?',
          a: 'On déplace la séance gratuitement à une autre date de votre séjour, ou on choisit des lieux couverts.',
        },
      ],
      ctaTitle: 'Votre balade à deux commence ici',
      ctaText: 'Dites-nous la date et ce qui vous ressemble. On vous répond sous 24 heures.',
    },
    en: {
      slug: 'paris-couple-photoshoot',
      title: 'Paris Couple Photoshoot — Paparazzi-Style Photos for Two | Luminoor',
      description:
        'Couple photoshoot in Paris, paparazzi style: Montmartre, Le Marais, the Seine, a café. You stroll together, we follow from afar. From €220.',
      h1: 'Couple photoshoot in Paris',
      lead: 'A walk for two through Paris. A coffee, a hand reaching for another, a burst of laughter. From afar, a photographer catches it all, without ever interrupting.',
      points: [
        { t: 'Nothing stiff', d: 'No posing: you stay with each other, we stay at a distance.' },
        { t: 'Your Paris', d: 'We draw the route around you: neighbourhoods, cafés, places that mean something to you.' },
        { t: 'For every occasion', d: 'Honeymoon, anniversary, engagement, or simply a weekend in Paris.' },
        { t: 'Every photo', d: 'Edited photos and all raw photos, delivered in a private gallery.' },
      ],
      spotsTitle: 'Our favourite neighbourhoods for two',
      spots: [
        { name: 'Montmartre', when: 'Blue hour', note: 'Cobbled lanes and stairways to wander down hand in hand.' },
        { name: 'Le Marais', when: 'Morning', note: 'A coffee on a terrace, then the small squares together.' },
        { name: 'The Seine', when: 'Golden hour', note: 'Walking by the water, shot from afar across the river.' },
        { name: 'Palais-Royal', when: 'Daytime', note: 'Buren columns and arcades, calm and elegant.' },
      ],
      packages: ['classic', 'signature'],
      faq: [
        {
          q: 'How much time should we plan?',
          a: 'From one hour (Le Café) to about four and a half hours (La Star). For a couple, La Balade, two hours and two places, leaves time to change neighbourhood.',
        },
        { q: 'We don’t know how to pose.', a: 'You won’t have to. You stroll together, we follow from a distance.' },
        { q: 'What if it rains?', a: 'We move the session to another day of your trip for free, or choose covered places.' },
      ],
      ctaTitle: 'Your walk for two starts here',
      ctaText: 'Send us the date and a little about you. We reply within 24 hours.',
    },
    fa: {
      slug: 'akasi-zoji-paris',
      title: 'عکاسی زوج در پاریس | عکاسی دونفره به سبک پاپاراتزی | لومینور',
      description:
        'عکاسی زوج در پاریس به سبک پاپاراتزی: مونمارتر، له‌ماره، کنار رود سن یا یک کافه. شما با هم قدم می‌زنید، ما از دور دنبالتان می‌کنیم. از ۲۲۰ یورو.',
      h1: 'عکاسی زوج در پاریس',
      lead: 'یک قدم‌زدن دونفره در پاریس. یک قهوه، دستی که دنبال دست دیگر می‌گردد، یک خنده‌ی بی‌هوا. عکاس از دور همه را ثبت می‌کند، بی‌آنکه لحظه‌ای مزاحمتان شود.',
      points: [
        { t: 'هیچ‌چیز خشک و رسمی نیست', d: 'ژستی در کار نیست: شما با هم هستید و ما از دور.' },
        { t: 'پاریسِ شما', d: 'مسیر را بر اساس سلیقه‌ی شما می‌چینیم: محله‌ها، کافه‌ها و جاهایی که برایتان معنا دارند.' },
        { t: 'برای هر مناسبتی', d: 'ماه عسل، سالگرد، نامزدی، یا فقط یک آخر هفته در پاریس.' },
        { t: 'همه‌ی عکس‌ها', d: 'عکس‌های ادیت‌شده و همه‌ی عکس‌های خام، در گالری خصوصی.' },
      ],
      spotsTitle: 'محله‌های محبوب ما برای عکاسی دونفره',
      spots: [
        { name: 'مونمارتر', when: 'ساعت آبی', note: 'کوچه‌های سنگ‌فرش و پله‌هایی که دست‌دردست پایین می‌روید.' },
        { name: 'له‌ماره', when: 'صبح', note: 'یک قهوه روی تراس، و بعد میدان‌های کوچک، دونفره.' },
        { name: 'کنار رود سن', when: 'ساعت طلایی', note: 'قدم‌زدن کنار آب؛ از آن سوی رود و از دور عکاسی می‌کنیم.' },
        { name: 'پاله‌رویال', when: 'روز', note: 'ستون‌های بورن و طاق‌ها؛ آرام و شیک.' },
      ],
      packages: ['classic', 'signature'],
      faq: [
        {
          q: 'چقدر زمان لازم است؟',
          a: 'از یک ساعت (Le Café) تا حدود چهار ساعت و نیم (La Star). برای زوج‌ها، La Balade با دو ساعت و دو لوکیشن فرصت عوض کردن محله را هم می‌دهد.',
        },
        { q: 'بلد نیستیم ژست بگیریم.', a: 'لازم هم نیست. شما با هم قدم می‌زنید و ما از دور دنبالتان می‌کنیم.' },
        { q: 'اگر هوا بارانی باشد چه؟', a: 'جلسه را بی‌هیچ هزینه‌ای به روز دیگری از سفرتان منتقل می‌کنیم، یا لوکیشن‌های سرپوشیده انتخاب می‌کنیم.' },
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
