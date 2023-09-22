import fetchContacts from './searchContact.js';
let editContactId; 

window.openEditModal = function(contactId) {
  const modal = document.getElementById("editModal");
  modal.style.display = "block";
  editContactId = contactId;
}
 
// Function to close the delete modal
window.closeEditModal = function() {
  const modal = document.getElementById("editModal");
  modal.style.display = "none";
}

// Function to confirm the delete action
window.confirmEdit = function() {
  if (editContactId !== undefined) {
  const apiUrl = "http://baristabook.xyz/LAMPAPI/editContacts.php";
  // Get contact values
  const newName = document.getElementById("editName").value;
  const newPhone = document.getElementById("editPhone").value;
  const newEmail = document.getElementById("editEmail").value;

  const requestData = {
    id: editContactId,
    name: newName,
    phone: newPhone,
    email: newEmail,
  };

  // Define the request options
  const requestOptions = {
    method: "PATCH",
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
    closeEditModal();
  })
  .catch(error => {
    console.error("Error Editing contacts:", error);
  });
  }
}