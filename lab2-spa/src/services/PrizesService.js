import ApiClient from "./ApiClient";
import { formatDate, categoryLabel } from "../utils/format";

const client = new ApiClient();

function mapPrize(item) {
  const laureateNames = (item.laureates ?? [])
    .map((l) => l.knownName?.en ?? l.orgName?.en)
    .filter(Boolean)
    .join(", ");
  return {
    category: categoryLabel(item.category?.en),
    date: formatDate(item.dateAwarded),
    grant: `${item.prizeAmount.toLocaleString("ru-RU")} SEK`,
    laureates: laureateNames || "—",
  };
}

export default class PrizesService {
  // page — номер страницы (с 1), pageSize — размер страницы,
  // filters — { category, year } для фильтрации на стороне API.
  async list({ page = 1, pageSize = 20, filters = {} } = {}) {
    const params = {
      offset: (page - 1) * pageSize,
      limit: pageSize,
    };
    if (filters.category) params.nobelPrizeCategory = filters.category;
    if (filters.year) params.nobelPrizeYear = filters.year;

    const data = await client.get("/nobelPrizes", params);
    return {
      rows: (data.nobelPrizes ?? []).map(mapPrize),
      total: data.meta?.count ?? 0,
    };
  }
}
