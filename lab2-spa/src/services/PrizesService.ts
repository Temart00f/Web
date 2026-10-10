import ApiClient, { type QueryParams } from "./ApiClient";
import { formatDate, categoryLabel } from "../utils/format";
import type {
  ApiPrize,
  ApiPrizesResponse,
  ListParams,
  ListResult,
  PrizeFilters,
  PrizeRow,
} from "../types";

const client = new ApiClient();

function mapPrize(item: ApiPrize): PrizeRow {
  const laureateNames = (item.laureates ?? [])
    .map((l) => l.knownName?.en ?? l.orgName?.en)
    .filter(Boolean)
    .join(", ");
  // В некоторые годы (например, во время мировых войн) премию не вручали:
  // у таких записей нет лауреатов, а дата вручения бывает не указана.
  return {
    category: categoryLabel(item.category?.en),
    date: formatDate(item.dateAwarded ?? item.awardYear),
    grant: `${item.prizeAmount.toLocaleString("ru-RU")} SEK`,
    laureates: laureateNames || "Не присуждалась",
  };
}

export default class PrizesService {
  // page — номер страницы (с 1), pageSize — размер страницы,
  // filters — { category, year } для фильтрации на стороне API.
  async list({
    page = 1,
    pageSize = 20,
    filters = {},
  }: ListParams<PrizeFilters> = {}): Promise<ListResult<PrizeRow>> {
    const params: QueryParams = {
      offset: (page - 1) * pageSize,
      limit: pageSize,
    };
    if (filters.category) params.nobelPrizeCategory = filters.category;
    if (filters.year) params.nobelPrizeYear = filters.year;

    const data = await client.get<ApiPrizesResponse>("/nobelPrizes", params);
    return {
      rows: (data.nobelPrizes ?? []).map(mapPrize),
      total: data.meta?.count ?? 0,
    };
  }
}
