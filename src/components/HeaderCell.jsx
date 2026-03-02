import ArrowsIcon from "../assets/sorting.svg?react";
import FilterIcon from "../assets/filter.svg?react";
import Options from "./Options";

// tried to make the component as dumb as possible (responsible for ui only)
// logic is mainly in UserTable
export default function HeaderCell({
  column,
  sortOrder,
  isFilterOpen,
  isFilterActive,
  onSort,
  onToggleFilter,
  onFilterChange,
  filter
}) {
  return (
    <th scope="col" aria-sort={sortOrder}>
      <div className="th-content">
        <span className="th-text">{column.label}</span>

        {column.sortable && (
          <button type="button" onClick={onSort}>
            <ArrowsIcon className={`sort-icon ${sortOrder}`} />
          </button>
        )}

        {column.filtrable && (
          <>
            <button type="button" onClick={onToggleFilter}>
              <FilterIcon
                className={`filter-icon ${
                  isFilterActive ? "active" : ""
                }`}
              />
            </button>

            {isFilterOpen && (
              <Options
                options={column.filterOptions}
                onChange={onFilterChange}
                checkedOption={filter?.value}
              />
            )}
          </>
        )}
      </div>
    </th>
  );
}