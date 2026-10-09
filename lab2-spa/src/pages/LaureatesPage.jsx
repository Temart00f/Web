import { useEffect, useState } from "react";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import LaureatesService from "../services/LaureatesService";
import { CATEGORY_OPTIONS } from "../utils/format";

const PAGE_SIZE = 20;
const laureatesService = new LaureatesService();

const laureateColumns = [
  { key: "name", label: "Имя / название" },
  { key: "date", label: "Дата рождения / основания" },
  { key: "count", label: "Число премий" },
];

export default function LaureatesPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ждём, пока пользователь перестанет печатать, чтобы не слать
  // запрос на каждое нажатие клавиши.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      setError(null);
      laureatesService
        .list({ page, pageSize: PAGE_SIZE, filters: { name, category } })
        .then((result) => {
          setRows(result.rows);
          setTotal(result.total);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, name, category]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main>
      <h2>Лауреаты Нобелевской премии</h2>
      <p className="lead">Люди и организации, получившие премию</p>

      <div className="filters">
        <input
          type="text"
          placeholder="Поиск по имени…"
          value={name}
          onChange={(e) => {
            setPage(1);
            setName(e.target.value);
          }}
        />
        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
        >
          <option value="">Все категории</option>
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="status">Загрузка…</p>
      ) : (
        <>
          <Table columns={laureateColumns} data={rows} badgeColumn="count" />
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </main>
  );
}
