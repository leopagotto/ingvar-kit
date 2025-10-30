import React, { useState } from "react";
import { Icon } from "../Icon/Icon";

/**
 * Table Component
 *
 * Data table with sorting and custom rendering.
 * Based on IKEA Ingka Skapa design system.
 *
 * @see https://npm.m2.blue.cdtapps.com/@ingka/table
 */

export interface TableColumn<T> {
  /** Column header text */
  header: string;

  /** Data accessor (key or function) */
  accessor: keyof T | ((row: T) => any);

  /** Column width (CSS value) */
  width?: string;

  /** Column alignment */
  align?: "left" | "center" | "right";

  /** Custom cell renderer */
  cell?: (value: any, row: T) => React.ReactNode;

  /** Enable sorting */
  sortable?: boolean;
}

export interface TableProps<T> {
  /** Table data */
  data: T[];

  /** Column definitions */
  columns: TableColumn<T>[];

  /** Row click handler */
  onRowClick?: (row: T) => void;

  /** Show striped rows */
  striped?: boolean;

  /** Show hover effect on rows */
  hoverable?: boolean;

  /** Show borders */
  bordered?: boolean;

  /** Compact table spacing */
  compact?: boolean;

  /** Loading state */
  loading?: boolean;

  /** Empty state message */
  emptyMessage?: string;

  /** Additional CSS classes */
  className?: string;
}

type SortDirection = "asc" | "desc" | null;

/**
 * Table component
 */
export function Table<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  loading = false,
  emptyMessage = "No data available",
  className = "",
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (columnHeader: string, sortable?: boolean) => {
    if (!sortable) return;

    if (sortColumn === columnHeader) {
      // Toggle direction: asc -> desc -> null
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
      }
    } else {
      setSortColumn(columnHeader);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    const column = columns.find((col) => col.header === sortColumn);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue =
        typeof column.accessor === "function"
          ? column.accessor(a)
          : a[column.accessor];
      const bValue =
        typeof column.accessor === "function"
          ? column.accessor(b)
          : b[column.accessor];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, columns, sortColumn, sortDirection]);

  const tableClasses = [
    "w-full border-collapse",
    bordered && "border border-gray-200",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const thClasses = [
    "text-left font-medium text-gray-700 bg-gray-50",
    compact ? "px-3 py-2 text-sm" : "px-4 py-3",
    bordered && "border-b border-gray-200",
  ]
    .filter(Boolean)
    .join(" ");

  const tdClasses = (index: number) =>
    [
      compact ? "px-3 py-2 text-sm" : "px-4 py-3",
      striped && index % 2 === 1 && "bg-gray-50",
      bordered && "border-b border-gray-200",
    ]
      .filter(Boolean)
      .join(" ");

  const trClasses = (clickable: boolean) =>
    [
      clickable && "cursor-pointer",
      hoverable && "hover:bg-gray-50",
      "transition-colors",
    ]
      .filter(Boolean)
      .join(" ");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className={tableClasses}>
        <thead>
          <tr>
            {columns.map((column) => {
              const isSorted = sortColumn === column.header;
              const alignClass =
                column.align === "center"
                  ? "text-center"
                  : column.align === "right"
                  ? "text-right"
                  : "text-left";

              return (
                <th
                  key={column.header}
                  className={`${thClasses} ${alignClass}`}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column.header, column.sortable)}
                >
                  <div
                    className={`flex items-center gap-1 ${
                      column.sortable ? "cursor-pointer select-none" : ""
                    }`}
                  >
                    <span>{column.header}</span>
                    {column.sortable && (
                      <span className="flex flex-col">
                        {isSorted && sortDirection === "asc" && (
                          <Icon name="chevron-up-small" size="xs" decorative />
                        )}
                        {isSorted && sortDirection === "desc" && (
                          <Icon
                            name="chevron-down-small"
                            size="xs"
                            decorative
                          />
                        )}
                        {!isSorted && (
                          <Icon
                            name="chevron-up-chevron-down-small"
                            size="xs"
                            decorative
                          />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={trClasses(!!onRowClick)}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => {
                const value =
                  typeof column.accessor === "function"
                    ? column.accessor(row)
                    : row[column.accessor];

                const alignClass =
                  column.align === "center"
                    ? "text-center"
                    : column.align === "right"
                    ? "text-right"
                    : "text-left";

                return (
                  <td
                    key={String(column.header)}
                    className={`${tdClasses(rowIndex)} ${alignClass}`}
                  >
                    {column.cell ? column.cell(value, row) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
