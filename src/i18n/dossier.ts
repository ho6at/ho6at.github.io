// Le Dossier: the delivery told as a paparazzi's tailing file. A map of Paris draws the client's route as they
// scroll, and each "sighting" shows where and when a photo was taken, with a note from the "agent".
// The demo follows a couple through Île Saint-Louis, Saint-Germain, the Louvre and, at night, the 7th.

type Lang = 'fr' | 'en' | 'fa';

export const dossierText: Record<Lang, Record<string, string>> = {
  fr: {
    stamp: 'Confidentiel',
    file: 'Dossier N° {n}',
    subject: 'Sujets : {name}',
    date: 'Filature du {date}',
    agent: 'Agent : Hojjat, Luminoor',
    intro: 'Ils ne savaient pas où nous étions. Voici tout ce que nous avons vu.',
    stats: '{n} apparitions · {km} km à pied · de {from} à {to}',
    sighting: 'Apparition',
    metro: 'en métro',
    closing: 'Dossier clos. Les photos complètes vous attendent dans la chambre noire.',
    toReveal: 'Ouvrir la chambre noire',
    demo: 'Démonstration : un dossier d’exemple.',
    mapLabel: 'Carte du parcours dans Paris',
  },
  en: {
    stamp: 'Confidential',
    file: 'File N° {n}',
    subject: 'Subjects: {name}',
    date: 'Tailed on {date}',
    agent: 'Agent: Hojjat, Luminoor',
    intro: 'They didn’t know where we were. Here is everything we saw.',
    stats: '{n} sightings · {km} km on foot · from {from} to {to}',
    sighting: 'Sighting',
    metro: 'by metro',
    closing: 'Case closed. Your full photos are waiting in the darkroom.',
    toReveal: 'Open the darkroom',
    demo: 'Demo: a sample file.',
    mapLabel: 'Map of the route through Paris',
  },
  fa: {
    stamp: 'محرمانه',
    file: 'پرونده‌ی شماره‌ی {n}',
    subject: 'سوژه‌ها: {name}',
    date: 'تعقیبِ {date}',
    agent: 'مأمور: حجت، لومینور',
    intro: 'نمی‌دانستند ما کجاییم. این همه‌ی چیزی است که دیدیم.',
    stats: '{n} بار دیده شدند · {km} کیلومتر پیاده · از {from} تا {to}',
    sighting: 'دیده‌شدن',
    metro: 'با مترو',
    closing: 'پرونده بسته شد. عکس‌های کامل در تاریکخانه منتظر شماست.',
    toReveal: 'ورود به تاریکخانه',
    demo: 'نسخه‌ی نمایشی: یک پرونده‌ی نمونه.',
    mapLabel: 'نقشه‌ی مسیر در پاریس',
  },
};

type Note = Record<Lang, { place: string; note: string }>;

export interface Sighting {
  time: string; // HH:MM, Paris time
  at: [number, number]; // [longitude, latitude]
  photo: string; // a photo id in public/photos
  light: 'day' | 'golden' | 'blue' | 'night';
  text: Note;
}

/** The demo file: route waypoints follow the streets and bridges walked between sightings. */
export const demoDossier = {
  number: '0127',
  name: 'Sara & Adam',
  date: '2026-10-18',
  sightings: [
    {
      time: '14:32',
      at: [2.35406, 48.85253],
      photo: 'regrattier',
      light: 'day',
      text: {
        fr: { place: 'Rue Le Regrattier, île Saint-Louis', note: 'Sujets repérés. Ils s’embrassent au coin de la rue. Un passant ne voit rien.' },
        en: { place: 'Rue Le Regrattier, Île Saint-Louis', note: 'Subjects spotted. They embrace on the corner. A passer-by sees nothing.' },
        fa: { place: 'خیابان لو رگراتیه، جزیره‌ی سن‌لویی', note: 'سوژه‌ها دیده شدند. سر کوچه همدیگر را در آغوش می‌گیرند. رهگذری هیچ نمی‌بیند.' },
      },
    },
    {
      time: '15:05',
      at: [2.33883, 48.85302],
      photo: 'procope',
      light: 'day',
      text: {
        fr: { place: 'Le Procope, Saint-Germain', note: 'Arrêt devant le Procope. Lunettes noires. Paris passe, ils restent immobiles.' },
        en: { place: 'Le Procope, Saint-Germain', note: 'A stop in front of Le Procope. Dark glasses. Paris rushes by; they stand still.' },
        fa: { place: 'کافه پروکوپ، سن‌ژرمن', note: 'توقف جلوی کافه پروکوپ. عینک‌های تیره. پاریس می‌گذرد و آن‌ها بی‌حرکت می‌مانند.' },
      },
    },
    {
      time: '16:10',
      at: [2.33632, 48.86192],
      photo: 'louvre-arch',
      light: 'golden',
      text: {
        fr: { place: 'Passage Richelieu, Louvre', note: 'Sous l’arche, front contre front. La foule autour d’eux est floue. Ils ne la voient plus.' },
        en: { place: 'Passage Richelieu, Louvre', note: 'Under the arch, forehead to forehead. The crowd around them is a blur. They no longer see it.' },
        fa: { place: 'گذرگاه ریشلیو، لوور', note: 'زیر طاق، پیشانی به پیشانی. جمعیت دورشان محو است. دیگر نمی‌بینندش.' },
      },
    },
    {
      time: '21:10',
      at: [2.3016, 48.85868],
      photo: 'couple-night-run',
      light: 'night',
      text: {
        fr: { place: 'Rue Saint-Dominique', note: 'La nuit tombe. Ils traversent en courant, main dans la main. Un seul cliché suffit.' },
        en: { place: 'Rue Saint-Dominique', note: 'Night falls. They run across, hand in hand. One frame is enough.' },
        fa: { place: 'خیابان سن‌دومینیک', note: 'شب شده. دست در دست، دوان از خیابان رد می‌شوند. یک فریم کافی است.' },
      },
    },
    {
      time: '21:40',
      at: [2.3006, 48.85945],
      photo: 'eiffel-night',
      light: 'night',
      text: {
        fr: { place: 'Rue de l’Université, tour Eiffel', note: 'Fin de filature. La tour s’allume derrière eux. Dossier clos.' },
        en: { place: 'Rue de l’Université, Eiffel Tower', note: 'End of the trail. The tower lights up behind them. Case closed.' },
        fa: { place: 'خیابان اونیورسیته، برج ایفل', note: 'پایان تعقیب. برج پشت سرشان روشن می‌شود. پرونده بسته شد.' },
      },
    },
  ] as Sighting[],
  /** the path walked from each sighting to the next (excluding both ends); `metro: true` is a ride, not a walk */
  legs: [
    {
      path: [
        [2.3529, 48.8529],
        [2.35153, 48.85305],
        [2.3502, 48.8527],
        [2.34895, 48.85215],
        [2.3464, 48.8527],
        [2.34422, 48.85326],
        [2.34392, 48.85328],
        [2.3412, 48.85365],
        [2.3396, 48.85375],
      ],
    },
    {
      path: [
        [2.3384, 48.8542],
        [2.3379, 48.8556],
        [2.3375, 48.8571],
        [2.33715, 48.8583],
        [2.3369, 48.8598],
        [2.33585, 48.86085],
      ],
    },
    { path: [], metro: true },
    { path: [[2.3021, 48.8590]] },
  ] as { path: [number, number][]; metro?: boolean }[],
};
