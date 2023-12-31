 // Import the default export
import fetchContacts from './searchContact.js';
let currentContactId;
 // populate userModel with saved session data
 const userModel = {
  id: sessionStorage.getItem('id'),
  firstName: sessionStorage.getItem('firstName'),
  lastName: sessionStorage.getItem('lastName'),
  phone: sessionStorage.getItem('phone',),
  email: sessionStorage.getItem('email'),
}

window.openSuccessModal = function(contactId) {
  const modal = document.getElementById("successfulModal");
  modal.style.display = "block";
  currentContactId = contactId;
}
 
// Function to close the delete modal
window.closeSuccessModal = function() {
  const modal = document.getElementById("successfulModal");
  modal.style.display = "none";
}

// add contact
document.addEventListener("DOMContentLoaded", function () {
  // Set 
  const addContactForm = document.getElementById("addContactForm");
  const resultDiv = document.getElementById("result-contact");
  
  // Home page strings:
  var titleCard = 'Welcome Back, ' + userModel.firstName + '!';
  var nameString = 'Name: ' + userModel.firstName + ' ' + userModel.lastName;
  var phoneString = 'Phone: ' + userModel.phone;
  var emailString = 'E-mail: ' + userModel.email;

  // Set dom variables
  document.getElementById("title-card").innerHTML = titleCard;
  document.getElementById("name-string").innerHTML = nameString;
  document.getElementById("phone-string").innerHTML = phoneString;
  document.getElementById("email-string").innerHTML = emailString;

  // API call for adding contacts
  addContactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get contact values
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;

      // set user id
      console.log("my model:");
      console.log(userModel);
      const userId = userModel.id;

      // Create the contact data object
      const contactData = {
          name: name,
          phone: phone,
          email: email,
          userId: userId
      };
      console.log(contactData);

      // Define the API endpoint URL for adding a contact
      const apiUrl = "http://baristabook.xyz/LAMPAPI/AddContacts.php";

      // Define the request options
      const requestOptions = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(contactData)
      };

      // Make the API request
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
              // Refresh table and close modal on submit
              closeModalFunction();
              openSuccessModal();
          })
          .catch(error => {
              resultDiv.innerHTML = "Error: " + error.message;
          });

      // You can clear the form fields if needed
      addContactForm.reset();
  });
});


// Handle modal trigger
// Get references to the modal and close button
const modal = document.getElementById("myModal");
const closeModal = document.getElementById("closeModal");
const viewAllButton = document.getElementById("viewAllButton");


// Get references to your "Add Contacts" button
const addContactsButton = document.getElementById("addContactsButton");
// Function to open the modal
function openModal() {
  modal.style.display = "block";
}

// Function to close the modal
function closeModalFunction() {
  modal.style.display = "none";
}

// Event listeners
addContactsButton.addEventListener("click", openModal);
closeModal.addEventListener("click", closeModalFunction);

// Add a click event listener to the "View All" button
viewAllButton.addEventListener("click", function () {
  console.log("Button clicked!");
  fetchContacts();
});

