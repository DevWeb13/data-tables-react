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
              className="form-control form-control-sm"
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
            <th
              className="firstName"
              tabIndex={0}
              aria-controls="employee-table"
              rowSpan={1}
              colSpan={1}
              aria-sort="ascending"
              aria-label="First Name: activate to sort column descending"
              onClick={switchOrder}
            >
              First Name
            </th>
            <th
              className="lastName"
              tabIndex={0}
              aria-controls="employee-table"
              rowSpan={1}
              colSpan={1}
              aria-label="Last Name: activate to sort column ascending"
              onClick={switchOrder}
            >
              Last Name
            </th>
            <th
              className="startDate"
              tabIndex={0}
              aria-controls="employee-table"
              rowSpan={1}
              colSpan={1}
              aria-label="Start Date: activate to sort column ascending"
              onClick={switchOrder}
            >
              Start Date
            </th>
            <th
              className="department"
              tabIndex={0}
              aria-controls="employee-table"
              rowSpan={1}
              colSpan={1}
              aria-label="Department: activate to sort column ascending"
              onClick={switchOrder}
            >
              Department
            </th>
            <th
              className="dateOfBirth"
              tabIndex={0}
              aria-controls="employee-table"
              rowSpan={1}
              colSpan={1}
              aria-label="Date of Birth: activate to sort column ascending"
              onClick={switchOrder}
            >
              Date of Birth
            </th>
            <th
              className="street"
              tabIndex={0}
              aria-controls="employee-table"
              rowSpan={1}
              colSpan={1}
              aria-label="Street: activate to sort column ascending"
              onClick={switchOrder}
            >
              Street
            </th>
            <th
              className="city"
              tabIndex={0}
              aria-controls="employee-table"
              rowSpan={1}
              colSpan={1}
              aria-label="City: activate to sort column ascending"
              onClick={switchOrder}
            >
              City
            </th>
            <th
              className="state"
              tabIndex={0}
              aria-controls="employee-table"
              rowSpan={1}
              colSpan={1}
              aria-label="State: activate to sort column ascending"
              onClick={switchOrder}
            >
              State
            </th>
            <th
              className="zipCode"
              tabIndex={0}
              aria-controls="employee-table"
              rowSpan={1}
              colSpan={1}
              aria-label="Zip Code: activate to sort column ascending"
              onClick={switchOrder}
            >
              Zip Code
            </th>
          </tr>
        </thead>
        <tbody>
          {employeesToRender.map((employee) => (
            <tr role="row" key={employee.id}>
              <td
                className="sorting_1"
                aria-controls="employee-table"
                rowSpan={1}
                colSpan={1}
                aria-label="First Name: activate to sort column descending"
              >
                {employee.firstName}
              </td>
              <td
                className="sorting_1"
                aria-controls="employee-table"
                rowSpan={1}
                colSpan={1}
                aria-label="Last Name: activate to sort column ascending"
              >
                {employee.lastName}
              </td>
              <td
                className="sorting_1"
                aria-controls="employee-table"
                rowSpan={1}
                colSpan={1}
                aria-label="Start Date: activate to sort column ascending"
              >
                {employee.startDate}
              </td>
              <td
                className="sorting_1"
                aria-controls="employee-table"
                rowSpan={1}
                colSpan={1}
                aria-label="Department: activate to sort column ascending"
              >
                {employee.department}
              </td>
              <td
                className="sorting_1"
                aria-controls="employee-table"
                rowSpan={1}
                colSpan={1}
                aria-label="Date of Birth: activate to sort column ascending"
              >
                {employee.dateOfBirth}
              </td>
              <td
                className="sorting_1"
                aria-controls="employee-table"
                rowSpan={1}
                colSpan={1}
                aria-label="Street: activate to sort column ascending"
              >
                {employee.street}
              </td>
              <td
                className="sorting_1"
                aria-controls="employee-table"
                rowSpan={1}
                colSpan={1}
                aria-label="City: activate to sort column ascending"
              >
                {employee.city}
              </td>
              <td
                className="sorting_1"
                aria-controls="employee-table"
                rowSpan={1}
                colSpan={1}
                aria-label="State: activate to sort column ascending"
              >
                {employee.state}
              </td>
              <td
                className="sorting_1"
                aria-controls="employee-table"
                rowSpan={1}
                colSpan={1}
                aria-label="Zip Code: activate to sort column ascending"
              >
                {employee.zipCode}
              </td>
            </tr>
          ))}
          {/* <tr role="row" className="odd">
            <td className="sorting_1" />
            <td className="" />
            <td className="">05/14/2022</td>
            <td>Sales</td>
            <td className="" />
            <td className="" />
            <td />
            <td>AL</td>
            <td />
          </tr>
          <tr role="row" className="even">
            <td className="sorting_1">lol</td>
            <td className="" />
            <td className="" />
            <td>Sales</td>
            <td className="" />
            <td className="" />
            <td />
            <td>AL</td>
            <td />
          </tr> */}
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
