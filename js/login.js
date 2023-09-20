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

 // create user model
 const userModel = {
  id: null,
  firstName: null,
  lastName: null,
  phone: null,
  email: null,
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
              // set user model data
              userModel.id = data.id;
              userModel.firstName = data.firstName;
              userModel.lastName = data.lastName;
              userModel.phone = data.phone;
              userModel.email = data.email;
              
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

export default userModel;



