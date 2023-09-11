// This file handles registering a new user into the database

function navigateToLogin() {
  location.href = 'login.html';
}

function navigateToHome() {
  location.href = 'index.html';
}

const apiUrl = "http://baristabook.xyz/LAMPAPI/AddUsers.php";


document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");
  const resultDiv = document.getElementById("errorResult");

  registrationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // get data from form
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const login = document.getElementById("login").value;
      const password = document.getElementById("password").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;

      const userData = {
          firstName: firstName,
          lastName: lastName,
          login: login,
          password: password,
          phone: phone,
          email: email
      };

      // Define the request options
      const requestOptions = {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        // Convert the userData object to JSON string
        body: JSON.stringify(userData) 
      };

      // Make the API request
      fetch(apiUrl, requestOptions)
      .then(response => {
        // Check if the response status is OK (200)
        if (response.ok) {
          return response.json(); // Parse the JSON response
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      })
      .then(data => {
        console.log(data);
         // Check to make sure we didn't get an error message
         if (data.error === "") {
          console.log("User registration successful:", data);
          // Once a user registers, take them back to login page
          //location.href = 'login.html';
        } else {
          console.log("INVALID REQUEST!!");
          resultDiv.innerHTML = + data.error;
        }
      })
      .catch(error => {
        // Handle errors
        console.error("Error:", error);
      });
      registrationForm.reset();
  });
});

