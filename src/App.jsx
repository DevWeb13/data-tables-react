import React, { useEffect, useState } from 'react';
import './app.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import updateResult from './updateResult';

/**
 *
 * @param {Object} props
 * @param {Array} props.employees
 * @component
 */
function App({ employees }) {
  const [data, setData] = useState({
    selectValue: 10,
    searchValue: '',
    filteredData: [],
    indexOfPages: 1,
    order: 'asc',
    column:
      employees && employees.length !== 0 ? Object.keys(employees[0])[1] : '',
    employeesToRender: [],
  });

  function handleSelect(e) {
    setData({
      ...data,
      selectValue: parseInt(e.target.value, 10),
      indexOfPages: 1,
    });
  }

  function handleSearch(e) {
    setData({
      ...data,
      searchValue: e.target.value,
      indexOfPages: 1,
    });
  }

  function previousPage() {
    if (data.indexOfPages > 1) {
      setData({
        ...data,
        indexOfPages: data.indexOfPages - 1,
      });
    }
  }

  function nextPage() {
    if (data.indexOfPages < data.filteredData.length / data.selectValue) {
      setData({
        ...data,
        indexOfPages: data.indexOfPages + 1,
      });
    }
  }

  function switchOrder(e) {
    setData({
      ...data,
      column: e.target.className,
      order: data.order === 'asc' ? 'desc' : 'asc',
    });
  }

  /**
   * It takes a string as an argument and returns a string
   * @param {string} order  direction to sort
   * @return the value of the variable changeOrder.
   */
  function ariaManager(order) {
    return order === 'asc' ? 'ascending' : 'descending';
  }

  /**
   * If the direction is 'asc' then return the up arrow, otherwise return the down arrow
   * @param {string} direction  Direction to sort
   * @returns an icon based on the direction of the sort.
   */
  function showIconFaSort(direction) {
    if (direction === 'asc') {
      return <FontAwesomeIcon icon={faSortDown} />;
    }
    return <FontAwesomeIcon icon={faSortUp} />;
  }

  function trClassManager(i) {
    let trClass = '';
    if (i % 2 === 0) {
      trClass = 'dark';
      return trClass;
    }
    trClass = 'light';
    return trClass;
  }

  /**
   * If the column is the same as the key and the row is even, then the tdClass is darkBold. If the
   * column is the same as the key and the row is odd, then the tdClass is lightBold
   * @param {string} key  Key of the object
   * @param {string} column  Column to sort
   * @param {number} i  Index of the row
   * @returns a string that will be used as a class name for a table cell.
   */
  function tdClassManager(i, column, key) {
    let tdClass = '';
    if (column === key && i % 2 === 0) {
      tdClass = 'darkBold';
    }
    if (column === key && i % 2 !== 0) {
      tdClass = 'lightBold';
    }
    return tdClass;
  }

  useEffect(() => {
    setData({
      ...data,
      filteredData: updateResult(
        employees,
        data.selectValue,
        data.searchValue,
        data.indexOfPages,
        data.order,
        data.column,
      )[1],
      employeesToRender: updateResult(
        employees,
        data.selectValue,
        data.searchValue,
        data.indexOfPages,
        data.order,
        data.column,
      )[0],
    });
  }, [
    employees,
    data.selectValue,
    data.searchValue,
    data.indexOfPages,
    data.order,
    data.column,
  ]);

  return employees && employees.length !== 0 ? (
    <div id="employee-div" className="appContainer">
      <div id="employee-table_wrapper" className="dataTablesWrapper no-footer">
        <div className="dataTables_length" id="employee-table_length">
          <label htmlFor="selectButton">
            Show{' '}
            <select
              name="employee-table_length"
              aria-controls="employee-table"
              id="selectButton"
              value={data.selectValue}
              onChange={handleSelect}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>{' '}
            entries
          </label>
        </div>
        <div id="employee-table_filter" className="dataTables_filter">
          <label htmlFor="searchInput">
            Search:{' '}
            <input
              type="search"
              id="searchInput"
              value={data.searchValue}
              onChange={handleSearch}
            />
          </label>
        </div>
      </div>
      <table
        id="employee-table"
        className="display dataTable no-footer"
        role="grid"
        aria-describedby="employee-table_info"
      >
        <thead>
          <tr role="row">
            {Object.keys(employees[0]).map(
              (key) =>
                key !== 'id' && (
                  <th
                    key={key}
                    className={key}
                    tabIndex={0}
                    aria-controls="employee-table"
                    rowSpan={1}
                    colSpan={1}
                    onClick={switchOrder}
                    aria-sort={
                      data.column === key ? ariaManager(data.order) : 'none'
                    }
                    aria-label={`${key}: activate to sort column ${
                      data.order === 'asc' ? 'descending' : 'ascending'
                    }`}
                  >
                    {key}
                    {data.column === key ? showIconFaSort(data.order) : null}
                  </th>
                ),
            )}
          </tr>
        </thead>
        <tbody>
          {data.employeesToRender.map((employee, index) => (
            <tr role="row" key={employee.id} className={trClassManager(index)}>
              {Object.keys(employees[0]).map(
                (key) =>
                  key !== 'id' && (
                    <td
                      key={key}
                      className={tdClassManager(index, data.column, key)}
                      aria-controls="employee-table"
                      rowSpan={1}
                      colSpan={1}
                      aria-sort={
                        data.column === key ? ariaManager(data.order) : 'none'
                      }
                      aria-label={
                        data.column === key
                          ? `${key}: ${ariaManager(data.order)}`
                          : key
                      }
                    >
                      {employee[key]}
                    </td>
                  ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="dataTablesWrapper">
        <div
          className="dataTables_info"
          id="employee-table_info"
          role="status"
          aria-live="polite"
        >
          Showing{' '}
          {data.employeesToRender.indexOf(data.employeesToRender[0]) +
            1 +
            data.selectValue * (data.indexOfPages - 1)}{' '}
          to{' '}
          {data.filteredData.length < data.selectValue
            ? data.employeesToRender.length
            : data.employeesToRender.length +
              data.selectValue * (data.indexOfPages - 1)}{' '}
          of {data.filteredData.length} entries
        </div>
        <div className="dataTables_paginate" id="employee-table_paginate">
          {data.indexOfPages > 1 && (
            <button
              type="button"
              className="paginate_button previous"
              aria-controls="employee-table"
              tabIndex={-1}
              id="employee-table_previous"
              onClick={() => previousPage()}
            >
              Previous
            </button>
          )}

          <div className="paginate_button current">{data.indexOfPages}</div>
          {data.indexOfPages < data.filteredData.length / data.selectValue && (
            <button
              type="button"
              className="paginate_button next"
              aria-controls="employee-table"
              tabIndex={-1}
              id="employee-table_next"
              onClick={() => nextPage()}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="appContainer">
      <h2 className="noData">No data available in table</h2>
    </div>
  );
}

App.defaultProps = {
  employees: [
    {
      id: 1,
    },
  ],
};

App.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default App;
