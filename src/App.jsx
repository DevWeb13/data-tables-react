import React, { useEffect, useState } from 'react';
import './app.css';
import PropTypes from 'prop-types';
import updateResult from './dataManager';

/* COMMENTER LES PROPS */
function App({ employees }) {
  const [selectValue, setSelectValue] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [indexOfPages, setIndexOfPages] = useState(1);
  const [order, setOrder] = useState('asc');
  const [column, setColumn] = useState('firstName');
  const [employeesToRender, setEmployeesToRender] = useState([]);

  function handleSelect(e) {
    setSelectValue(parseInt(e.target.value, 10));
    setIndexOfPages(1);
  }

  function handleSearch(e) {
    setSearchValue(e.target.value);
    setIndexOfPages(1);
  }

  function previousPage() {
    if (indexOfPages > 1) {
      setIndexOfPages(indexOfPages - 1);
    }
  }

  function nextPage() {
    if (indexOfPages < filteredData.length / selectValue) {
      setIndexOfPages(indexOfPages + 1);
    }
  }

  function switchOrder(e) {
    setColumn(e.target.className);
    if (order === 'asc') {
      setOrder('desc');
    } else {
      setOrder('asc');
    }
  }

  /**
   * It takes in a list name and a direction, and returns a string that is either 'ascending' or
   * 'descending' depending on the direction
   * @param {string} listName   List name to column
   * @param {string} direction  Direction to sort
   * @return the value of the variable changeDirection.
   */
  function ariaSortManager(listName, direction) {
    const changeDirection = direction === 'asc' ? 'ascending' : 'descending';
    switch (listName) {
      case 'firstName':
        return changeDirection;
      case 'lastName':
        return changeDirection;
      case 'startDate':
        return changeDirection;
      case 'department':
        return changeDirection;
      case 'dateOfBirth':
        return changeDirection;
      case 'street':
        return changeDirection;
      case 'city':
        return changeDirection;
      case 'state':
        return changeDirection;
      case 'zipCode':
        return changeDirection;
      default:
        return null;
    }
  }

  /**
   * If the direction is 'asc' then return the up arrow, otherwise return the down arrow
   * @param {string} direction  Direction to sort
   * @returns an icon based on the direction of the sort.
   */
  function showIconFaSort(direction) {
    if (direction === 'asc') {
      return <i className="fas fa-sort-up" aria-hidden="true" />;
    }
    return <i className="fas fa-sort-down" aria-hidden="true" />;
  }

  useEffect(() => {
    setEmployeesToRender(
      updateResult(
        employees,
        selectValue,
        searchValue,
        indexOfPages,
        order,
        column,
      )[0],
    );
    setFilteredData(
      updateResult(
        employees,
        selectValue,
        searchValue,
        indexOfPages,
        order,
        column,
      )[1],
    );
  }, [employees, selectValue, searchValue, indexOfPages, order, column]);

  return (
    <div id="employee-div" className="appContainer">
      <div id="employee-table_wrapper" className="dataTablesWrapper no-footer">
        <div className="dataTables_length" id="employee-table_length">
          <label htmlFor="selectButton">
            Show{' '}
            <select
              name="employee-table_length"
              aria-controls="employee-table"
              id="selectButton"
              value={selectValue}
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
              className="form-control form-control-sm"
              placeholder=""
              id="searchInput"
              value={searchValue}
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
                      column === key ? ariaSortManager(column, order) : null
                    }
                    aria-label={`${key}: activate to sort column ${
                      order === 'asc' ? 'descending' : 'ascending'
                    }`}
                  >
                    {key}
                    {column === key ? showIconFaSort(order) : null}
                  </th>
                ),
            )}
          </tr>
        </thead>
        <tbody>
          {employeesToRender.map((employee) => (
            <tr role="row" key={employee.id}>
              {Object.keys(employees[0]).map(
                (key) =>
                  key !== 'id' && (
                    <td
                      key={key}
                      className="sorting_1"
                      aria-controls="employee-table"
                      rowSpan={1}
                      colSpan={1}
                      aria-sort={
                        column === key ? ariaSortManager(column, order) : null
                      }
                      aria-label={`${key}: activate to sort column ${
                        order === 'asc' ? 'descending' : 'ascending'
                      }`}
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
          {employeesToRender.indexOf(employeesToRender[0]) +
            1 +
            selectValue * (indexOfPages - 1)}{' '}
          to{' '}
          {filteredData.length < selectValue
            ? employeesToRender.length
            : employeesToRender.length + selectValue * (indexOfPages - 1)}{' '}
          of {filteredData.length} entries
        </div>
        <div
          className="dataTables_paginate paging_simple_numbers"
          id="employee-table_paginate"
        >
          <button
            type="button"
            className="paginate_button previous"
            aria-controls="employee-table"
            data-dt-idx="0"
            tabIndex={-1}
            id="employee-table_previous"
            onClick={() => previousPage()}
          >
            Previous
          </button>

          <div className="paginate_button current">{indexOfPages}</div>

          <button
            type="button"
            className="paginate_button next"
            aria-controls="employee-table"
            data-dt-idx="2"
            tabIndex={-1}
            id="employee-table_next"
            onClick={() => nextPage()}
          >
            Next
          </button>
        </div>
      </div>
      <a href="index.html">Home</a>
    </div>
  );
}

App.defaultProps = null;

App.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      startDate: PropTypes.string,
      department: PropTypes.string,
      dateOfBirth: PropTypes.string,
      street: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zipCode: PropTypes.string,
    }),
  ),
};

export default App;
