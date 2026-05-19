export interface Knot {
  id: number;
  name: string;
  description: string;
  usage: string;
  svg: string;
}

const GRADIENTS = `
<defs>
  <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#CD853F"/>
    <stop offset="30%" stop-color="#A0522D"/>
    <stop offset="50%" stop-color="#8B4513"/>
    <stop offset="70%" stop-color="#6B3E12"/>
    <stop offset="100%" stop-color="#5D3A1A"/>
  </linearGradient>
  <linearGradient id="ropeGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#DEB887"/>
    <stop offset="30%" stop-color="#CD853F"/>
    <stop offset="50%" stop-color="#A0522D"/>
    <stop offset="70%" stop-color="#8B4513"/>
    <stop offset="100%" stop-color="#6B3E12"/>
  </linearGradient>
  <linearGradient id="poleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#8B4513"/>
    <stop offset="30%" stop-color="#A0522D"/>
    <stop offset="50%" stop-color="#B8860B"/>
    <stop offset="70%" stop-color="#A0522D"/>
    <stop offset="100%" stop-color="#8B4513"/>
  </linearGradient>
  <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="2" dy="3" stdDeviation="2" flood-color="#000" flood-opacity="0.4"/>
  </filter>
  <filter id="ropeShine">
    <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
    <feOffset in="blur" dx="0" dy="-1" result="offsetBlur"/>
    <feFlood flood-color="#FFF" flood-opacity="0.4"/>
    <feComposite in2="offsetBlur" operator="in"/>
    <feMerge>
      <feMergeNode/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>`;

function ropePath(d: string, opacity = 1) {
  return `<path d="${d}" stroke="url(#ropeGrad)" stroke-width="8" fill="none" stroke-linecap="round" filter="url(#shadow3d)" opacity="${opacity}"/>
  <path d="${d}" stroke="url(#ropeGradLight)" stroke-width="4" fill="none" stroke-linecap="round" filter="url(#ropeShine)" opacity="${opacity}"/>`;
}

function ropePathThin(d: string, opacity = 1) {
  return `<path d="${d}" stroke="url(#ropeGrad)" stroke-width="5" fill="none" stroke-linecap="round" filter="url(#shadow3d)" opacity="${opacity}"/>
  <path d="${d}" stroke="url(#ropeGradLight)" stroke-width="2.5" fill="none" stroke-linecap="round" filter="url(#ropeShine)" opacity="${opacity}"/>`;
}

function pole(x: number, w: number, h: number) {
  return `<rect x="${x}" y="10" width="${w}" height="${h}" fill="url(#poleGrad)" rx="4" filter="url(#shadow3d)"/>`;
}

export const knots: Knot[] = [
  {
    id: 1,
    name: "Simpul Pangkal",
    description: "Simpul yang digunakan untuk memulai dan mengakhiri suatu ikatan pada tongkat atau tiang.",
    usage: "Mengikat tali pada tongkat saat membuat tiang bendera, tandu, atau bangunan darurat.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      ${pole(90, 20, 130)}
      ${ropePath("M55 25 C90 15, 120 25, 145 35", 0.8)}
      ${ropePath("M55 40 C90 30, 120 40, 145 50", 0.8)}
      ${ropePathThin("M50 25 L45 15 L40 20", 0.8)}
      ${ropePathThin("M150 35 L155 15 L160 20", 0.8)}
    </svg>`
  },
  {
    id: 2,
    name: "Simpul Jangkar",
    description: "Simpul yang digunakan untuk menambatkan tali pada jangkar atau benda tetap.",
    usage: "Menambatkan tali pada pohon, pancang, atau benda tetap lainnya dengan kuat.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      ${pole(85, 30, 130)}
      ${ropePath("M40 45 C65 35, 95 45, 115 60 C135 75, 150 65, 165 45", 0.8)}
      ${ropePathThin("M35 45 L25 40 L20 50", 0.8)}
      ${ropePathThin("M165 45 L175 40 L180 50", 0.8)}
      <circle cx="160" cy="45" r="4" fill="#A0522D"/>
    </svg>`
  },
  {
    id: 3,
    name: "Simpul Anyam",
    description: "Simpul untuk menyabung dua tali yang berbeda ukuran atau berbeda jenis.",
    usage: "Menyabung tali tambang dengan tali kecil, atau tali basah dengan tali kering.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      ${ropePath("M15 45 C50 25, 90 55, 120 85 C150 115, 185 95, 195 85")}
      ${ropePath("M15 85 C50 105, 90 75, 120 45 C150 15, 185 35, 195 45")}
      <ellipse cx="105" cy="65" rx="12" ry="10" fill="none" stroke="url(#ropeGrad)" stroke-width="6" filter="url(#shadow3d)"/>
      <ellipse cx="105" cy="65" rx="12" ry="10" fill="none" stroke="url(#ropeGradLight)" stroke-width="3" filter="url(#ropeShine)"/>
    </svg>`
  },
  {
    id: 4,
    name: "Simpul Anyam Berganda",
    description: "Simpul untuk menyabung dua tali yang licin atau basah dengan ikatan ganda.",
    usage: "Menyabung tali nilon, tali plastik, atau tali dalam keadaan basah.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      ${ropePath("M15 35 C50 15, 90 45, 120 75 C150 105, 185 85, 195 75")}
      ${ropePath("M15 55 C50 35, 90 65, 120 95 C150 125, 185 105, 195 95")}
      ${ropePath("M15 95 C50 115, 90 85, 120 55 C150 25, 185 45, 195 55")}
      <circle cx="108" cy="65" r="8" fill="none" stroke="url(#ropeGrad)" stroke-width="5" filter="url(#shadow3d)"/>
      <circle cx="108" cy="65" r="8" fill="none" stroke="url(#ropeGradLight)" stroke-width="2.5" filter="url(#ropeShine)"/>
      <circle cx="108" cy="82" r="6" fill="none" stroke="url(#ropeGrad)" stroke-width="5" filter="url(#shadow3d)"/>
    </svg>`
  },
  {
    id: 5,
    name: "Simpul Mati",
    description: "Simpul paling dasar dan sederhana yang mudah dibuat untuk mengikat.",
    usage: "Mengikat tali rafia, mengakhiri jahitan, atau ikatan sederhana yang tidak perlu kuat.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      ${ropePath("M35 45 C55 15, 95 35, 120 55 C145 75, 165 55, 175 45")}
      ${ropePathThin("M175 45 L185 35 L180 50")}
      ${ropePathThin("M25 45 L15 35 L20 50")}
      <circle cx="105" cy="45" r="18" fill="none" stroke="url(#ropeGrad)" stroke-width="8" filter="url(#shadow3d)"/>
      <circle cx="105" cy="45" r="18" fill="none" stroke="url(#ropeGradLight)" stroke-width="4" filter="url(#ropeShine)"/>
    </svg>`
  },
  {
    id: 6,
    name: "Simpul Kembar",
    description: "Simpul untuk menyabung dua tali dengan ukuran yang sama besar.",
    usage: "Menyabung dua tali tambang yang sama besar, mengikat bendera pada tali.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      ${ropePath("M25 40 C55 10, 90 60, 110 40 C130 10, 165 60, 175 40")}
      ${ropePath("M25 90 C55 120, 90 70, 110 90 C130 120, 165 70, 175 90")}
    </svg>`
  },
  {
    id: 7,
    name: "Simpul Tiang",
    description: "Simpul yang membentuk loop tetap yang tidak mudah terlepas dan tidak menjepit.",
    usage: "Menyelamatkan orang dari ketinggian, membuat loop pada ujung tali, menambatkan perahu.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      <circle cx="100" cy="65" r="30" fill="none" stroke="url(#ropeGrad)" stroke-width="10" filter="url(#shadow3d)"/>
      <circle cx="100" cy="65" r="30" fill="none" stroke="url(#ropeGradLight)" stroke-width="5" filter="url(#ropeShine)"/>
      ${ropePath("M100 95 L100 125")}
      ${ropePathThin("M100 125 L112 115 L108 125")}
      ${ropePath("M100 35 C75 25, 60 35, 55 50 C50 65, 65 75, 80 75")}
      <ellipse cx="100" cy="95" rx="8" ry="5" fill="url(#ropeGrad)"/>
    </svg>`
  },
  {
    id: 8,
    name: "Simpul Delapan",
    description: "Simpul berbentuk angka 8 yang berfungsi sebagai pengaman di ujung tali.",
    usage: "Mencegah ujung tali terlepas dari lubang atau alat, pengaman panjat tebing.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      ${ropePath("M55 20 C95 5, 95 40, 95 55 C95 70, 55 70, 40 95 C25 120, 75 135, 105 125")}
      ${ropePathThin("M105 125 L125 125")}
      <circle cx="95" cy="55" r="6" fill="url(#ropeGrad)"/>
    </svg>`
  },
  {
    id: 9,
    name: "Simpul Laso",
    description: "Simpul yang membentuk loop yang bisa menyempit saat ditarik.",
    usage: "Menangkap hewan, mengikat benda yang sulit dijangkau, pramuka scouting.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      <circle cx="100" cy="55" r="35" fill="none" stroke="url(#ropeGrad)" stroke-width="10" filter="url(#shadow3d)"/>
      <circle cx="100" cy="55" r="35" fill="none" stroke="url(#ropeGradLight)" stroke-width="5" filter="url(#ropeShine)"/>
      ${ropePath("M65 55 C65 30, 95 20, 115 35")}
      ${ropePath("M115 35 C130 45, 135 60, 135 75")}
      ${ropePath("M125 90 L145 120")}
      ${ropePathThin("M145 120 L158 115 L150 128")}
    </svg>`
  },
  {
    id: 10,
    name: "Simpul Erat",
    description: "Simpul yang mengikat erat benda bundar dan tidak mudah lepas.",
    usage: "Mengikat selang air, mengikat karung, mengikat bambu pada pembuatan rak.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      <rect x="55" y="25" width="90" height="90" rx="45" fill="none" stroke="url(#poleGrad)" stroke-width="20"/>
      <rect x="55" y="25" width="90" height="90" rx="45" fill="none" stroke="url(#ropeGradLight)" stroke-width="10"/>
      ${ropePath("M30 45 C55 20, 90 40, 125 55 C160 70, 175 50, 185 45")}
      ${ropePath("M30 85 C55 110, 90 90, 125 75 C160 60, 175 80, 185 85")}
      ${ropePathThin("M25 45 L25 80 L20 75")}
      ${ropePathThin("M185 45 L185 80 L190 75")}
    </svg>`
  },
  {
    id: 11,
    name: "Simpul Lilit",
    description: "Simpul dengan lilitan penuh mengelilingi tiang untuk menahan beban berat.",
    usage: "Menarik benda berat, menahan beban pada tiang, membuat dragbar.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      ${pole(90, 20, 130)}
      ${ropePath("M45 35 C80 20, 120 30, 155 40", 0.8)}
      ${ropePath("M45 50 C80 35, 120 45, 155 55", 0.8)}
      ${ropePath("M45 65 C80 50, 120 60, 155 70", 0.8)}
      ${ropePath("M45 80 C80 65, 120 75, 155 85", 0.8)}
      ${ropePathThin("M40 35 L35 55 L30 50", 0.8)}
      ${ropePathThin("M160 40 L165 55 L170 50", 0.8)}
    </svg>`
  },
  {
    id: 12,
    name: "Simpul Hidup",
    description: "Simpul yang mudah dibuka dengan menarik salah satu ujung tali.",
    usage: "Ikatan sementara yang perlu cepat dibuka, mengikat hewan, tali jemuran.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      ${ropePath("M35 75 C55 35, 95 45, 115 55 C135 65, 155 45, 170 35")}
      ${ropePathThin("M170 35 L182 30 L175 42")}
      ${ropePathThin("M30 75 L15 80 L22 68")}
      <circle cx="105" cy="50" r="20" fill="none" stroke="url(#ropeGrad)" stroke-width="8" filter="url(#shadow3d)"/>
      <circle cx="105" cy="50" r="20" fill="none" stroke="url(#ropeGradLight)" stroke-width="4" filter="url(#ropeShine)"/>
    </svg>`
  },
  {
    id: 13,
    name: "Simpul Nelayan",
    description: "Simpul untuk menyabung dua tali yang licin seperti tali pancing.",
    usage: "Menyabung tali pancing, tali nilon, atau tali plastik yang licin.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      <circle cx="65" cy="55" r="12" fill="none" stroke="url(#ropeGrad)" stroke-width="8" filter="url(#shadow3d)"/>
      <circle cx="65" cy="55" r="12" fill="none" stroke="url(#ropeGradLight)" stroke-width="4" filter="url(#ropeShine)"/>
      <circle cx="135" cy="55" r="12" fill="none" stroke="url(#ropeGrad)" stroke-width="8" filter="url(#shadow3d)"/>
      <circle cx="135" cy="55" r="12" fill="none" stroke="url(#ropeGradLight)" stroke-width="4" filter="url(#ropeShine)"/>
      ${ropePath("M15 55 C40 40, 55 45, 65 55")}
      ${ropePath("M65 55 C85 40, 110 40, 135 55")}
      <path d="M135 55 C160 40, 180 45, 190 55" stroke="url(#ropeGradLight)" stroke-width="5" fill="none" stroke-linecap="round" filter="url(#ropeShine)"/>
    </svg>`
  },
  {
    id: 14,
    name: "Simpul Kursi",
    description: "Simpul yang membentuk dua loop untuk duduk atau mengangkat orang.",
    usage: "Menurunkan atau menaikkan orang dari ketinggian, evakuasi darurat.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      <circle cx="70" cy="55" r="25" fill="none" stroke="url(#ropeGrad)" stroke-width="10" filter="url(#shadow3d)"/>
      <circle cx="70" cy="55" r="25" fill="none" stroke="url(#ropeGradLight)" stroke-width="5" filter="url(#ropeShine)"/>
      <circle cx="130" cy="55" r="25" fill="none" stroke="url(#ropeGrad)" stroke-width="10" filter="url(#shadow3d)"/>
      <circle cx="130" cy="55" r="25" fill="none" stroke="url(#ropeGradLight)" stroke-width="5" filter="url(#ropeShine)"/>
      ${ropePath("M70 30 C95 10, 130 10, 130 30")}
      ${ropePath("M70 80 C95 100, 130 100, 130 80")}
      ${ropePath("M130 80 L160 125")}
    </svg>`
  },
  {
    id: 15,
    name: "Simpul Tarik",
    description: "Simpul yang dapat digeser untuk mengencangkan atau mengendurkan tali tenda.",
    usage: "Mengikat tali tenda, tali jemuran, atau tali yang perlu disetel tegangannya.",
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      ${GRADIENTS}
      ${pole(90, 18, 130)}
      ${ropePath("M35 35 C75 20, 115 30, 145 40 C165 48, 175 40, 185 35")}
      ${ropePath("M35 50 C75 35, 115 45, 145 55")}
      ${ropePathThin("M30 35 L30 55 L25 50")}
      ${ropePathThin("M185 35 L195 30 L188 42")}
      <circle cx="160" cy="38" r="6" fill="url(#ropeGrad)" filter="url(#shadow3d)"/>
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