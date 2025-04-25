"use strict";

 const formSignUp = document.querySelector("#user form");
 const inputUsername = document.getElementById("prenom");
 const inputMail = document.getElementById("mail");
 const InputPassword = document.getElementById("mdp");
 const InputConfirmPassword = document.getElementById("cfmMdp");

 console.log(inputUsername, inputMail, InputPassword);
 

formSignUp.addEventListener("submit", sendNewUser);
function sendNewUser(event)
{
  event.preventDefault();

  const user = { username: inputUsername.value, email: inputMail.value, password: InputPassword.value };
  fetch('https://fakestoreapi.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(data => console.log(data));

}




// const fBtn = document.getElementById('fBtn');

// fBtn.addEventListener("click", function () 
// {
//     alert("Inscription terminée !");
//   }
// );
