const AreaColumn = (toggleRowExpansion, isRowExpanded) => [
  {
    id: "expander",

    Header: "Expand",

    accessor: () => null,

    Cell: ({ row }) =>
      row.original.Sublevel && row.original.Sublevel.length > 0 ? (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => toggleRowExpansion(row)}
        >
          {isRowExpanded(row) ? "-" : "+"}
        </span>
      ) : null,

    disableSortBy: true,

    disableFilters: true,
  },

  {
    Header: "Instance",

    accessor: "Instance",
  },

  {
    Header: "Module",

    accessor: "Module",
  },

  {
    Header: "Cell_Count",

    accessor: "Cell_Count",

    disableSortBy: true,

    disableFilters: true,
  },

  {
    Header: "Cell_Area",

    accessor: "Cell_Area",

    disableSortBy: true,

    disableFilters: true,
  },

  {
    Header: "Net_Area",

    accessor: "Net_Area",

    disableSortBy: true,

    disableFilters: true,
  },

  {
    Header: "Total_Area",

    accessor: "Total_Area",

    disableSortBy: true,

    disableFilters: true,
  },

  {
    Header: "Wireload",

    accessor: "Wireload",

    disableSortBy: true,

    disableFilters: true,
  },
];

export default AreaColumn;
