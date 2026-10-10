import axios, { type AxiosInstance } from "axios";

const BASE_URL = "https://api.nobelprize.org/2.1";

export type QueryParams = Record<string, string | number>;

// Единая точка входа для всех запросов к Nobel Prize API.
// Каждый сервис получает готовый инстанс axios с базовым адресом
// и не занимается настройкой запросов самостоятельно.
export default class ApiClient {
  private http: AxiosInstance;

  constructor(baseURL: string = BASE_URL) {
    this.http = axios.create({ baseURL, timeout: 10000 });
  }

  async get<T>(path: string, params: QueryParams = {}): Promise<T> {
    try {
      const response = await this.http.get<T>(path, { params });
      return response.data;
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response
          ? `Ошибка API (${error.response.status}): ${path}`
          : `Не удалось связаться с API: ${(error as Error).message}`;
      throw new Error(message);
    }
  }
}
