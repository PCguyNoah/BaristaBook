 // populate userModel with saved session data
 const userModel = {
  id: sessionStorage.getItem('id'),
  firstName: sessionStorage.getItem('firstName'),
  lastName: sessionStorage.getItem('lastName'),
  phone: sessionStorage.getItem('phone',),
  email: sessionStorage.getItem('email'),
}
// add contact
document.addEventListener("DOMContentLoaded", function () {
  const addContactForm = document.getElementById("addContactForm");
  const resultDiv = document.getElementById("result-contact");

  addContactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Retrieve input values from the form
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
              resultDiv.innerHTML = "Contact added successfully: "
          })
          .catch(error => {
              resultDiv.innerHTML = "Error: " + error.message;
          });

      // You can clear the form fields if needed
      addContactForm.reset();
  });
});