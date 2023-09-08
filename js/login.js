function navigateToLogin() {
  location.href = 'login.html'; // Navigate to 'login.html'
}

function navigateToHome() {
  location.href = 'index.html'; // Navigate to 'login.html'
}

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
              } else {
                console.log("INVALID REQUEST!!");
                resultDiv.innerHTML = "Invalid user! " + data.error;
              }
          })
          .catch(error => {
              console.log("Internal Server Error");
              console.log(data.error);
          });
  });
});





