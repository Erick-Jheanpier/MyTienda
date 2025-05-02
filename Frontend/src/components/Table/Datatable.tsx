// Datatable.tsx (Versión final segura)
import React from 'react';

export interface Column<T> {
  key: keyof T;
  label: string;
  formatter?: (value: any) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[] | null | undefined;
  renderActions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
}

const DataTable = <T extends Record<string, any>>({
  columns,
  data = [],
  renderActions,
  emptyMessage = 'No hay registros disponibles'
}: DataTableProps<T>) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
            {renderActions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {safeData.length > 0 ? (
            safeData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.formatter 
                      ? column.formatter(row[column.key])
                      : row[column.key]}
                  </td>
                ))}
                {renderActions && <td>{renderActions(row)}</td>}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={columns.length + (renderActions ? 1 : 0)} 
                className="text-center text-muted py-4"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;