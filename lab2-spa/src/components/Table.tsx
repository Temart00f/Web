import type { ReactNode } from "react";

export type Column<T> = {
  key: keyof T & string;
  label: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  badgeColumn?: keyof T & string;
};

export default function Table<T extends Record<string, ReactNode>>({
  columns,
  data,
  badgeColumn,
}: TableProps<T>) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.key === badgeColumn ? (
                    <span className="badge">{row[col.key]}</span>
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
