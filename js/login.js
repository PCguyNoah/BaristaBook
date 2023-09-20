function login() {
  location.href = 'login.html';
}

// Transistion to home
function home() {
  location.href = 'index.html';
}

function register() {
  location.href = 'register.html';
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const resultDiv = document.getElementById("result");

  loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      
      // Get user input
      var mydata = null;
      const login = document.getElementById("login").value;
      const password = document.getElementById("password").value;
      const apiUrl = "http://baristabook.xyz/LAMPAPI/Login.php";
      const loginData = {
          login: login,
          password: password,
      };

      const requestOptions = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(loginData)
      };

      // Make API request
      fetch(apiUrl, requestOptions)
          .then(response => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw new Error(`HTTP Error: ${response.status}`);
              }
          })
          .then(data => {
              // create user model
              const userModel = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email
              }
              window.userModel = userModel;
              console.log(userModel);
              // store model
              mydata = data
              console.log(mydata);

              // Check to make sure we didn't get an error message
              if (data.error === "") {
                console.log("login succesful");
                resultDiv.innerHTML = "Welcome back " + data.firstName + "!";
                sessionStorage.setItem('UserID',login);
                // move to contact page
                location.href = 'contactPage.html'; 
              } else {
                console.log("INVALID REQUEST!!");
                resultDiv.innerHTML = "Invalid user! " + data.error;
              }
              
          })
          .catch(error => {
              console.log("Internal Server Error");
              console.error("Error:", error);
          });
  });
});

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
      console.log(window.userModel);
      const userId = window.userModel.id;

      // Create the contact data object
      const contactData = {
          name: name,
          phone: phone,
          email: email,
          userId: userId
      };

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
              console.log(response);
              resultDiv.innerHTML = "Contact added successfully: " + JSON.stringify(data);
          })
          .catch(error => {
              resultDiv.innerHTML = "Error: " + error.message;
          });

      // You can clear the form fields if needed
      addContactForm.reset();
  });
});




