// Ответы Nobel Prize API v2.1 — описаны только поля, которые использует приложение.

export type LocalizedText = {
  en: string;
};

export type ApiMeta = {
  count: number;
};

export type ApiLaureate = {
  knownName?: LocalizedText;
  orgName?: LocalizedText;
  birth?: { date?: string };
  founded?: { date?: string };
  nobelPrizes?: unknown[];
};

export type ApiLaureatesResponse = {
  laureates?: ApiLaureate[];
  meta?: ApiMeta;
};

export type ApiPrize = {
  awardYear: string;
  category?: LocalizedText;
  dateAwarded?: string;
  prizeAmount: number;
  laureates?: Pick<ApiLaureate, "knownName" | "orgName">[];
};

export type ApiPrizesResponse = {
  nobelPrizes?: ApiPrize[];
  meta?: ApiMeta;
};

// Данные в том виде, в котором их показывают таблицы.

export type LaureateRow = {
  name: string;
  date: string;
  count: number;
};

export type PrizeRow = {
  category: string;
  date: string;
  grant: string;
  laureates: string;
};

export type LaureateFilters = {
  name?: string;
  category?: string;
};

export type PrizeFilters = {
  category?: string;
  year?: string;
};

export type ListParams<F> = {
  page?: number;
  pageSize?: number;
  filters?: F;
};

export type ListResult<T> = {
  rows: T[];
  total: number;
};
