const MONTHS = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

// API отдаёт даты вида "1943-11-07", а для организаций и старых записей
// день/месяц бывают неизвестны и приходят как "00" (например "1863-00-00").
export function formatDate(isoDate) {
  if (!isoDate) return "—";
  const [year, month, day] = isoDate.split("-");
  if (!month || month === "00") return year;
  if (!day || day === "00") return `${MONTHS[Number(month) - 1]} ${year}`;
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

// Коды используются в параметре nobelPrizeCategory при запросе к API.
export const CATEGORY_OPTIONS = [
  { code: "che", label: "Химия" },
  { code: "phy", label: "Физика" },
  { code: "med", label: "Физиология и медицина" },
  { code: "lit", label: "Литература" },
  { code: "pea", label: "Премия мира" },
  { code: "eco", label: "Экономические науки" },
];

// Сам API возвращает название категории на английском (category.en) —
// переводим его для отображения в таблице.
const CATEGORY_EN_TO_RU = {
  Chemistry: "Химия",
  Physics: "Физика",
  "Physiology or Medicine": "Физиология и медицина",
  Literature: "Литература",
  Peace: "Премия мира",
  "Economic Sciences": "Экономические науки",
};

export function categoryLabel(englishName) {
  return CATEGORY_EN_TO_RU[englishName] ?? englishName;
}
