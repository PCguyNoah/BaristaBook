function login() {
  location.href = 'login.html'; // Navigate to 'login.html'
}
// global variable
var validatedUser = false;


function home() {
  location.href = 'index.html'; // Navigate to 'login.html'
}

function register() {
location.href = 'register.html';
}

function contactPage() {
  // make sure login was successful before changing routes
  console.log(validatedUser);
  if (validatedUser) {
    location.href = 'contactPage.html'; // Navigate to contact page
  }
}

document.getElementById('secure-sign-on').onclick = contactPage();

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const resultDiv = document.getElementById("result");

  loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      
      // Get user input
      var mydata = "";
      const login = document.getElementById("login").value;
      const password = document.getElementById("password").value;
      const apiUrl = "http://baristabook.xyz/LAMPAPI/Login.php";
      const loginData = {
          login: login,
          password: password
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
              // Handle the JSON response data
              mydata = JSON.stringify(data);

              // TODO: remove clg statements on prod
              console.log(mydata);
              console.log(data);

              // Check to make sure we didn't get an error message
              if (data.error === "") {
                console.log("login succesful");
                resultDiv.innerHTML = "Welcome back " + data.firstName + "!";
                validatedUser = true;
              } else {
                console.log("INVALID REQUEST!!");
                resultDiv.innerHTML = "Invalid user! " + data.error;
                validatedUser = false;
              }
          })
          .catch(error => {
              console.log("Internal Server Error");
              console.log(data.error);
          });
  });
});





