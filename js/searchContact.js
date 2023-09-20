// populate userModel with saved session data
const userModel = {
  id: sessionStorage.getItem('id'),
  firstName: sessionStorage.getItem('firstName'),
  lastName: sessionStorage.getItem('lastName'),
  phone: sessionStorage.getItem('phone',),
  email: sessionStorage.getItem('email'),
}

function fetchContacts() {
  const apiUrl = "http://baristabook.xyz/LAMPAPI/SearchContacts.php";

  // Define the request data
  const requestData = {
    userId: userModel.id,
    search: ""
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
      // Data is an array of contacts
      renderContacts(data);
    })
    .catch(error => {
      console.error("Error fetching contacts:", error);
    });
}

// Function to render contacts in HTML
function renderContacts(contacts) {
  const contactListContainer = document.getElementById("contactList");

  // Clear the container before rendering
  contactListContainer.innerHTML = "";

  // Iterate through the contacts and create HTML elements
  contacts.forEach(contact => {
    const contactElement = document.createElement("div");
    contactElement.innerHTML = `
      <p>Name: ${contact.name}</p>
      <p>Phone: ${contact.phone}</p>
      <p>Email: ${contact.email}</p>
    `;
    contactListContainer.appendChild(contactElement);
  });
}

// Call the fetchContacts function when the page loads
window.addEventListener("load", fetchContacts);