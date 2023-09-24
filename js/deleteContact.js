import fetchContacts from './searchContact.js';
let currentContactId; 

window.openDeleteModal = function(contactId) {
  const modal = document.getElementById("deleteModal");
  modal.style.display = "block";
  currentContactId = contactId;
}
 
// Function to close the delete modal
window.closeDeleteModal = function() {
  const modal = document.getElementById("deleteModal");
  modal.style.display = "none";
}

// Function to confirm the delete action
window.confirmDelete = function() {
  if (currentContactId !== undefined) {
  const apiUrl = "http://baristabook.xyz/LAMPAPI/DeleteContacts.php";

  const requestData = {
    id: currentContactId,
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