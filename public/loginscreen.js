$(document).ready(function() {
  $('.firstscreen').delay('4000').fadeOut('slow');
  $('.loginscreen').delay('4000').fadeIn('slow');
  $(".sign-up-button").click(signUpClick);
  $(".sign-in-button").click(signInClick);
});

function signUpClick(event) {
  event.preventDefault();
  var email = $(".sign-email").val();
  var password = $(".sign-password").val();
  createUser(email, password);
}

function createUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(response) {
     alert("Cadastro concluido com sucesso !!! Faça seu login\n " + email)
    })
    .catch(function(error) {
      checkError(error);
    });
}

function signInClick(event) {
  event.preventDefault();
  var email = $(".sign-email").val();
  var password = $(".sign-password").val();
  signInUser(email, password);
}

function signInUser(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(response) {
      var userId = response.user.uid;
      redirectToPage(userId);
    })
    .catch(function(error) {
      checkError(error);
    });
}

function checkError(error) {
  var errorMessage = error.message;
  alert(errorMessage);
}

function redirectToPage(userId) {
  window.location = "network.html?id=" + userId;
}
