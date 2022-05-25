/**
 * The function takes in an array and a value, and returns a new array with the filtered data
 * @param {array} array - the array of data to be filtered
 * @param {string} value - the value of the search input
 * @return {array} a new array of employees that match the search criteria.
 */
function search(array, value) {
  let newfilteredData = [];
  if (value.length === 0) {
    newfilteredData = array;
  } else {
    newfilteredData = array.filter((employee) => {
      return (
        employee.firstName.toLowerCase().includes(value.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(value.toLowerCase())
      );
    });
  }
  return newfilteredData;
}

/**
 * It takes in an array of objects, a string, and another string, and returns the array of objects
 * sorted by the string in ascending or descending order
 * @param {array}  data - the data that you want to sort
 * @param {string} type - the column name that you want to sort by
 * @param {string} meaning - asc or desc
 * @return {array} - the sorted array
 */
function columnChooseAndSort(data, type, meaning) {
  switch (type) {
    case 'firstName':
      if (meaning === 'asc') {
        data.sort((a, b) => {
          return a.firstName.localeCompare(b.firstName);
        });
      } else if (meaning === 'desc') {
        data.sort((a, b) => {
          return b.firstName.localeCompare(a.firstName);
        });
      }
      break;
    case 'lastName':
      if (meaning === 'asc') {
        data.sort((a, b) => {
          return a.lastName.localeCompare(b.lastName);
        });
      } else if (meaning === 'desc') {
        data.sort((a, b) => {
          return b.lastName.localeCompare(a.lastName);
        });
      }
      break;
    case 'startDate':
      if (meaning === 'asc') {
        data.sort((a, b) => {
          return a.startDate.localeCompare(b.startDate);
        });
      } else if (meaning === 'desc') {
        data.sort((a, b) => {
          return b.startDate.localeCompare(a.startDate);
        });
      }
      break;
    case 'department':
      if (meaning === 'asc') {
        data.sort((a, b) => {
          return a.department.localeCompare(b.department);
        });
      } else if (meaning === 'desc') {
        data.sort((a, b) => {
          return b.department.localeCompare(a.department);
        });
      }
      break;
    case 'dateOfBirth':
      if (meaning === 'asc') {
        data.sort((a, b) => {
          return a.dateOfBirth.localeCompare(b.dateOfBirth);
        });
      } else if (meaning === 'desc') {
        data.sort((a, b) => {
          return b.dateOfBirth.localeCompare(a.dateOfBirth);
        });
      }
      break;
    case 'street':
      if (meaning === 'asc') {
        data.sort((a, b) => {
          return a.street.localeCompare(b.street);
        });
      } else if (meaning === 'desc') {
        data.sort((a, b) => {
          return b.street.localeCompare(a.street);
        });
      }
      break;
    case 'city':
      if (meaning === 'asc') {
        data.sort((a, b) => {
          return a.city.localeCompare(b.city);
        });
      } else if (meaning === 'desc') {
        data.sort((a, b) => {
          return b.city.localeCompare(a.city);
        });
      }
      break;
    case 'state':
      if (meaning === 'asc') {
        data.sort((a, b) => {
          return a.state.localeCompare(b.state);
        });
      } else if (meaning === 'desc') {
        data.sort((a, b) => {
          return b.state.localeCompare(a.state);
        });
      }
      break;
    case 'zipCode':
      if (meaning === 'asc') {
        data.sort((a, b) => {
          return a.zipCode.localeCompare(b.zipCode);
        });
      } else if (meaning === 'desc') {
        data.sort((a, b) => {
          return b.zipCode.localeCompare(a.zipCode);
        });
      }
      break;
    default:
      if (meaning === 'asc') {
        data.sort((a, b) => {
          return a.firstName.localeCompare(b.firstName);
        });
      } else if (meaning === 'desc') {
        data.sort((a, b) => {
          return b.firstName.localeCompare(a.firstName);
        });
      }
  }
  return data;
}

/**
 * It takes in an array, a page number, and a value, and returns an array of the data that should be
 * displayed on that page
 * @param {array} data - The array of data you want to paginate
 * @param {number} page - The current page number
 * @param {number} value - The number of items you want to display per page.
 * @returns An array of objects
 */
function paginateData(data, page, value) {
  const array = [];
  const startIndex = (page - 1) * value;
  const endIndex = startIndex + value;
  for (let i = startIndex; i < endIndex; i++) {
    if (data[i]) {
      array.push(data[i]);
    }
  }
  return array;
}

/**
 * Updates the list of employees to display on the screen
 *
 * @param   {array}   employees     Employées list
 * @param   {number}  selectValue   number of employees to be displayed on the screen
 * @param   {string}  searchValue   Value of search field
 * @param   {number}  indexOfPages  Page number
 * @param   {string}  order         List order
 * @param   {string}  column        Column to sort
 *
 * @return  {array}  Employees list filtered and at display on the screen
 */
function updateResult(
  employees,
  selectValue,
  searchValue,
  indexOfPages,
  order,
  column,
) {
  let employeesToRender = [];
  let filteredData = [];

  filteredData = search(employees, searchValue);

  filteredData = columnChooseAndSort(filteredData, column, order);

  employeesToRender = paginateData(filteredData, indexOfPages, selectValue);

  return [employeesToRender, filteredData];
}

export default updateResult;
