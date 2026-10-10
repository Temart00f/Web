import ApiClient, { type QueryParams } from "./ApiClient";
import { formatDate } from "../utils/format";
import type {
  ApiLaureate,
  ApiLaureatesResponse,
  LaureateFilters,
  LaureateRow,
  ListParams,
  ListResult,
} from "../types";

const client = new ApiClient();

function mapLaureate(item: ApiLaureate): LaureateRow {
  const name = item.knownName?.en ?? item.orgName?.en ?? "—";
  const date = item.birth?.date ?? item.founded?.date ?? null;
  return {
    name,
    date: formatDate(date),
    count: item.nobelPrizes?.length ?? 0,
  };
}

export default class LaureatesService {
  // page — номер страницы (с 1), pageSize — размер страницы,
  // filters — { name, category } для фильтрации на стороне API.
  async list({
    page = 1,
    pageSize = 20,
    filters = {},
  }: ListParams<LaureateFilters> = {}): Promise<ListResult<LaureateRow>> {
    const params: QueryParams = {
      offset: (page - 1) * pageSize,
      limit: pageSize,
    };
    if (filters.name) params.name = filters.name;
    if (filters.category) params.nobelPrizeCategory = filters.category;

    const data = await client.get<ApiLaureatesResponse>("/laureates", params);
    return {
      rows: (data.laureates ?? []).map(mapLaureate),
      total: data.meta?.count ?? 0,
    };
  }
}
