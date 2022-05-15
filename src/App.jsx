import React from 'react';
import './app.css';

function App() {
  return (

    <div id="employee-div" className="App-container">
      <h1>Current Employees</h1>
      <div id="employee-table_wrapper" className="dataTables_wrapper no-footer">
        <div className="dataTables_length" id="employee-table_length">
          <label htmlFor="selectButton">
            Show
            {' '}
            <select name="employee-table_length" aria-controls="employee-table" className="form-control form-control-sm" id="selectButton">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            {' '}
            entries
          </label>
        </div>
        <div id="employee-table_filter" className="dataTables_filter">
          <label htmlFor="searchInput">
            Search:
            {' '}
            <input type="search" className="form-control form-control-sm" placeholder="" aria-controls="employee-table" id="searchInput" />
          </label>
        </div>
      </div>
      <table id="employee-table" className="display dataTable no-footer" role="grid" aria-describedby="employee-table_info">
        <thead>
          <tr role="row">
            <th className="sorting_asc" tabIndex={0} aria-controls="employee-table" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="First Name: activate to sort column descending">First Name</th>
            <th className="sorting" tabIndex={0} aria-controls="employee-table" rowSpan={1} colSpan={1} aria-label="Last Name: activate to sort column ascending">Last Name</th>
            <th className="sorting" tabIndex={0} aria-controls="employee-table" rowSpan={1} colSpan={1} aria-label="Start Date: activate to sort column ascending">Start Date</th>
            <th className="sorting" tabIndex={0} aria-controls="employee-table" rowSpan={1} colSpan={1} aria-label="Department: activate to sort column ascending">Department</th>
            <th className="sorting" tabIndex={0} aria-controls="employee-table" rowSpan={1} colSpan={1} aria-label="Date of Birth: activate to sort column ascending">Date of Birth</th>
            <th className="sorting" tabIndex={0} aria-controls="employee-table" rowSpan={1} colSpan={1} aria-label="Street: activate to sort column ascending">Street</th>
            <th className="sorting" tabIndex={0} aria-controls="employee-table" rowSpan={1} colSpan={1} aria-label="City: activate to sort column ascending">City</th>
            <th className="sorting" tabIndex={0} aria-controls="employee-table" rowSpan={1} colSpan={1} aria-label="State: activate to sort column ascending">State</th>
            <th className="sorting" tabIndex={0} aria-controls="employee-table" rowSpan={1} colSpan={1} aria-label="Zip Code: activate to sort column ascending">Zip Code</th>
          </tr>
        </thead>
        <tbody>
          <tr role="row" className="odd">
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
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default App;
