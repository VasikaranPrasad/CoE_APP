import React, { useState, useCallback, useMemo, Fragment } from "react";

import { useTable, useFilters, useSortBy, useExpanded } from "react-table";

import { FaSort, FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";

import AreaColumn from "./areaColumns";

const TableContainer = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const isRowExpanded = useCallback(
    (row) => expandedRows.includes(row.id),

    [expandedRows]
  );

  const toggleRowExpansion = useCallback(
    (row) => {
      const rowId = row.id;

      if (isRowExpanded(row)) {
        setExpandedRows((prevExpandedRows) =>
          prevExpandedRows.filter((id) => id !== rowId)
        );
      } else {
        setExpandedRows((prevExpandedRows) => [...prevExpandedRows, rowId]);
      }
    },

    [isRowExpanded]
  );

  const columns = useMemo(
    () => AreaColumn(toggleRowExpansion, isRowExpanded),

    [toggleRowExpansion, isRowExpanded]
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),

    []
  );

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow,

    state,

    // setGlobalFilter,
  } = useTable(
    {
      columns,

      data,

      defaultColumn,
    },

    useFilters,

    useSortBy,

    useExpanded
  );

  // const { globalFilter } = state;

  const generateSortingIndicator = (column) => {
    return (
      <span style={{ color: "black" }}>
        {column.isSorted ? (
          column.isSortedDesc ? (
            <FaSortAlphaDownAlt />
          ) : (
            <FaSortAlphaDown />
          )
        ) : (
          <FaSort />
        )}
      </span>
    );
  };

  return (
    <div>
      {/* <input

        type="text"

        value={globalFilter || ""}

        onChange={(e) => setGlobalFilter(e.target.value)}

        placeholder="Search"

      /> */}

      <table {...getTableProps()} style={{ borderCollapse: "collapse" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    border: "1px solid black",

                    padding: "8px",

                    backgroundColor: "lightgray",
                  }}
                >
                  <div
                    className="d-flex align-items-center"
                    {...column.getSortByToggleProps()}
                  >
                    {column.render("Header")}

                    {column.disableSortBy
                      ? ""
                      : generateSortingIndicator(column)}
                  </div>

                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            const isExpanded = isRowExpanded(row);

            return (
              <Fragment key={row.getRowProps().key}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        border: "1px solid black",

                        padding: "8px",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>

                {isExpanded &&
                  row.original.Sublevel &&
                  row.original.Sublevel.length > 0 &&
                  row.original.Sublevel.map((subRow, index) => (
                    <tr key={`${row.id}-subrow-${index}`}>
                      <td
                        colSpan={columns.length}
                        style={{ paddingLeft: "20px" }}
                      >
                        <TableContainer data={[subRow]} />
                      </td>
                    </tr>
                  ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Filter..."
    />
  );
};

export default TableContainer;
