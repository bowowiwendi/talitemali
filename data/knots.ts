export interface Knot {
  id: number;
  name: string;
  description: string;
  usage: string;
  svg: string;
}

const ROPE_COLOR = "#8B4513";
const ROPE_WIDTH = 5;
const POLE_COLOR = "#A0522D";

export const knots: Knot[] = [
  {
    id: 1,
    name: "Simpul Pangkal",
    description: "Simpul yang digunakan untuk memulai dan mengakhiri suatu ikatan pada tongkat atau tiang.",
    usage: "Mengikat tali pada tongkat saat membuat tiang bendera, tandu, atau bangunan darurat.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="90" y="10" width="20" height="130" fill="${POLE_COLOR}" rx="3"/>
      <path d="M60 30 Q110 20 140 30" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M60 40 Q110 30 140 40" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M55 30 L55 45 L50 40" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M145 30 L145 45 L150 40" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 2,
    name: "Simpul Jangkar",
    description: "Simpul yang digunakan untuk menambatkan tali pada jangkar atau benda tetap.",
    usage: "Menambatkan tali pada pohon, pancang, atau benda tetap lainnya dengan kuat.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="85" y="10" width="30" height="130" fill="${POLE_COLOR}" rx="4"/>
      <path d="M50 50 Q85 40 115 60 Q145 75 160 50" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M160 50 L170 45 L165 55" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M45 50 L35 45 L40 55" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 3,
    name: "Simpul Anyam",
    description: "Simpul untuk menyambung dua tali yang berbeda ukuran atau berbeda jenis.",
    usage: "Menyambung tali tambang dengan tali kecil, atau tali basah dengan tali kering.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 50 Q60 30 100 70 Q140 110 180 90" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M20 90 Q60 110 100 70 Q140 30 180 50" stroke="#D2691E" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round" stroke-dasharray="8 4"/>
      <circle cx="100" cy="70" r="8" fill="none" stroke="${ROPE_COLOR}" stroke-width="2"/>
    </svg>`
  },
  {
    id: 4,
    name: "Simpul Anyam Berganda",
    description: "Simpul untuk menyambung dua tali yang licin atau basah dengan ikatan ganda.",
    usage: "Menyambung tali nilon, tali plastik, atau tali dalam keadaan basah.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 40 Q60 20 100 60 Q140 100 180 80" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M20 60 Q60 40 100 80 Q140 120 180 100" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M20 100 Q60 120 100 80 Q140 40 180 60" stroke="#D2691E" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round" stroke-dasharray="8 4"/>
      <circle cx="100" cy="70" r="5" fill="none" stroke="${ROPE_COLOR}" stroke-width="2"/>
      <circle cx="100" cy="85" r="5" fill="none" stroke="${ROPE_COLOR}" stroke-width="2"/>
    </svg>`
  },
  {
    id: 5,
    name: "Simpul Mati",
    description: "Simpul paling dasar dan sederhana yang mudah dibuat untuk mengikat.",
    usage: "Mengikat tali rafia, mengakhiri jahitan, atau ikatan sederhana yang tidak perlu kuat.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 50 Q60 20 100 50 Q140 80 160 50" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M160 50 L175 40 L170 55" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M35 50 L25 40 L30 55" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="100" cy="50" r="12" fill="none" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-2}"/>
    </svg>`
  },
  {
    id: 6,
    name: "Simpul Kembar",
    description: "Simpul untuk menyambung dua tali dengan ukuran yang sama besar.",
    usage: "Menyambung dua tali tambang yang sama besar, mengikat bendera pada tali.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 50 C50 20 80 80 100 50 C120 20 150 80 170 50" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M30 90 C50 120 80 60 100 90 C120 120 150 60 170 90" stroke="#D2691E" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round" stroke-dasharray="8 4"/>
    </svg>`
  },
  {
    id: 7,
    name: "Simpul Tiang",
    description: "Simpul yang membentuk loop tetap yang tidak mudah terlepas dan tidak menjepit.",
    usage: "Menyelamatkan orang dari ketinggian, membuat loop pada ujung tali, menambatkan perahu.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="70" r="30" fill="none" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}"/>
      <path d="M100 100 L100 130" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M100 40 Q70 30 60 50 Q50 70 70 80" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M100 130 L115 120 L110 130" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 8,
    name: "Simpul Delapan",
    description: "Simpul berbentuk angka 8 yang berfungsi sebagai pengaman di ujung tali.",
    usage: "Mencegah ujung tali terlepas dari lubang atau alat, pengaman panjat tebing.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 20 Q100 10 100 40 Q100 70 60 70 Q20 70 40 100 Q60 130 100 130" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M100 130 L120 130" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 9,
    name: "Simpul Laso",
    description: "Simpul yang membentuk loop yang bisa menyempit saat ditarik.",
    usage: "Menangkap hewan, mengikat benda yang sulit dijangkau, pramuka scouting.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="60" r="35" fill="none" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" stroke-dasharray="1 0"/>
      <path d="M65 60 Q65 35 100 35" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M100 35 Q120 40 130 60" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M120 95 L140 130" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M140 130 L155 125 L148 135" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 10,
    name: "Simpul Erat",
    description: "Simpul yang mengikat erat benda bundar dan tidak mudah lepas.",
    usage: "Mengikat selang air, mengikat karung, mengikat bambu pada pembuatan rak.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="30" width="80" height="80" fill="none" stroke="${POLE_COLOR}" stroke-width="15" rx="40"/>
      <path d="M30 50 Q60 20 100 50 Q140 80 170 50" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M30 90 Q60 120 100 90 Q140 60 170 90" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M25 50 L25 95 L20 90" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M175 50 L175 95 L180 90" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 11,
    name: "Simpul Lilit",
    description: "Simpul dengan lilitan penuh mengelilingi tiang untuk menahan beban berat.",
    usage: "Menarik benda berat, menahan beban pada tiang, membuat dragbar.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="90" y="10" width="20" height="130" fill="${POLE_COLOR}" rx="3"/>
      <path d="M50 40 Q110 20 160 40" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M50 55 Q110 35 160 55" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M50 70 Q110 50 160 70" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M45 40 L45 75 L40 70" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M165 40 L165 75 L170 70" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 12,
    name: "Simpul Hidup",
    description: "Simpul yang mudah dibuka dengan menarik salah satu ujung tali.",
    usage: "Ikatan sementara yang perlu cepat dibuka, mengikat hewan, tali jemuran.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 80 Q60 30 100 50 Q140 70 160 40" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M160 40 L175 35 L168 48" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M40 80 L25 85 L32 72" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="100" cy="55" r="15" fill="none" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-2}"/>
    </svg>`
  },
  {
    id: 13,
    name: "Simpul Nelayan",
    description: "Simpul untuk menyambung dua tali yang licin seperti tali pancing.",
    usage: "Menyambung tali pancing, tali nilon, atau tali plastik yang licin.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="60" r="10" fill="none" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}"/>
      <circle cx="130" cy="60" r="10" fill="none" stroke="#D2691E" stroke-width="${ROPE_WIDTH-1}" stroke-dasharray="8 4"/>
      <path d="M20 60 Q50 40 70 60" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M70 60 Q100 40 130 60" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M130 60 Q160 40 180 60" stroke="#D2691E" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round" stroke-dasharray="8 4"/>
    </svg>`
  },
  {
    id: 14,
    name: "Simpul Kursi",
    description: "Simpul yang membentuk dua loop untuk duduk atau mengangkat orang.",
    usage: "Menurunkan atau menaikkan orang dari ketinggian, evakuasi darurat.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="55" r="25" fill="none" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}"/>
      <circle cx="130" cy="55" r="25" fill="none" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}"/>
      <path d="M70 30 Q100 10 130 30" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M70 80 Q100 100 130 80" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M130 80 L160 130" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 15,
    name: "Simpul Tarik",
    description: "Simpul yang dapat digeser untuk mengencangkan atau mengendurkan tali tenda.",
    usage: "Mengikat tali tenda, tali jemuran, atau tali yang perlu disetel tegangannya.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="90" y="10" width="16" height="130" fill="${POLE_COLOR}" rx="3"/>
      <path d="M40 40 Q90 25 130 40 Q160 55 170 40" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M40 55 Q90 40 130 55" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH}" fill="none" stroke-linecap="round"/>
      <path d="M35 40 L35 60" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round"/>
      <path d="M170 40 L180 35 L178 48" stroke="${ROPE_COLOR}" stroke-width="${ROPE_WIDTH-1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  }
];

export function getRandomKnots(count: number = 10): Knot[] {
  const shuffled = [...knots].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getDistractors(correct: Knot, count: number = 3): Knot[] {
  const others = knots.filter(k => k.id !== correct.id);
  const shuffled = [...others].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export interface Question {
  knot: Knot;
  options: Knot[];
}

export function generateQuestions(count: number = 10): Question[] {
  const selectedKnots = getRandomKnots(count);
  return selectedKnots.map(knot => {
    const distractors = getDistractors(knot, 3);
    const options = [knot, ...distractors].sort(() => Math.random() - 0.5);
    return { knot, options };
  });
}
