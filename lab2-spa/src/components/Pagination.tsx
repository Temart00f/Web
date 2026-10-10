type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}>
        ← Назад
      </button>
      <span>
        Страница {page} из {totalPages}
      </span>
      <button disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Вперёд →
      </button>
    </div>
  );
}
