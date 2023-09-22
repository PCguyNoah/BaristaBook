let currentContactId; 

function openDeleteModal(contactId) {
  const modal = document.getElementById("deleteModal");
  modal.style.display = "block";
  currentContactId = contactId;
}

  // Add event listeners to the "Delete" buttons
  
  const viewAll = document.getElementById('viewAllButton');

  viewAll.addEventListener("click", function() {
    console.log("Triggered event");
    const deleteButtons = document.getElementsByClassNameAll("delete-button");
    console.log(deleteButtons);
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            console.log("button clicked!");
            const contactId = button.getAttribute("data-contact-id");
            console.log(contactId);
            openDeleteModal(contactId);
        });
    });
  })
 
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