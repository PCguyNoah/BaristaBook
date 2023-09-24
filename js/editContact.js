import fetchContacts from './searchContact.js';
let editContactId;

window.openEditModal = function(contactId, name, phone, email) {
  const modal = document.getElementById("editModal");
  modal.style.display = "block";

  // store old contact info:
  editContactId = contactId;
  document.getElementById("editName").value = name;
  document.getElementById("editPhone").value = phone;
  document.getElementById("editEmail").value = email;
}
 
// Function to close the delete modal
window.closeEditModal = function() {
  const editContactForm = document.getElementById('addContactForm');
  const modal = document.getElementById("editModal");
  modal.style.display = "none";

  // clear fields after we close the modal
  editContactForm.reset();
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