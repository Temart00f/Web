import axios from "axios";

const BASE_URL = "https://api.nobelprize.org/2.1";

// Единая точка входа для всех запросов к Nobel Prize API.
// Каждый сервис получает готовый инстанс axios с базовым адресом
// и не занимается настройкой запросов самостоятельно.
export default class ApiClient {
  constructor(baseURL = BASE_URL) {
    this.http = axios.create({ baseURL, timeout: 10000 });
  }

  async get(path, params = {}) {
    try {
      const response = await this.http.get(path, { params });
      return response.data;
    } catch (error) {
      const message = error.response
        ? `Ошибка API (${error.response.status}): ${path}`
        : `Не удалось связаться с API: ${error.message}`;
      throw new Error(message);
    }
  }
}
