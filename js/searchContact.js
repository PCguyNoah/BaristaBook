// filter search params
var searchQuery = "";
const searchInput = document.getElementById("searchInput");
const filteredContactsContainer = document.getElementById("filteredContacts");

export default function fetchContacts() {
  const apiUrl = "http://baristabook.xyz/LAMPAPI/SearchContacts.php";
  const resultDiv = document.getElementById("result-search");

  // Define the request data
  const requestData = {
    userId: sessionStorage.getItem('id'),
    search: searchQuery
  };

  // Define the request options
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  };

  // Fetch contacts from the API
  fetch(apiUrl, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
    })
    .then(data => {
      console.log(data);
      if (Array.isArray(data.results)) {
        renderContacts(data.results);
      } else {
        resultDiv.innerHTML = data.error;
      }
    })
    .catch(error => {
      console.error("Error fetching contacts:", error);
    });
}
// This function handles user search
searchInput.addEventListener("keyup", function () {
  searchQuery = searchInput.value.trim(); // Get the user's input
  console.log(searchQuery);
  // Call the API with the search query
  fetchContacts(searchQuery);
});

// Function to render contacts in HTML
function renderContacts(contacts) {
  const contactListContainer = document.getElementById("contactList");

  // Create a table element
  const table = document.createElement("table");

  // Create the table header row
  const tableHeader = document.createElement("tr");
  tableHeader.innerHTML = `
    <th>Name</th>
    <th>Phone</th>
    <th>Email</th>
    <th>Action</th>
  `;

  table.appendChild(tableHeader);

  // Iterate through the contacts and create table rows
  contacts.forEach(contact => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.phone}</td>
      <td>${contact.email}</td>
      <td>
        <button onclick="editRow(this)">Edit</button>
        <button onclick="deleteRow(this)">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });

  // Clear the container and append the table
  contactListContainer.innerHTML = "";
  contactListContainer.appendChild(table);
}


// Call the fetchContacts function when the page loads
window.addEventListener("load", fetchContacts);