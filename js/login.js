document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const resultDiv = document.getElementById("result");

  loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting the traditional way
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

      fetch(apiUrl, requestOptions)
          .then(response => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw new Error(`HTTP Error: ${response.status}`);
              }
          })
          .then(data => {
              // Handle the JSON response data here
              mydata = JSON.stringify(data);
              console.log(mydata);
              console.log(data);

              if (data.error === "") {
                console.log("login succesful");
              } else {
                console.log("INVALID REQUEST!!");
              }
              resultDiv.innerHTML = "Login successful: " + JSON.stringify(data);
              // You can perform further actions here based on the response
          })
          .catch(error => {
              console.log("code error");
              resultDiv.innerHTML = "Error: " + error.message;
          });
  });
});





