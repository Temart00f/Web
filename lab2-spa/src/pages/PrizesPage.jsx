import { useEffect, useState } from "react";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import PrizesService from "../services/PrizesService";
import { CATEGORY_OPTIONS } from "../utils/format";

const PAGE_SIZE = 20;
const prizesService = new PrizesService();

const prizeColumns = [
  { key: "category", label: "Категория" },
  { key: "date", label: "Дата вручения" },
  { key: "grant", label: "Грант" },
  { key: "laureates", label: "Лауреаты" },
];

export default function PrizesPage() {
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      setError(null);
      prizesService
        .list({ page, pageSize: PAGE_SIZE, filters: { category, year } })
        .then((result) => {
          setRows(result.rows);
          setTotal(result.total);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, category, year]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main>
      <h2>Премии по годам и категориям</h2>
      <p className="lead">Дата вручения, размер гранта и лауреаты</p>

      <div className="filters">
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
        <input
          type="number"
          placeholder="Год, напр. 2020"
          value={year}
          onChange={(e) => {
            setPage(1);
            setYear(e.target.value);
          }}
        />
      </div>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="status">Загрузка…</p>
      ) : (
        <>
          <Table columns={prizeColumns} data={rows} badgeColumn="grant" />
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </main>
  );
}
