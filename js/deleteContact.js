/*
import fetchContacts  from './searchContact.js';
let currentContactId; 

function openDeleteModal(contactId) {
  const modal = document.getElementById("deleteModal");
  modal.style.display = "block";
  currentContactId = contactId;
}

function printSomething() {
  console.log('button click!');
}

// Function to close the delete modal
function closeDeleteModal() {
  const modal = document.getElementById("deleteModal");
  modal.style.display = "none";
}

// Function to confirm the delete action
function confirmDelete() {
  if (currentContactId !== undefined) {
  const apiUrl = "http://baristabook.xyz/LAMPAPI/DeleteContacts.php";

  const requestData = {
    contactId: currentContactId,
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
    // After we delete, refresh the table 
    fetchContacts();
    closeDeleteModal();
  })
  .catch(error => {
    console.error("Error fetching contacts:", error);
  });
  }
}
*/